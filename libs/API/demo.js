"use server";

import GetSesion from "@/libs/session";
import connectMongo from "@/libs/mongoose";
import DemoProduct from "@/models/DemoProduct";

import { ObjectId } from 'mongodb';
import { getDataFromAI } from '@/libs/API/aidata';
import { getPriceFromWebsite } from '@/libs/API/scrape';

// import chromium from 'chrome-aws-lambda';
// import puppeteer from 'puppeteer-core';

const validateUrl = (url) => {
	const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
	return urlRegex.test(url);
};

function fakegetDataFromAI() {
	return {
		selector: "#product-price-21",
		imageUrl: "https://www.piatadecusut.ro/media/catalog/product/cache/1/image/2000x/040ec09b1e35df139433887a97daa66f/r/i/ricoma-10-needle-embroidery-machine-complete-package__32072.jpg",
		currency: "RON",
	};
}

export async function addDemoProduct(data) {
	try {
		await connectMongo();

    if (data.productUrl === "") {
      return {
        status: "error",
        message: "Please fill in with the product URL."
      }
    }

    if (!validateUrl(data.productUrl)) {
      return {
        status: "error",
        message: "Please enter a valid URL."
      }
    }
    
		const session = await GetSesion();
		if (session) {
      return {
        status: "warning",
        message: "Members can add products from dashboard."
      };
    }

		
		const productUrl = data.productUrl;
		const timezone = data.timezone;

		let i = 0;
		let j = 0;
		let aiData;
		let responseFromWebsite;

		let dataIdRoute;
		let imageUrl;
		let priceCurrency;


		while (i < 2) {
			console.log("Try:", i + 1);

			aiData = await getDataFromAI(productUrl);
			console.log("AI DATA:", aiData);

			while((aiData?.success === false || aiData == undefined)   && j < 2) {
				console.log("Try getting AI DATA:", j + 1);
				j++;
				aiData = await getDataFromAI(productUrl);
			}
			
			dataIdRoute = aiData.selector;
			imageUrl = aiData.imageUrl;
			priceCurrency = aiData.currency;

			responseFromWebsite = await getPriceFromWebsite(productUrl, dataIdRoute);

			// Check if the fetched price is a valid number
			if (responseFromWebsite.priceFromWebsite != null) {
				console.log("Price fetched successfully:", responseFromWebsite.priceFromWebsite);
				break;  // Exit the loop if the price is valid
			}

			// Increment the counter and retry if price is invalid
			i++;
			if (i < 2) {
				console.log("Retrying...");
				// Optional: You can add a delay between retries
				await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
			}
		}

		const productId = new ObjectId();

		await DemoProduct.create({
      productUrl,
      imageUrl,
      dataIdRoute,
      priceCurrency,
      timezone,
      _id: productId,
    });

		return {
			status: "success",
			message: "Product added successfully!",
      location: `/session/${productId}`,
      productId: productId,
		};
	} catch (e) {
		console.log(e);
		// await browser.close();
		return {
			status: "error",
			message: "Failed to add product. Please try again."
		};
	}

	//redirect('/dashboard/products');
}

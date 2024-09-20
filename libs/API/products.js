"use server";

import GetSesion from "@/libs/session";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Product from "@/models/Product";
import Alert from "@/models/Alert";
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

export async function addNewProduct(data) {
	try {
		await connectMongo();

		const session = await GetSesion();
		const user = await User.findOne({ _id: session.user.id });

		if (!user?.hasAccess && user?.products.length >= 1) {
			return {
				status: "error",
				message: "You have reached the limit of products for your plan. Please upgrade to add more products."
			};
		}

		const name = data.name;
		const description = data.description;
		const productUrl = data.productUrl;
		const timezone = data.timezone;

		if (name === "" || description === "" || productUrl === "") {
			return {
				status: "error",
				message: "Please fill in all fields."
			}
		}

		if (!validateUrl(productUrl)) {
			return {
				status: "error",
				message: "Please enter a valid URL."
			}
		}

		let i = 0;
		let j = 0;
		let aiData;
		let responseFromWebsite;

		let dataIdRoute;
		let imageUrl;
		let priceCurrency;


		while (i < 2) {
			console.log("Try Whole:", i + 1);

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
		const alertId = new ObjectId();

		await User.updateOne(
			{ _id: user._id },
			{
				$push: { products: productId.toString() }
			}
		);

		let product = await Product.create({
			owner: user._id,
			name,
			description,
			productUrl,
			imageUrl,
			dataIdRoute,
			alerts: [alertId.toString()],
			priceCurrency,
			isActive: user.hasAccess || user.products.length === 0,
			_id: productId,
			timezone,
		});
		product.save();

		let newAlert = await Alert.create({
			name: 'Alert',
			typeof: "3",
			frequency: 'frequency',
			priceValue: responseFromWebsite.priceFromWebsite,
			enabled: true,
			_id: alertId,
		});
		newAlert.save();

		return {
			status: "ok",
			message: "Product added successfully!"
		};
	} catch (e) {
		console.log(e);
		// await browser.close();
		return {
			status: "error",
			message: "Failed to add product. Can't track products from this website."
		};
	}

	//redirect('/dashboard/products');
}

export async function EditProduct(data) {
	// const browser = await puppeteer.launch({ headless: true });
	try {
		await connectMongo();

		// const session = await GetSesion();
		// const user = await User.findOne({ _id: session.user.id });
		const oldProduct = await Product.findOne({ _id: data.productId });


		const name = data.name;
		const description = data.description;
		const productUrl = data.productUrl;
		const productId = data.productId;
		let imageUrl = oldProduct.imageUrl;
		let dataIdRoute = oldProduct.dataIdRoute;
		let priceCurrency = oldProduct.priceCurrency;
		let priceHistory = oldProduct.priceHistory;

		if (name === "" || description === "" || productUrl === "") {
			return {
				status: "error",
				message: "Please fill in all fields."
			}
		}

		if (!validateUrl(productUrl)) {
			return {
				status: "error",
				message: "Please enter a valid URL."
			}
		}

		//check if old url is changed
		if (productUrl != oldProduct.productUrl) {
			let i = 0;
			let j = 0;
			let aiData;
			let responseFromWebsite;

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
				if (!isNaN(responseFromWebsite.priceFromWebsite)) {
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
			priceHistory = []
		}

		let editedProduct = await Product.updateOne(
			{ _id: productId },
			{
				name,
				description,
				productUrl,
				imageUrl,
				dataIdRoute,
				priceCurrency,
				priceHistory,
			}
		);

		if (editedProduct) {
			return {
				status: "ok",
				message: "Product edited successfully!"
			};
		}
	} catch (e) {
		console.log(e);
		// await browser.close();
		return {
			status: "error",
			message: "Failed to edit product. Please try again."
		};
	}
}

export async function DeleteProduct(productId) {
	try {
		await connectMongo();
		//want to delete the product from the user's products array	
		const alertsOfProduct = await Product.findOne({ _id: productId });
		const alerts = alertsOfProduct.alerts;

		const userThatHasProduct = await User.findOne({ products: productId });
		const featProduct = await Product.findOne({ _id: userThatHasProduct.products[1] });
		if (featProduct) {
			featProduct.isActive = true;
			await featProduct.save();
		}

		await Alert.deleteMany({ _id: { $in: alerts } });
		await Product.deleteOne({ _id: productId });
		await User.updateOne(
			{ products: productId },
			{ $pull: { products: productId } }
		);

		// const userThatHasProduct = await User.findOne({ products : productId });
		// const featProduct = await Product.findOne({ _id : userThatHasProduct.products[0]});
		// featProduct.isActive = true;
		// await featProduct.save();

		return true;

	} catch (e) {
		console.log(e);
		return false;
	}
}

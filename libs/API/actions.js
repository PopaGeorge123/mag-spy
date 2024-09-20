import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";
import Alert from "@/models/Alert";
import User from "@/models/User";
import { sendPriceAlertEmail } from "@/libs/API/emails";
import { getPriceFromWebsite } from "@/libs/API/scrape";

// import { format, parse } from 'date-fns';
// import { el, ro } from 'date-fns/locale';
import { DateTime } from 'luxon';

// import chromium from 'chrome-aws-lambda';
// import puppeteer from 'puppeteer-core';

async function checkIfCondition(alertType, currentPrice, priceValue) {
  const epsilon = 1e-10;

  if (alertType === "1") {
    return currentPrice < priceValue;
  }
  if (alertType === "2") {
    return Math.abs(currentPrice - priceValue) < epsilon;
  }
  if (alertType === "3") {
    return currentPrice > priceValue;
  }
  return false;
}


async function fakeGetDataFromWebsite(website, dataIdRoute) {
  return {
    priceFromWebsite: 266.99,
  };
}

export async function runDataUpdate() {
  try {
    await connectMongo();

    // Get all products
    const allProducts = await Product.find({});

    // Process each product asynchronously
    const productProcessingPromises = allProducts.map(async (product) => {
      try {
        // Only if the product is active we want to do all the stuff
        if (product.isActive) {
          const data = await getPriceFromWebsite(product.productUrl, product.dataIdRoute);
          const crtProductAlerts = product.alerts;

          let productUpdated = false;  // Track if the product has been updated
          const alertProcessingPromises = crtProductAlerts.map(async (alertId) => {
            try {
              const currentAlert = await Alert.findById(alertId);
              if (currentAlert) {
                const alertCondition = await checkIfCondition(
                  currentAlert.typeof,
                  data.priceFromWebsite,
                  currentAlert.priceValue
                );

                const lastPrice = product.priceHistory.length
                  ? product.priceHistory[product.priceHistory.length - 1].price
                  : undefined;

                const epsilon = 1e-10;
                if ((!Math.abs(lastPrice - data.priceFromWebsite) < epsilon) || lastPrice == undefined) {
                  // Update product's lastTimeUpdate and price history
                  const currentUtcTime = DateTime.utc();
                  const clientCurrentTime = currentUtcTime.setZone(product.timezone);
                  const formatedTime = clientCurrentTime.toISO();
                  const parsedDate = formatedTime.split("T")[0] + " " + formatedTime.split("T")[1].split(".")[0];
                  const onlyHourAndMinutes = formatedTime.split("T")[1].split(".")[0];
                  const onlyHour = onlyHourAndMinutes.split(":")[0] + ":" + onlyHourAndMinutes.split(":")[1];

                  product.lastTimeUpdate = onlyHour;
                  product.priceHistory.push({
                    price: data.priceFromWebsite,
                    date: parsedDate,
                  });

                  productUpdated = true;  // Mark that the product has been updated

                  if (alertCondition && currentAlert.enabled) {
                    const product_owner = await User.findById(product.owner);
                    const product_owner_email = product_owner.email;
                    const productID = product._id.toString();

                    await User.updateOne(
                      { _id: product.owner },
                      {
                        $push: {
                          inboxAlerts: {
                            fromAlert: currentAlert.name,
                            forProduct: product.name,
                            price: data.priceFromWebsite,
                            date: parsedDate,
                          },
                        },
                      }
                    );

                    await sendPriceAlertEmail(product_owner_email, productID, alertId);
                  }
                } else {
                  // Update product's lastTimeUpdate
                  const currentUtcTime = DateTime.utc();
                  const clientCurrentTime = currentUtcTime.setZone(product.timezone);
                  const formatedTime = clientCurrentTime.toISO();
                  const onlyHourAndMinutes = formatedTime.split("T")[1].split(".")[0];

                  product.lastTimeUpdate = onlyHourAndMinutes;
                  productUpdated = true;  // Mark that the product has been updated
                }
              }
            } catch (alertError) {
              console.error(`Error processing alert ${alertId}:`, alertError);
            }
          });

          // Wait for all alerts to be processed for the current product
          await Promise.all(alertProcessingPromises);

          // Save the product only once after processing all alerts
          if (productUpdated) {
            await product.save();
          }
        }
      } catch (productError) {
        console.error(`Error processing product ${product._id}:`, productError);
        return [];
      }
    });

    // Wait for all products to be processed
    await Promise.all(productProcessingPromises);

    return true;
  } catch (e) {
    console.error("Error during data update:", e);
    return false;
  }
}

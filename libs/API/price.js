"use server"; 

import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";

export async function getPriceHistory(productId) {
  await connectMongo();

  const currentProduct = await Product.findOne({ _id: productId });
  const priceDataHistory = currentProduct.priceHistory;

  const formattedData = priceDataHistory.map((price) => {
  return {
    date: price.date,
    price: price.price
  }
  });

  //do more 30 values into fakeData array
  // const fakeData = [
  //   {date: "2021-09-01", price: 100},
  //   {date: "2021-09-02", price: 101},
  //   {date: "2021-09-03", price: 102},
  //   {date: "2021-09-04", price: 103},
  //   {date: "2021-09-05", price: 104},
  //   {date: "2021-09-06", price: 105},
  //   {date: "2021-09-07", price: 106},
  //   {date: "2021-09-08", price: 107},
  //   {date: "2021-09-09", price: 108},
  //   {date: "2021-09-10", price: 109},
  //   {date: "2021-09-11", price: 110},
  //   {date: "2021-09-12", price: 111},
  //   {date: "2021-09-13", price: 112},
  //   {date: "2021-09-14", price: 113},
  //   {date: "2021-09-15", price: 114},
  //   {date: "2021-09-16", price: 115},
  //   {date: "2021-09-17", price: 116},
  //   {date: "2021-09-18", price: 117},
  //   {date: "2021-09-19", price: 118},
  //   {date: "2021-09-20", price: 119},
  //   {date: "2021-09-21", price: 120},
  //   {date: "2021-09-22", price: 121},
  //   {date: "2021-09-23", price: 122},
  //   {date: "2021-09-24", price: 123},
  //   {date: "2021-09-25", price: 124},
  //   {date: "2021-09-26", price: 125},
  //   {date: "2021-09-27", price: 126},
  //   {date: "2021-09-28", price: 127},
  //   {date: "2021-09-29", price: 128},
  //   {date: "2021-09-30", price: 129}
  // ]

  // const returnData = [
  //   {productData : currentProduct.priceCurrency},
  //   {historyData : formattedData}
  // ];

  const returnData = {
    productData: {
      currency: currentProduct.priceCurrency
    },
    historyData: formattedData
  };

  console.log("Return Data : ", returnData);

  return returnData;
}

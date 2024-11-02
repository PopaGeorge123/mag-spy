import { JSDOM } from 'jsdom';
import { NextResponse } from 'next/server';
import { getPriceFromWebsite } from '@/libs/API/scrape';

import fetch from 'node-fetch';

async function getPrice_DEV(website, selector) {
  try {
    const response = await fetch(website);
    const html = await response.text();
    console.log("Fetched website")
    const document = new JSDOM(html).window.document;
    const priceElement = document.querySelector(selector).textContent;
    console.log(priceElement)
    const onlyNumbers = priceElement.match(/\d+/g);
    const priceString = onlyNumbers.join('');
    const price = Number(priceString);

    console.log(price);
    return price;

  } catch (error) {
    console.error('Error fetching or processing the webpage:', error.message);
    return null;
  }
}

async function fetchThroughProxy(url) {
  try {

    const response = await axios.get(url, {
      proxy: {
        host: process.env.PROXY_HOST,
        port: 443,
        auth: {
          username: process.env.PROXY_USERNAME,
          password: process.env.PROXY_PASSWORD
        },
      },
      timeout: 5000
    });
    if (response.status === 200) {
      console.log(`Proxy %O is working. Your IP: ${response.data.origin}`);
    } else {
      console.log(`Proxy %O returned status code ${response.status}`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    return data;

  } catch (error) {
    console.log(`Error occurred while testing proxy %O: ${error.message}`);
  }
}


export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const req_url = searchParams.get('url');
  const req_sel = searchParams.get('sel');

  const price = await getPriceFromWebsite(req_url, req_sel);

  if (price === null) {
    return NextResponse.json({ status: 500, message: 'Failed to retrieve price.' });
  }

  return NextResponse.json({ status: 200, price });
}

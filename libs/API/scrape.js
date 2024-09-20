import { JSDOM } from 'jsdom';

async function getRandomUserAgents() {
  const userAgents = [
    // Chrome on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",

    // Firefox on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",

    // Chrome on macOS
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",

    // Safari on macOS
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15",

    // Chrome on Android
    "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",

    // Safari on iPhone
    "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1",

    // Firefox on Android
    "Mozilla/5.0 (Android 10; Mobile; rv:91.0) Gecko/91.0 Firefox/91.0",

    // Edge on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/91.0.864.48",

    // Opera on Windows
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 OPR/78.0.4093.112",

    // Samsung Internet on Android
    "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/114.0.0.0 Mobile Safari/537.36"
  ];

  //return random user agent
  return userAgents[Math.random() * userAgents.length];

}

export async function getPriceFromWebsite(url, selector) {
  //const sleep = ms => new Promise(res => setTimeout(res, ms));

  // Set a random User-Agent
  const userAgent = await getRandomUserAgents();

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Referer': url, // Optionally, provide referer to mimic real browsing
        'DNT': '1',

      }
    });
    console.log(response.status);

    //await sleep(Math.floor(Math.random() * 1000) + 500);

    //const dataFromSelector = await page.$eval(selector, el => el.textContent);
    //let htmlData = await page.$eval(selector, el => el.innerHTML);

    const data = await response.text();
    const dom = new JSDOM(data);
    const document = dom.window.document;
    const priceElement = document.querySelector(selector);
    let htmlData = priceElement ? priceElement.innerHTML : null;
    //console.log(htmlData);

    const chars = [">–<", ">– <", "> –<", "> – <", ">- <", "> -<", "> - <", ">-<"];

    for (let char of chars) {
      if (htmlData.includes(char)) {
        //console.log("CHAR FOUND : ", char);
        const index = htmlData.indexOf(char);
        htmlData = htmlData.substring(0, index);
        break;
      }
    }

    //console.log(htmlData);

    //replace all tags with ":"
    htmlData = htmlData.replace(/<[^>]*>/g, ':');
    //console.log(htmlData);

    //remove anyhting that is not a number except the ":" "." and ","
    htmlData = htmlData.replace(/[^0-9.,:]/g, '');
    //console.log(htmlData);

    //if there is no comma, replace the first ":" that has a number before and after it with a ","
    if (!htmlData.includes(',')) {
      htmlData = htmlData.replace(/(\d):(\d)/g, '$1,$2');
    }
    //console.log(htmlData);

    //remove all ":" and "."
    htmlData = htmlData.replace(/[:.]/g, '');
    //console.log(htmlData);

    //replace the last "," with "."
    htmlData = htmlData.replace(/,/, '.');
    console.log("FINAL : ", htmlData);

    if (htmlData == NaN) {
      return {
        priceFromWebsite: null,
      }
    }

    const price = parseFloat(htmlData);
    return {
      priceFromWebsite: price,
    };
  } catch (error) {
    console.log(error);
    return {
      priceFromWebsite: null,
    }
  }
}
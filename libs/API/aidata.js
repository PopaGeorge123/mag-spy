import { JSDOM } from 'jsdom';
import OpenAI from "openai";
import fetch from "node-fetch"; // Ensure node-fetch is included

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

export async function getDataFromAI(website) {
    //  - Identify the most appropriate and valid CSS selector that targets the HTML element containing the product price.
  //  - Ensure the selector is specific and avoids overly complex expressions like nested attribute selectors. Prefer simple class or ID selectors like example : "#product-price or .new-price".
  //  - Be carefull, some websites have some offers or some discounts if user do some acctions, but you need to determine only the main price.
  //  - The selector should return the price element when used with the document.querySelector() method.



  const assistantId = "asst_lIC6V7YskLALbKKoSgOL29T6";
  const prompt = `The URL of the web page is "${website}". You are provided with the HTML content of the webpage.Your task is to extract specific information and return it in JSON format.

1. **CSS Selector for Price Extraction**:
    - Identify the most appropriate and valid CSS selector that targets the HTML element containing the product price.
    - Ensure the selector is specific and avoids overly complex expressions like nested attribute selectors. Prefer simple class or ID selectors like example : "#product-price or .new-price".
    - Be carefull, some websites have some offers or some discounts if user do some acctions, but you need to determine only the main price.
    - The selector should return the price element when used with the document.querySelector() method.



2. **Image URL Extraction**:
   - Extract the URL of the main product image using a CSS selector that targets the image element.
   - Make sure the URL is fully qualified and points to the main product image.

3. **Currency Extraction**:
   - Determine the currency of the product from the HTML content.
   - Extract the currency information using XPath or identify the relevant text or attribute that indicates the currency.

4. **Product Name Extraction**:
    - Extract the name of the product using a CSS selector that targets the product name element.
    - Ensure the name is clear and corresponds to the main product title.
    - Avoid extracting any additional information such as product descriptions or reviews.



Return the extracted data in the following JSON format:
\`\`\`json
{
  "selector": "<CSS_SELECTOR_FOR_PRICE_EXTRACTION>",
  "imageUrl": "<PRODUCT_IMAGE_URL>",
  "currency": "<PRODUCT_CURRENCY>",
  "name: "<PRODUCT_NAME>"
}
\`\`\`
`;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || ""
    });
    
    const userAgent = await getRandomUserAgents();

    const res = await fetch(website, {
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Referer': website, // Optionally, provide referer to mimic real browsing
        'DNT': '1',
      }
    });

    
    // if (!res.status.toString().startsWith('2')) {
    //   throw new Error(`Failed to fetch data from ${website}: ${res.statusText}`);
    // }
    

    const html = await res.text();
    console.log("WEBSITE FETCHED");

    //upload the file
    const blob = new Blob([html], { type: 'text/html' });
    const fileName = 'dataFromWebsite.html';
    const fileMime = 'text/html';
    const file = new File([blob], fileName, { type: fileMime }); 
    const fileId = await openai.files.create({
      file: file,
      purpose: "assistants",
    });
    console.log("FILE CREATED");

    const thread = await openai.beta.threads.create({
      messages: [
      {
          role: "user",
          content: prompt,
          attachments: [
            { 
              file_id: fileId.id, 
              tools: [
                { type: "file_search" },
              ] 
            }
          ],
        },
      ],
    });
    console.log("THREAD CREATED");

    let run = await openai.beta.threads.runs.createAndPoll(
      thread.id,
      { 
        assistant_id: assistantId,
      }
    );
    console.log("RUN CREATED");
    
    if (run.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(
        run.thread_id
      );

      //delete all the data use before
      const fls = await openai.files.del(fileId.id);
      const trd = await openai.beta.threads.del(thread.id);

      if (fls.deleted && trd.deleted) {
      }else {
        return { success: false, error: 'Error deleting file or thread.' };
      }
      
      for (const message of messages.data.reverse()) {
        if(message.role === 'assistant') {
          const data = message.content[0].text.value;

          const startIndex = data.indexOf('{');
          const endIndex = data.lastIndexOf('}');
      
          // Slice the string from the first "{" to the last "}"
          if (startIndex !== -1 && endIndex !== -1) {
            const respJson = data.slice(startIndex, endIndex + 1); // Include the last "}"
            const resp = JSON.parse(respJson);
            resp.success = true;
            return resp;
          }
        }
      }
    }

  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return { success: false, error: error.message };
  }
}
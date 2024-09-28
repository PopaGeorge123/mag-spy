import { JSDOM } from 'jsdom';
import { NextResponse } from 'next/server';
import { getPriceFromWebsite } from '@/libs/API/scrape';

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


export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const req_url = searchParams.get('url');
  const req_sel = searchParams.get('sel');


  const url = 'https://www.dacris.net/as-18-i9-14900hx-64-2-4090-wqxga-w11p/p?skuId=220075&gad_source=1&gclid=Cj0KCQjw0Oq2BhCCARIsAA5hubWhXo4l7LIrlHl3GTW5nUrmoCr0GPsa7w_YS2On8v1uoeN5I3wqEzYaAnGjEALw_wcB';
  const cssSelector = ".vtex-product-price-1-x-sellingPrice";

  const url2 = 'https://www.decathlon.ro/p/umbrela-500-uv/_/R-p-121985?mc=8654661&utm_source=google&utm_medium=cpc&utm_campaign=ro_t-perf_ct-pmax_n-g-pmax-unbranded_f-cv_o-conv_spd-msp_spu-msp_sp-msp_pt-all_l-ro_pp-gads_bm-mcv_sg-na_fo-mix_xx-pmax-unbranded_all-products&gad_source=1&gclid=Cj0KCQjwiuC2BhDSARIsALOVfBIcwc1BfIUPXrR5zq_OZE8vBWfxGUIXNEmSSBEARoOLchgCNovfKLsaAmHFEALw_wcB';
  const cssSelector2 = ".vtmn-price";

  const url3 = 'https://www.emag.ro/drujba-electrica-cu-lant-putere-1200w-2-acumulatori-de-48v-4200rpm-rosu-negru-dr8-220-ml16-33/pd/D44RGFYBM/?ref=interest_categories_seasonality_9_2&provider=rec&recid=rec_67_f072f6f5509a9512dd0d61003ce5a0b19b763cee602e9a5e56c45ea6b2cf3382_1725871807&scenario_ID=67';
  const cssSelector3 = ".product-new-price";

  const url4 = "https://souqeshop.ro/panou-solar-540w-fotovoltaic-monocristalin-cu-conector-mc4-2279x1134x35mm/?attribute_pa_tva=tva-9&utm_source=Google%20Shopping&utm_campaign=BP_Google%20Shopping&utm_medium=cpc&utm_term=2497795&gad_source=1&gbraid=0AAAAACYKu6KvSihJMtKLyiA1fZaWOjM8B&gclid=CjwKCAjw3P-2BhAEEiwA3yPhwP_vhaqp7mR__MZLmXuVyZ3Fa2oavDdT34l5_G3he_lDYyCtVwMriBoCTYUQAvD_BwE";
  const cssSelector4 = '.elementor-widget-woocommerce-product-price .price';

  const url5 = "https://www.4camping.ro/p/cort-msr-hubba-hubba-nx/#verde-rosu"
  const cssSelector5 = "#priceInfo .full-price strong"

  const url6 = "https://www.obi.at/klimageraete/midea-mobile-split-klimaanlage-portasplit/p/3586245";
  const cssSelector6 = ".price"

  const price = await getPriceFromWebsite(req_url, req_sel);

  if (price === null) {
    return NextResponse.json({ status: 500, message: 'Failed to retrieve price.' });
  }
  
  return NextResponse.json({ status: 200, price });
}

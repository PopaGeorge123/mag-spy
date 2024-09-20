import { getPriceFromWebsite } from "@/libs/API/scrape";
import connectMongo from "@/libs/mongoose";
import DemoProduct from "@/models/DemoProduct";
import ButtonSignin from "@/components/ButtonSignin";


export default async function demoProductPage({ params: { demoProdutId } }) {

  await connectMongo();
  const currentProduct = await DemoProduct.findOne({ _id: demoProdutId });
  if (!currentProduct) {
    return (
      <></>
    )
  }

  const productPrice = await getPriceFromWebsite(currentProduct.productUrl, currentProduct.dataIdRoute);
  //const productPrice = {priceFromWebsite : "196.99"}

  return (
    <div>
      <h1 className="text-2xl m-3 text-center">Your Product</h1>
      <div className="flex flex-col ">
        <img
          src={currentProduct.imageUrl}
          alt="product"
          className="rounded-lg w-4/5 mx-auto m-3"
        />
        <div className="flex items-center justify-center">
          <h2 className="text-white text-3xl m-3">{productPrice.priceFromWebsite}</h2>
          <h2 >{currentProduct.priceCurrency}</h2>
        </div>

        <div className="flex items-center justify-center">
          <a href="/api/auth/signin?callbackUrl=%2Fdashboard%2Fproducts"
            className="btn btn-primary btn-wide m-5"
          >
            Continue
          </a>
        </div>

      </div>

    </div>
  )
}

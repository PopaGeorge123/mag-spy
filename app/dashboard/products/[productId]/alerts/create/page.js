import { addNewAlert } from '@/libs/API/alerts';
import AlertTypeSelector from '@/components/own/dashboard/AlertTypeSelector';
import FreePlanAlert from '@/components/own/dashboard/FreePlanAlert';


import connectMongo from "@/libs/mongoose";
import Product from '@/models/Product';
import User from '@/models/User';
import GetSesion from "@/libs/session";

export default async function AddAlertPage({ params: { productId } }) {
  await connectMongo();

  const session = await GetSesion();
  const user = await User.findOne({ _id: session.user.id });
  const product = await Product.findOne({ _id : productId });

  console.log(user.hasAccess);
  console.log(product.alerts.length);

  return (
    <div className='w-full'>
      {!user.hasAccess && product.alerts.length >= 1 ? <FreePlanAlert forWhat={"alert"}/> : null}
      <h1 className="text-2xl my-5">Add new alert</h1>
      <form action={addNewAlert} className="max-w-sm mx-auto">
        <input type="text" name="productId" value={productId} className="hidden" />
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name your alert</label>
          <input type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alert me when</label>
          <div className='flex justify-center items-center'>
            <p className='w-1/3'>Product Price</p>

            <AlertTypeSelector />

            <input type="number" name="priceValue" className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
        </div>

        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
      </form>

    </div>
  )
}

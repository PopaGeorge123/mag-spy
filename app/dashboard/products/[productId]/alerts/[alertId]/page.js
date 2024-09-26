import connectMongo from "@/libs/mongoose";
import Alert from "@/models/Alert";
import Product from "@/models/Product";
import { EditAlert } from '@/libs/API/alerts';
import DeleteAlertDialogue from "@/components/own/dashboard/DeleteAlertDialogue";
import AlertTypeSelector from '@/components/own/dashboard/AlertTypeSelector';

import EditTextInput from "@/components/own/edit/EditTextInput";

export default async function EditAlertPage({ params:{ alertId , productId } }) {
	await connectMongo();
  const product = await Product.findOne({ _id: productId });
  const isAvailable = product.isActive;

	const alertData = await Alert.findOne({ _id: alertId });

	return (
    isAvailable ? (<div className='w-full'>
      <div className='flex w-full justify-end'>
        <DeleteAlertDialogue alertId={alertId} productId={productId}/>
      </div>

      <h1 className="text-xl m-5">Modifica <span className='text-white text-2xl'>{alertData.name}</span></h1>

      <form action={EditAlert}  className="max-w-sm mx-auto">
        <input type="text" name="productId" value={productId} className="hidden" />
        <input type="text" name="alertId" value={alertId} className="hidden" />
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Redenumeste alerta</label>
          {/* <input type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={alertData.name} required /> */}
          <EditTextInput name={"name"} placeholder={alertData.name} />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trimite o alerta cand</label>
          <div className='flex justify-center items-center'>
            <p className='w-1/3'>Pretul produsului</p>

            <AlertTypeSelector currentType={alertData.typeof} />

            {/* <input type="number" name="priceValue" class="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={alertData.priceValue} required /> */}
            <EditTextInput name={"priceValue"} placeholder={alertData.priceValue} />
          </div>
        </div>

        <button type="submit" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Modifica</button>
      </form>
      
    </div>):(
      <div className="flex justify-center items-center h-96">
        <h1 className="text-2xl text-gray-500">Acest produs nu mai este disponibil în planul gratuit. Vă rugăm să faceți upgrade pentru a gestiona acest produs.
        </h1>
      </div>
    )
  );
}
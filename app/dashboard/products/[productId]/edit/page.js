import { EditProduct } from '@/libs/API/products';
import Product from '@/models/Product';
import connectMongo from '@/libs/mongoose';
import DeleteProductDialogue from '@/components/own/dashboard/DeleteProductDialogue';
import EditTextInput from '@/components/own/edit/EditTextInput';
import ProductEditForm from '@/components/own/edit/ProductEditForm';

export default async function AddProductPage({ params: { productId } }) {
  await connectMongo();
  const productData = await Product.findOne({ _id: productId });
  const isAvailable = productData.isActive;
  const data = {
    name: productData.name,
    description: productData.description,
    productUrl: productData.productUrl,
    productId: productData._id,
  };

  return (
    isAvailable ? (
    <div className='w-full'>
      <div className='flex w-full justify-end'>
        <DeleteProductDialogue productId={productId} />
      </div>

      <h1 className="text-2xl m-5">Edit <span className='text-white'>{productData.name}</span></h1>

      <ProductEditForm data={data} />

    </div>) :
      (<div className="flex justify-center items-center h-96">
        <h1 className="text-2xl text-gray-500">This product is not available anymore in the free plan. Please upgrade to manage this product.</h1>
      </div>)
  )
}

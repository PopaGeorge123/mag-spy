import FreePlanAlert from '@/components/own/dashboard/FreePlanAlert';

import GetSesion from "@/libs/session";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import ProductCreateForm from "@/components/own/edit/ProductCreateForm";



export default async function AddProductPage() {
  await connectMongo();

  const session = await GetSesion();
  const user = await User.findOne({ _id: session.user.id});

  return (
    <div>
      {!user?.hasAccess && user?.products.length >= 1 ? <FreePlanAlert forWhat={"product"}/> : null}
      <h1 className="text-2xl">Add your Product</h1>

      <ProductCreateForm />

    </div>
  )
}

import GetSesion from "@/libs/session";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Product from "@/models/Product";

import AddedObject from "@/components/own/dashboard/AddedObject";
import CreateButton from "@/components/own/dashboard/CreateButton";

export default async function ProductsPage() {
	await connectMongo();

	const session = await GetSesion();
	const user = await User.findOne({ _id: session.user.id });
	const productsIds = user?.products;

	const products = await Product.find({
		_id: { $in: productsIds },
	});
	
	return (
		<>
			<h1 className="text-2xl">Your Products</h1>
			<div className="my-5 w-full flex items-center justify-end">
					<CreateButton location={"/dashboard/products/add-product"} />
				</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
			
			{/* {products.length === 0 && (
				<div className="fixed inset-0 flex justify-center items-center">
					<div className="flex justify-center items-center">
						<h1 className="text-s text-grey">No products yet</h1>
					</div>
				</div>
			)} */}
				{products.length === 0 && (
					<div className="mt-40 flex justify-center items-center">
						<h1 className="text-s text-grey">No products yet</h1>
					</div>
				)}

				{products.map((product, key) => (
					<AddedObject
						key={key}
						name={product.name}
						description={product.description}
						imageUrl={product.imageUrl}
						id={product._id}
						isActive={product.isActive}
						lastPrice={product.priceHistory?.[product.priceHistory.length-1]?.price}
						currency={product.priceCurrency}
					/>
				))}
			</div>
		</>
	);
}

import connectMongo from "@/libs/mongoose";
import Alert from "@/models/Alert";
import Product from "@/models/Product";

import AlertsTable from "@/components/own/dashboard/AlertsTable";
import CreateButton from "@/components/own/dashboard/CreateButton";


export default async function AlertsPage({ params: { productId } }) {
	await connectMongo();

	const crtProduct = await Product.findOne({ _id: productId });
	const isAvailable = crtProduct.isActive;
	const alertsIds = crtProduct.alerts;

	const alerts = await Alert.find({ _id: { $in: alertsIds } });
	
	// 	alerts: [
	// 		{
				// _id: new ObjectId("66ba0d428bcddf613bc76395"),
				// name: 'Alert 1',
				// frequency: 'frequency',
				// priceValue: 2424,
				// enabled: true,
				// createdAt: 2024-08-12T13:25:22.410Z,
				// updatedAt: 2024-08-12T13:25:22.410Z,
				// __v: 0
	// 		},
	// 	]
	// }


	return (
		
		isAvailable ?	(<div className="flex flex-col justify-center items-center">
				<div className="mt-5">
					<h1 className="m-2">Price Alerts</h1>
					<div className="my-5 w-full flex items-center justify-end">
						<CreateButton location={"alerts/create"} />
					</div>
					{/* <PriceChangesTable data={priceData.priceChanges} /> */}
					<AlertsTable data={alerts} />
				</div>
			</div>) : (
		<div className="flex justify-center items-center h-96">
			<h1 className="text-2xl text-gray-500">This product is not available anymore in the free plan. Please upgrade to manage this product.</h1>
		</div>)
	);
}
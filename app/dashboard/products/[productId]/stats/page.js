import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";

import Image from 'next/image';
import PriceChart from "@/components/own/dashboard/PriceChart";

//import PriceChangesTable from "@/components/own/dashboard/PriceChangesTable"

export default async function ProductPage({ params: { productId } }) {

	// const priceData = {
	// 	priceChanges: [
	// 		{
	// 			date: "2024-08-04",
	// 			price: 542,
	// 			change: "-5"
	// 		},
	// 		{
	// 			date: "2021-08-04",
	// 			price: 601,
	// 			change: "+62"
	// 		},
	// 		{
	// 			date: "2021-09-05",
	// 			price: 605,
	// 			change: "+3"
	// 		}
	// 	],
	// 	priceTodayCycle: [
	// 		{ hour: "00:00", price: 540 },
	// 		{ hour: "00:10", price: 541 },
	// 		{ hour: "00:20", price: 542 },
	// 		{ hour: "00:30", price: 542 },
	// 		{ hour: "00:40", price: 100 },
	// 		{ hour: "00:50", price: 100 },
	// 		{ hour: "01:00", price: 100 },
	// 		{ hour: "01:10", price: 100 },
	// 		{ hour: "01:20", price: 100 },
	// 		{ hour: "01:30", price: 100 },
	// 		{ hour: "01:40", price: 100 },
	// 		{ hour: "01:50", price: 100 },
	// 		{ hour: "02:00", price: 100 },
	// 		{ hour: "02:10", price: 100 },
	// 		{ hour: "02:20", price: 100 },
	// 		{ hour: "02:30", price: 100 },
	// 	]
	// }



	await connectMongo();
	const currentProduct = await Product.findOne({ _id: productId });
	const isAvailable = currentProduct.isActive;

	return (
		isAvailable ? (
			<div className="flex flex-col items-center justify-between">
				<div className="flex flex-col justify-center items-center ">
					<div className="flex items-center justify-center">
						<h5 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{currentProduct.name}</h5>
						<a href={currentProduct.productUrl}
							target="_blank"
							className="ml-4 mt-2"
						>
							<svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
								<path stroke="grey" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778" />
							</svg>
						</a>
					</div>

					<img
						src={currentProduct.imageUrl}
						alt="Recorded Product Image"
						layout="fill"
						objectFit="cover"
						className="rounded w-full mx-auto m-4 md:w-2/3 lg:w-1/3"
					/>

					<h1 className="text-md">{currentProduct.description}</h1>
					{/* <h1 className="text-4xl text-white mb-5">{540} Lei</h1> */}
				</div>
				<div className="w-full mt-5 flex flex-col justify-center items-center md:flex-row ">
					<div className="mt-5 w-full">
						<div className="flex items-center justify-between">
							<h1 className="m-2 text-xl">Price Chart</h1>

							{currentProduct.lastTimeUpdate && (<div className="flex">
								<svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
								</svg>
								<h1 className="text-sm" >{currentProduct.lastTimeUpdate}</h1>
							</div>)}

						</div>
						<PriceChart productId={productId} />
					</div>


					{/* <div className="mt-5">
					<h1 className="m-2">Price Changes</h1>
					<PriceChangesTable data={priceData.priceChanges} />
					</div> */}
				</div>
			</div>) : (
			<div className="flex justify-center items-center h-96">
				<h1 className="text-2xl text-gray-500">This product is not available anymore in the free plan. Please upgrade to manage this product.</h1>
			</div>)
	);
}
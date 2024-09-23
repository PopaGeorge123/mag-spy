"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function AddedObject({ name, isActive, imageUrl, id ,lastPrice,currency}) {
	function NotifyUser(){
		toast.error("This product is not available anymore in the free plan. Please upgrade to access this feature.");
	}


	return (
		<div 
			onClick={isActive ? () => {} : NotifyUser}
			key={id} className="border m-1.5 mb-5 md:m-1.5 lg:m-1.5 h-78 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<div>
				<div className="relative w-full h-48">
					<Image
						src={imageUrl}
						alt="Recorded Product Image"
						layout="fill"
						objectFit="cover"
						className="rounded-t-lg"
					/>
				</div>
			</div>
			<div className="max-h-fit p-5 flex flex-col justyfy-center align-center">
				<div >
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name.length >= 10 ? name.slice(0,10) + "..." : name}</h5>
				</div>
				<div className="flex items-center justify-between">
					
					{isActive ? (<a href={`/dashboard/products/${id}/stats`} className="mt-2 w-auto py-2 px-2 inline-flex items-center px-1 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						More
						<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
						</svg>
					</a>) : (<></>)}
					{lastPrice?.toString().length >= 6 ? lastPrice?.toString().slice(0,5) + "..." : lastPrice} {!lastPrice ? "" :currency}
				</div>
			</div>
		</div>
	);
}

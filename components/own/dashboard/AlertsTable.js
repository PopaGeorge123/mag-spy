//import { useState } from "react";
//import AlertsModal from "@/components/own/dashboard/AlertsModal";
import AlertStateButton from "@/components/own/dashboard/AlertStateButton";

export default async function AlertsTable({ data }) {

	const alertLabel = [
		"Status",
		"Alert",
		"when price",
		"price",
		" "
	];

	return (
		<div>
			{/* <AlertsModal /> */}
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							{alertLabel.map((label, key) => (
								<th key={key} scope="col" className="px-6 py-3">
									{label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.length === 0 ? (
							<tr>
								<td colSpan="5" className="text-center py-4">No alerts</td>
							</tr>
						) : (
							data.map((item, key) => (
								<tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<td className="flex items-center justify-center px-1 py-5 whitespace-nowrap">
										<AlertStateButton alertId={String(item._id)} enabled={item.enabled} />
									</td>
									<td className="py-4 whitespace-nowrap">
										{item.name}
									</td>
									<td className="py-4 whitespace-nowrap">
									{item.typeof === "1" ? "Below" : item.typeof === "2" ? "Equal" : "Above"}
									</td>
									<td className="py-4 whitespace-nowrap">
										{item.priceValue}
									</td>
									<td className="py-4 whitespace-nowrap">
										<a href={`alerts/${item._id}`} aria-current="page" className="text-blue-600">Edit</a>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

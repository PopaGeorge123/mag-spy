
export default async function PriceChangesTable({ data }) {
	//this show every price change since product was added

	const dataShownLabel = [
		"Timestamp",
		"Price",
		"Change"
	];

	return (
		<>
			<div className="relative overflow-x-auto">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							{dataShownLabel.map((label , key) => (
								<th key={key} scope="col" className="px-6 py-3">
									{label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map((item,key) => (
							<tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
								<td className="px-6 py-4 whitespace-nowrap">
									{item.date}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									{item.price}
								</td>
								<td className={`px-6 py-4 whitespace-nowrap text-center 
									${item.change.toString().includes("-") ? 'text-red-600' : 'text-green-500'}`}>
									{item.change}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

		</>
	)
}

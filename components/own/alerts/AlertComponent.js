

export default async function AlertComponent({ alertData }) {

  const alertLabel = [
    "From",
    "for Product",
    "price",
    "date",
  ];

  return (
    <div>
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
            {alertData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No alerts</td>
              </tr>
            ) : (
              alertData.map((item, key) => (
                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="flex items-center justify-center px-1 py-2 whitespace-nowrap">
                    {item.fromAlert}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {item.forProduct}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {item.price}
                  </td>
                  <td className="py-2 whitespace-nowrap">
                    {item.date}
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

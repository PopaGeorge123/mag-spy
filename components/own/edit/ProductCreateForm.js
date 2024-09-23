"use client"; 

import { addNewProduct } from '@/libs/API/products';
import { useState , useEffect} from "react";
import { toast } from "react-hot-toast";

export default function ProductCreateForm() {
  const [isDisabledAndLoading, setIsDisabledAndLoading] = useState(false);
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  const [productUrl, setProductUrl] = useState('');
  
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    // Get the user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);

    // Get the user's local time
    // const now = new Date();
    // setLocalTime(now.toString()); // You can format this as needed
  }, []);

  return (
    <div 
      className="max-w-sm mx-auto"
    >
        {/* <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name your product</label>
          <input 
            onChange={(e) => setName(e.target.value)}
            type="text" 
            className="text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div> */}
        {/* <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Write a description</label>
          <input 
            onChange={(e) => setDescription(e.target.value)}
            type="text" 
            className="text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div> */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Link</label>
          <input 
            onChange={(e) => setProductUrl(e.target.value)}
            type="text" 
            className="text-base bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='https://link-of-a-product' required />
        </div>
        
        <button
          className="btn btn-primary btn-block"
          onClick={async () => {
            setIsDisabledAndLoading(true);
            toast.success("Be patient, we are adding your product...");
            const response = await addNewProduct({productUrl ,timezone});
            if(response.status === "error") {
              toast.error(response.message);
            }
            else {
              toast.success("Product added successfully!");
              location.href = '/dashboard/products';
            }
            setIsDisabledAndLoading(false);
          }}
          disabled={isDisabledAndLoading}
        >
          {isDisabledAndLoading ? "Adding product..." : "Add product"}
          {isDisabledAndLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        {/* {result && (
          <div className="mt-5">
            {result.ok ? (
              <p className="text-green-500">Product added successfully!</p>
            ) : (
              <p className="text-red-500">Failed to add product.</p>
            )}
          </div>
        )} */}
      </div>
  );
}
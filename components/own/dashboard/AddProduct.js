"use server";

import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

export default async function AddProductButton() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex fixed bottom-4 right-4">
      <a

        href="/dashboard/products/add-product"
        className="rounded-full bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <svg className="w-10 h-14 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd" />
        </svg>

      </a>
    </div>
  )
}

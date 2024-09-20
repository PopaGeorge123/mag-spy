"use client";

import { unsubscribe } from "@/libs/API/newsLetter";
import { redirect } from 'next/navigation';
import toast from "react-hot-toast";
import { useState } from "react";



export default function UnsubscribePage({ searchParams }) {
  const [hasUnsubscribed, setHasUnsubscribed] = useState(false);

  try {
    const { user } = searchParams;
    if (!user) {
      // Redirect to a different page if the user is not found
      return redirect('/');
    }
    return (
      <>
        {!hasUnsubscribed && (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h1 className="text-2xl font-bold mb-4">Are you sure you want to unsubscribe?</h1>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={async () => {
                    const result = await unsubscribe(user);
                    if (result.status === "ok") {
                      toast.success(result.message);
                      setHasUnsubscribed(true);
                    }
                  }}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    location.href = '/';
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}


        {hasUnsubscribed && (<div className="flex flex-col w-full mt-80 items-center justify-center">
          <img src="/icon.png" alt="logo image"
            className="w-20 h-20 mb-4"
          />
          <h1 className="text-3xl text-white text-center "> You unsubscribed successfully </h1>
          <a href="/" className="text-blue-500 m-5">Go to main page</a>
        </div>)}
      </>
    );
  } catch (e) {
    console.error(e);
    return (
      <></>
    )
  }
}

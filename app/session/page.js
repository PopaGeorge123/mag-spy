"use client";

import { useState, useEffect } from "react";
import { addDemoProduct } from "@/libs/API/demo";
import toast from "react-hot-toast";
import { track } from '@vercel/analytics';

export default function DemoSection() {

  const [currentStep, setCurrentStep] = useState(0);
  const [productUrl, setProductUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    // Get the user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);
    track('Demo Clicked', {
      location: 'Hero'
    });
    //check if user has demo product
    const demoProductId = localStorage.getItem("demoProductId");
    if (demoProductId) {
      const cleanedDemoProductId = demoProductId.trim().replace(/"/g, "");
      location.href = "/session/" + cleanedDemoProductId;
    }

  }, []);

  const executeButtonClick = async () => {
    if (currentStep < 1) {
      setCurrentStep(currentStep + 1);
      track("Readed Demo Steps")
    } else {
      setIsLoading(true);
      toast.success("Getting data... Be patient");
      const response = await addDemoProduct({ productUrl, timezone });
      if (response.status === "success") {
        toast.success(response.message);
        localStorage.setItem("demoProductId", JSON.stringify(response.productId));

        setTimeout(() => {
          location.href = response.location;
        }, 1500);

      }
      if (response.status === "error") {
        toast.error(response.message);
        setProductUrl("");
      }
      if (response.status === "warning") {
        toast.success(response.message);
        setTimeout(() => {
          location.href = "/dashboard/products";
        }, 3000);
      }
      setIsLoading(false);
    }
  }

  const titleInfo = [
    "Find a Product",  // This title corresponds to the first step of finding a product on an online store.
    "Copy and Paste the URL"  // This title corresponds to the second step, where users copy the product URL and paste it into the input box.
  ];
  

  const textInfo = [
    "Begin by visiting your preferred online shopping platform. Browse through the products until you find an item you are interested in tracking, such as a specific gadget, clothing item, or household product. Make sure to choose a reputable store that supports product tracking features.",
    "Once you have selected the product you want to track, navigate to its dedicated product page. From there, copy the complete URL (web address) of the product page. Afterward, paste this URL into the input box below. That is all! Now you can enjoy your free time!"
  ];
  
  const images = [
    "/exampleStore.png",  // This image shows an example of a typical product page from an online store, including important elements such as the product name, price, and availability.
    "/exampleStore2.png"  // This image provides a secondary example, showcasing another type of product page from a different online store, helping users understand the variety of formats supported.
  ];

  return (
    <div>
      <div className="bg-grey-600 m-3 mx-auto w-full flex flex-col items-center justify-center  ">

        <div className=" flex flex-col md:flex-row items-center">
          <div className="flex flex-col items-center justify-center  w-full md:w-1/2">
            <h1 className="text-3xl md:text-5xl text-white text-bold m-5">{titleInfo[currentStep]}</h1>
            <h1 className="text-xl font-bold text-center mx-4 my-4 md:w-1/2">{textInfo[currentStep]}</h1>
          </div>
          <img
            src={images[currentStep]}
            alt="Example Store"
            className="rounded-lg w-full mx-auto m-3 md:w-1/3"
          >
          </img>
        </div>

        {
          currentStep === 1 && (
            <input
              type="text"
              placeholder="Paste the URL here"
              className="input input-bordered w-full max-w-md mt-3"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
            />
          )
        }

        <button
          className="btn btn-primary btn-wide w-full mx-auto max-w-md m-3 "
          onClick={executeButtonClick}
          disabled={isLoading}
        >
          {currentStep === 1 ? (isLoading ? "Getting Data" : "Track Product") : "Next"}
          {isLoading ? (
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
      </div>
    </div>
  )
}

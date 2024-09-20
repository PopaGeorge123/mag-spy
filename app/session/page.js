"use client";

import { Suspense } from "react";

import Image from "next/image";
import { useState, useEffect } from "react";
import { addDemoProduct } from "@/libs/API/demo";
import toast from "react-hot-toast";

export default function SessionPage() {

  const [currentStep, setCurrentStep] = useState(0);
  const [productUrl, setProductUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    // Get the user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);

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

  const textInfo = [
    "Visit your favorite online store and find a product you want to track.",
    "Copy the URL of the product page and paste it into the box bellow. The prduct page must be similar to the example below.",
  ]
  const images = [
    "/exampleStore.png",
    "/exampleStore2.png",
  ]

  return (
    <div>
      <div className="flex flex-col items-center justify-center m-3 mt-5 rounded-lg">
        
          <h1 className="text-xl font-bold text-center m-3">{textInfo[currentStep]}</h1>
          <img
            src={images[currentStep]}
            alt="Example Store"
            className="rounded-lg w-full mx-auto m-3 md:w-2/3 lg:w-1/3"
          >
          </img>
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
          className="btn btn-primary btn-wide w-full max-w-md m-3"
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

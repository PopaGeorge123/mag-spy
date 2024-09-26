"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getPriceHistory } from "@/libs/API/price";

// Dynamically import the ReactApexChart component with no SSR
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PriceChart({ productId }) {
  const [data, setData] = useState({});
  const [dates, setDates] = useState([]);
  const [prices, setPrices] = useState([]);
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getPriceHistory(productId);
      setData(data);
    }
    fetchData();
  }, [productId]);

  useEffect(() => {
    if (data.historyData) {
      const dates = data.historyData.map((item) => item.date);
      const prices = data.historyData.map((item) => item.price);
      setDates(dates);
      setPrices(prices);
    }
    if(data.productData){
      setProductData(data.productData);
    }
    setIsLoading(false);
  }, [data]);  

  const options = {
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.8,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 5,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: "Preț",
        data: prices,
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: dates,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 relative">
      <div className="flex justify-between">
        <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">{prices[prices.length-1]} {dates.length === 0 ? "" : productData.currency}</h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Pretul actual</p>
        </div>
        <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
          {/* {grow_percent} */}
          {/* <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
          </svg> */}
        </div>
      </div>
      <div id="area-chart">
        {isLoading || dates.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-64 w-full">
            <div className="w-10 h-10 border-2 border-t-2 border-gray-200 rounded-full animate-spin">
              <h1>.</h1>
            </div>
            <h1 className='m-5'>Nu există date încă !</h1>
          </div>
        ) : (
          <ReactApexChart options={options} series={options.series} type="area" height="300%" width="100%" />
        )}
      </div>
    </div>
  );
}
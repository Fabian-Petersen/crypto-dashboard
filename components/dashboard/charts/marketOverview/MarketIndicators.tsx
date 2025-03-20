import salesData from "@/public/data/marketOverviewData";
import React from "react";

function MarketIndicators() {
  return (
    <>
      {salesData.map((item) => {
        return (
          <article
            key={item.id}
            className={`p-2 flex flex-col gap-2 justify-evenly flex-1`}
          >
            <span className="rounded-full size-8 flex items-center justify-center text-white"></span>
            <div className="text-sm text-gray-700 capitalize">{item.title}</div>
            <p className="text-gray-900 capitalize text-[1.3rem] font-bold">
              {item.value}
            </p>
            <p className="text-sm text-gray-700">
              {item.trend} <span>%</span>
            </p>
          </article>
        );
      })}
    </>
  );
}

export default MarketIndicators;

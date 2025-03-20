import MarketOverviewData from "@/public/data/marketOverviewData";
import React from "react";

function WishlistIndicators() {
  return (
    <>
      {MarketOverviewData.map((item) => {
        return (
          <article key={item.id} className={`p-2 flex justify-between`}>
            <div className="flex flex-col gap-2 justify-evenly flex-1">
              <div className="text-sm text-gray-700 capitalize">
                {item.title}
              </div>
              <p>{item.title}</p>
            </div>
            <div className="flex flex-col gap-2 justify-evenly flex-1">
              <p className="text-gray-900 capitalize text-[1.3rem] font-bold">
                {item.value}
              </p>
              <p className="text-sm text-gray-700">
                {item.trend} <span>%</span>
              </p>
            </div>
          </article>
        );
      })}
    </>
  );
}

export default WishlistIndicators;

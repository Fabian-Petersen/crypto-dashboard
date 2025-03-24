import salesData from "@/public/data/marketOverviewData";
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

function MarketIndicators() {
  return (
    <>
      {salesData.map((item) => {
        // Determine if trend is positive or negative
        const isPositive = Number(item.trend) >= 0;
        const trendColor = isPositive ? "text-green-500" : "text-red-500";

        return (
          <article
            key={item.id}
            className={`p-2 flex flex-col gap-2 justify-evenly flex-1`}
          >
            <div className="text-sm text-gray-700 dark:text-gray-200 capitalize">
              {item.title}
            </div>
            <p className="text-gray-900 dark:text-gray-200 capitalize text-[1.3rem] font-bold">
              {item.value}
            </p>
            <p className={`text-sm flex items-center ${trendColor}`}>
              {isPositive ? (
                <ArrowUp size={16} className="mr-1" />
              ) : (
                <ArrowDown size={16} className="mr-1" />
              )}
              {Math.abs(Number(item.trend)).toFixed(2)}
              <span>%</span>
            </p>
          </article>
        );
      })}
    </>
  );
}

export default MarketIndicators;

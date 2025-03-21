import React from "react";
import MarketIndicators from "./MarketIndicators";
import ChartHeading from "@/components/ChartHeading";

type Props = {
  className?: string;
};

const MarketOverviewChart = ({ className }: Props) => {
  return (
    <div
      className={`${className} flex flex-col p-4 border gap-4 border-gray-200 dark:border-gray-700 dark:bg-slate-800 rounded-lg shadow-md`}
    >
      <div className="flex flex-col">
        <ChartHeading
          title="Market Overview"
          subHeading="Live market indices and commodoties"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex md:gap-2 md:items-start">
        <MarketIndicators />
      </div>
    </div>
  );
};

export default MarketOverviewChart;

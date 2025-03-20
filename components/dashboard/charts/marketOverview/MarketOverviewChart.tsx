import React from "react";
import MarketIndicators from "./MarketIndicators";
import Heading from "../../../ChartHeading";

type Props = {
  className?: string;
};

const MarketOverviewChart = ({ className }: Props) => {
  return (
    <div
      className={`${className} flex flex-col h-auto p-6 border border-gray-200 rounded-lg shadow-md`}
    >
      <div className="flex items-center">
        <div className="flex flex-col gap-1">
          <Heading title="Market Overview" />
          <p className="text-sm text-gray-500">
            Live market indices and commodoties
          </p>
        </div>
      </div>
      <div className="md:flex md:gap-2 gap-2 sm:gap-4 grid grid-cols-2">
        <MarketIndicators />
      </div>
    </div>
  );
};

export default MarketOverviewChart;

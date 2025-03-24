import React from "react";
import MarketIndicators from "./MarketIndicators";
import ChartHeading from "@/components/ChartHeading";
import useScreenSize from "@/app/hooks/useScreenSize";

type Props = {
  className?: string;
};

const MarketOverviewChart = ({ className }: Props) => {
  const isMobile = useScreenSize(468);
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
      <div
        className={`grid ${
          isMobile ? "grid-cols-2" : "grid-cols-3"
        } xl:flex gap-2`}
      >
        <MarketIndicators />
      </div>
    </div>
  );
};

export default MarketOverviewChart;

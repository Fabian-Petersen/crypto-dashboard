import React from "react";
import ChartHeading from "@/components/ChartHeading";

function Stocks() {
  return (
    <div className="p-2 col-span-full border border-gray-200 shadow-md h-[500px] rounded-md">
      <ChartHeading title="Stocks" subHeading="Top performing stocks today" />
    </div>
  );
}

export default Stocks;

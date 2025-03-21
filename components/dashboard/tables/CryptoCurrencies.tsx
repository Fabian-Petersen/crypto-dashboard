import React from "react";
import ChartHeading from "@/components/ChartHeading";

function CryptoCurrencies() {
  return (
    <div className="p-4 col-span-full row-start-2 border border-gray-200 shadow-md rounded-md">
      <ChartHeading
        title="Crypto Currencies"
        subHeading="Top cryptocurrencies by market cap"
      />
    </div>
  );
}

export default CryptoCurrencies;

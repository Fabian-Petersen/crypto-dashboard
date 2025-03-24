"use client";

// $ This component uses CoinMarketCap to fetch the data for the Cryptocurrencies list

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ChartHeading from "@/components/ChartHeading";
import { ArrowUp, ArrowDown } from "lucide-react";

type CryptoData = {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      market_cap: number;
      volume_24h: number;
    };
  };
};

// $ Function to fetch cryptocurrency data
const fetchCryptoData = async (): Promise<CryptoData[]> => {
  // $ Change the url to the actual API endpoint for production.
  const response = await fetch("/data/coinMarketCryptoLatest.json");

  if (!response.ok) {
    throw new Error("Failed to fetch cryptocurrency data");
  }

  const data = await response.json();

  if (!data || !data.data || !Array.isArray(data.data)) {
    throw new Error("Invalid data format");
  }

  // Sort by market cap (highest to lowest)
  return [...data.data].sort(
    (a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap
  );
};

function CryptoCurrencies() {
  // Use React Query to fetch and cache the data
  const {
    data: cryptoData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cryptoData"],
    queryFn: fetchCryptoData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });

  // Helper function to format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Helper function to format large numbers
  const formatLargeNumber = (num: number): string => {
    if (num >= 1e12) {
      return `$${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`;
    } else if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(2)}K`;
    } else {
      return `$${num.toFixed(2)}`;
    }
  };

  // Helper function to format percentage
  const formatPercentage = (percent: number): string => {
    return `${percent > 0 ? "+" : ""}${percent.toFixed(2)}%`;
  };

  return (
    <div
      id="cryptocurrencies"
      className="p-4 col-span-full row-start-2 border border-gray-200 dark:border-gray-700 shadow-md rounded-md h-[500px] overflow-auto"
    >
      <ChartHeading
        title="Crypto Currencies"
        subHeading="Top cryptocurrencies by market cap"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-pulse">Loading cryptocurrency data...</div>
        </div>
      ) : error ? (
        <div className="text-red-500 mt-4">
          {error instanceof Error
            ? error.message
            : "Failed to load cryptocurrency data"}
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-md table-fixed">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">
                  Name
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">
                  Price
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">
                  Change (24h)
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">
                  Market Cap
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">
                  Volume (24h)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {cryptoData?.map((crypto) => (
                <tr
                  key={crypto.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {crypto.name}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-gray-900 dark:text-white">
                    {formatCurrency(crypto.quote.USD.price)}
                  </td>
                  <td
                    className={`py-4 px-4 whitespace-nowrap text-right ${
                      crypto.quote.USD.percent_change_24h >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    } flex items-center justify-end`}
                  >
                    {crypto.quote.USD.percent_change_24h >= 0 ? (
                      <ArrowUp className="mr-1" size={16} />
                    ) : (
                      <ArrowDown className="mr-1" size={16} />
                    )}
                    {formatPercentage(crypto.quote.USD.percent_change_24h)}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-gray-900 dark:text-white">
                    {formatLargeNumber(crypto.quote.USD.market_cap)}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-gray-900 dark:text-white">
                    {formatLargeNumber(crypto.quote.USD.volume_24h)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CryptoCurrencies;

"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ChartHeading from "@/components/ChartHeading";
import { ArrowUp, ArrowDown } from "lucide-react";

// Mock data for development - would be replaced with actual API call in production
import sampleStockData from "@/public/data/sampleStockData_twelveData";
import mockTopGainersLosers from "@/public/data/topGainerLosers.json";

type StockData = {
  ticker: string;
  name: string;
  price: number;
  change_amount: number;
  change_percentage: number;
  volume: number;
};

// Function to fetch stock data
const fetchStockData = async (): Promise<StockData[]> => {
  // In production, replace with actual API call
  // const apiKey = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY;
  // const response = await axios.get(`https://api.twelvedata.com/stocks?apikey=${apiKey}`);

  // For development, use the mock data
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Parse the top gainers data from the mock json file
  const topGainers = mockTopGainersLosers.top_gainers.map((stock) => ({
    ticker: stock.ticker,
    name: stock.ticker, // We don't have company names in the mock data, so using ticker as name
    price: parseFloat(stock.price),
    change_amount: parseFloat(stock.change_amount),
    change_percentage: parseFloat(stock.change_percentage.replace("%", "")),
    volume: parseInt(stock.volume),
  }));

  // Parse the most actively traded data
  const mostActiveStocks = mockTopGainersLosers.most_actively_traded.map(
    (stock) => ({
      ticker: stock.ticker,
      name: stock.ticker, // Using ticker as name
      price: parseFloat(stock.price),
      change_amount: parseFloat(stock.change_amount),
      change_percentage: parseFloat(stock.change_percentage.replace("%", "")),
      volume: parseInt(stock.volume),
    })
  );

  // Combine and sort by highest change percentage
  const combinedData = [...topGainers, ...mostActiveStocks]
    .sort((a, b) => b.change_percentage - a.change_percentage)
    .slice(0, 15); // Take top 15

  return combinedData;
};

const Stocks: React.FC = () => {
  // Use React Query to fetch and cache the data
  const {
    data: stockData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stockData"],
    queryFn: fetchStockData,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });

  // Use state to track market status from sample data
  const [marketStatus, setMarketStatus] = useState<string>("");

  useEffect(() => {
    // Check if markets are open from the sample data
    const usMarkets = sampleStockData.filter(
      (market) => market.country === "United States"
    );

    const isAnyMarketOpen = usMarkets.some((market) => market.is_market_open);

    if (isAnyMarketOpen) {
      const openMarket = usMarkets.find((market) => market.is_market_open);
      setMarketStatus(
        `Markets Open - Closes in ${openMarket?.time_to_close
          .split(":")
          .slice(0, 2)
          .join(":")}`
      );
    } else {
      const closedMarket = usMarkets[0];
      setMarketStatus(
        `Markets Closed - Opens in ${closedMarket?.time_to_open
          .split(":")
          .slice(0, 2)
          .join(":")}`
      );
    }
  }, []);

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
    if (num >= 1e9) {
      return `${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `${(num / 1e6).toFixed(2)}M`;
    } else if (num >= 1e3) {
      return `${(num / 1e3).toFixed(2)}K`;
    } else {
      return num.toString();
    }
  };

  // Helper function to format percentage
  const formatPercentage = (percent: number): string => {
    return `${percent > 0 ? "+" : ""}${percent.toFixed(2)}%`;
  };

  return (
    <div className="p-4 col-span-full row-start-1 border border-gray-200 dark:border-gray-700 shadow-md rounded-md h-[500px] overflow-auto">
      <div className="flex justify-between items-start">
        <ChartHeading title="Stocks" subHeading="Top Performing Stocks Today" />
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {marketStatus}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-pulse">Loading stock data...</div>
        </div>
      ) : error ? (
        <div className="text-red-500 mt-4">
          {error instanceof Error ? error.message : "Failed to load stock data"}
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-md table-fixed">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">
                  Symbol
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">
                  Price
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">
                  Change (24h)
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">
                  % Change
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/5">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {stockData?.map((stock, index) => (
                <tr
                  key={`${stock.ticker}-${index}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="py-4 px-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {stock.ticker}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-gray-900 dark:text-white">
                    {formatCurrency(stock.price)}
                  </td>
                  <td
                    className={`py-4 px-4 whitespace-nowrap text-right ${
                      stock.change_amount >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    } flex items-center justify-end`}
                  >
                    {stock.change_amount >= 0 ? (
                      <ArrowUp className="mr-1" size={16} />
                    ) : (
                      <ArrowDown className="mr-1" size={16} />
                    )}
                    {formatCurrency(Math.abs(stock.change_amount))}
                  </td>
                  <td
                    className={`py-4 px-4 whitespace-nowrap text-right ${
                      stock.change_percentage >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatPercentage(stock.change_percentage)}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-gray-900 dark:text-white">
                    {formatLargeNumber(stock.volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Stocks;

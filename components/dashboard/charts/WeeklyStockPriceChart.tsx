"use client";

import { useEffect, useState } from "react";
import ChartHeading from "@/components/ChartHeading";
import { useGlobalContext } from "@/app/hooks/useGlobalContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type StockDataPoint = {
  date: string;
  formattedDate: string;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
};

type WeeklyStockPriceChartProps = {
  className?: string;
  symbol?: string;
};

const WeeklyStockPriceChart = ({ className }: WeeklyStockPriceChartProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [stockData, setStockData] = useState<StockDataPoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [priceChangePercent, setPriceChangePercent] = useState<string>("0.00");

  const { symbol, setSymbol } = useGlobalContext();

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_APIKEY_ALPHA_VANTAGE as string;
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
      setLoading(true);
      try {
        // $ Use the mock data to create the components, change to the real endpoint for the production application
        const response = await fetch(url);
        const data = await response.json();

        // Extract and format the data
        const timeSeriesData: Record<
          string,
          {
            "1. open": string;
            "2. high": string;
            "3. low": string;
            "4. close": string;
            "5. volume": string;
          }
        > = data["Time Series (Daily)"];
        const dates = Object.keys(timeSeriesData).sort();
        const last7Dates = dates.slice(-7);

        const formattedData = last7Dates.map((date) => {
          const dailyData = timeSeriesData[date];
          const dateObj = new Date(date);
          const month = dateObj.toLocaleString("default", { month: "short" });
          const day = dateObj.getDate();

          return {
            date: date,
            formattedDate: `${month} ${day}`,
            close: parseFloat(dailyData["4. close"]),
            open: parseFloat(dailyData["1. open"]),
            high: parseFloat(dailyData["2. high"]),
            low: parseFloat(dailyData["3. low"]),
            volume: parseInt(dailyData["5. volume"]),
          };
        });

        // $ Calculate price change
        const current = formattedData[0].close;
        const previous = formattedData[1].close;
        const change = current - previous;
        const changePercent = ((change / previous) * 100).toFixed(2);

        setStockData(formattedData);
        setCurrentPrice(current);
        setPriceChange(change);
        setPriceChangePercent(changePercent);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  // For displaying the current price change sign
  const priceChangeSign = priceChange >= 0 ? "+" : "";
  const priceChangeClass = priceChange >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div
      className={`${className} flex flex-col rounded-lg p-4 h-auto shadow-md gap-4 border border-gray-200 dark:border-gray-700 dark:bg-slate-800`}
    >
      <div className="flex justify-between items-center">
        <ChartHeading
          title={symbol}
          subHeading={
            loading ? (
              "Loading..."
            ) : (
              <span className="flex gap-2 text-xl justify-center items-center">
                ${currentPrice.toFixed(2)}
                <span className={`${priceChangeClass} text-sm`}>
                  {priceChangeSign}
                  {priceChange.toFixed(2)} ({priceChangeSign}
                  {priceChangePercent}%)
                </span>
              </span>
            )
          }
        />
        <div className="flex dark:bg-gray-600 bg-gray-200 p-1 rounded gap-2">
          <button
            className="px-2 py-1 dark:text-white justify-center items-center hover:bg-white hover:cursor-pointer hover:rounded hover:text-gray-900"
            onClick={() => setSymbol("IBM")}
          >
            IBM
          </button>
          <button
            className="px-2 py-1 dark:text-white justify-center items-center hover:bg-white hover:cursor-pointer hover:rounded hover:text-gray-900"
            onClick={() => setSymbol("BTC")}
          >
            BTC
          </button>
          <button
            className="px-2 py-1 dark:text-white justify-center items-center hover:bg-white hover:cursor-pointer hover:rounded hover:text-gray-900"
            onClick={() => setSymbol("ETH")}
          >
            ETH
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 dark:border-gray-200"></div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={stockData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="formattedDate"
              className="text-sm"
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              domain={[
                (dataMin: number) => dataMin - 5,
                (dataMax: number) => dataMax + 5,
              ]}
              className="text-sm"
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke={priceChange >= 0 ? "#10B981" : "#EF4444"}
              fill={
                priceChange >= 0
                  ? "rgba(16, 185, 129, 0.2)"
                  : "rgba(239, 68, 68, 0.2)"
              }
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default WeeklyStockPriceChart;

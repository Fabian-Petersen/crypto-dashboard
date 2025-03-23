"use client";

import { useState } from "react";
import useFetchData from "@/app/hooks/useFetchData";
import ChartHeading from "@/components/ChartHeading";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Environment variable for API key
const ALPHA_VANTAGE_API_KEY =
  process.env.NEXT_PUBLIC_APIKEY_ALPHA_VANTAGE || "";

/**
 * Example component for cryptocurrency data
 */
const CryptoTrackerExample = () => {
  const [crypto, setCrypto] = useState("IBM");
  const [market, setMarket] = useState("USD");

  // Define the full response type for Digital Currency Daily
  interface CryptoTimeSeriesValue {
    "1a. open (USD)": string;
    "1b. open (USD)": string;
    "2a. high (USD)": string;
    "2b. high (USD)": string;
    "3a. low (USD)": string;
    "3b. low (USD)": string;
    "4a. close (USD)": string;
    "4b. close (USD)": string;
    "5. volume": string;
    "6. market cap (USD)": string;
  }

  interface CryptoMetaData {
    "1. Information": string;
    "2. Digital Currency Code": string;
    "3. Digital Currency Name": string;
    "4. Market Code": string;
    "5. Market Name": string;
    "6. Last Refreshed": string;
    "7. Time Zone": string;
  }

  interface CryptoDailyResponse {
    "Meta Data": CryptoMetaData;
    "Time Series (Digital Currency Daily)": Record<
      string,
      CryptoTimeSeriesValue
    >;
  }

  const { data, isLoading, isError, error } = useFetchData<CryptoDailyResponse>(
    {
      function: "TIME_SERIES_DAILY",
      symbol: crypto,
    },
    ALPHA_VANTAGE_API_KEY,
    {
      staleTime: 300000, // 5 minutes
      refetchInterval: false,
    }
  );

  // Define types for the Alpha Vantage Crypto API response
  interface CryptoTimeSeriesValue {
    "1a. open (USD)": string;
    "1b. open (USD)": string;
    "2a. high (USD)": string;
    "2b. high (USD)": string;
    "3a. low (USD)": string;
    "3b. low (USD)": string;
    "4a. close (USD)": string;
    "4b. close (USD)": string;
    "5. volume": string;
    "6. market cap (USD)": string;
  }

  //   type CryptoTimeSeries = Record<string, CryptoTimeSeriesValue>;

  // Process the time series data for the chart
  const chartData =
    data && data["Time Series (Digital Currency Daily)"]
      ? Object.entries(data["Time Series (Digital Currency Daily)"])
          .slice(0, 30) // Get last 30 days
          .map(([date, values]) => ({
            date,
            close: parseFloat(values["4a. close (USD)"]),
            open: parseFloat(values["1a. open (USD)"]),
            high: parseFloat(values["2a. high (USD)"]),
            low: parseFloat(values["3a. low (USD)"]),
            volume: parseFloat(values["5. volume"]),
          }))
          .reverse() // Show oldest to newest
      : [];

  // Define type for Alpha Vantage Crypto Metadata
  interface CryptoMetaData {
    "1. Information": string;
    "2. Digital Currency Code": string;
    "3. Digital Currency Name": string;
    "4. Market Code": string;
    "5. Market Name": string;
    "6. Last Refreshed": string;
    "7. Time Zone": string;
  }

  // Get the metadata
  const metaData =
    data && data["Meta Data"]
      ? {
          symbol: data["Meta Data"]["2. Digital Currency Code"],
          name: data["Meta Data"]["3. Digital Currency Name"],
          market: data["Meta Data"]["4. Market Code"],
          lastRefreshed: data["Meta Data"]["6. Last Refreshed"],
        }
      : null;

  const handleCryptoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCrypto(e.target.value);
  };

  const handleMarketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMarket(e.target.value);
  };

  // Format currency values for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800">
      <ChartHeading
        title={
          metaData
            ? `${metaData.name} (${metaData.symbol})`
            : "Cryptocurrency Tracker"
        }
        subHeading={
          metaData
            ? `Last Updated: ${metaData.lastRefreshed}`
            : "Select a cryptocurrency to view data"
        }
      />

      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label
            htmlFor="crypto"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Cryptocurrency
          </label>
          <select
            id="crypto"
            value={crypto}
            onChange={handleCryptoChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
            <option value="ADA">Cardano</option>
            <option value="SOL">Solana</option>
            <option value="DOT">Polkadot</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="market"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Market Currency
          </label>
          <select
            id="market"
            value={market}
            onChange={handleMarketChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      {isLoading && (
        <p className="text-center py-4">Loading cryptocurrency data...</p>
      )}

      {isError && (
        <div className="text-red-500 py-4">
          Error:{" "}
          {(error as Error).message || "Failed to fetch cryptocurrency data"}
        </div>
      )}

      {!isLoading && !isError && chartData.length === 0 && (
        <p className="text-center py-4">
          No data available for the selected cryptocurrency
        </p>
      )}

      {chartData.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Current Price
              </p>
              <p className="text-lg font-bold">
                {formatCurrency(chartData[chartData.length - 1].close)}
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                24h High
              </p>
              <p className="text-lg font-bold">
                {formatCurrency(chartData[chartData.length - 1].high)}
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                24h Low
              </p>
              <p className="text-lg font-bold">
                {formatCurrency(chartData[chartData.length - 1].low)}
              </p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                24h Volume
              </p>
              <p className="text-lg font-bold">
                {Math.round(
                  chartData[chartData.length - 1].volume
                ).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="h-80 border border-gray-300">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(tick) => {
                    const date = new Date(tick);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tickFormatter={(tick) => formatCurrency(tick)}
                />
                <Tooltip
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Price",
                  ]}
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString()
                  }
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="close"
                  name="Close Price"
                  stroke="#8884d8"
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoTrackerExample;

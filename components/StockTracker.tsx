// "use client";

// import { useState } from "react";
// import useFetchData from "@/app/hooks/useFetchData";

// // Environment variable or configuration for your API key
// const ALPHA_VANTAGE_API_KEY =
//   process.env.NEXT_PUBLIC_APIKEY_ALPHA_VANTAGE || "";

// type StockData = {
//   symbol: string;
//   price: number;
//   change: number;
//   changePercent: number;
//   timestamp: string;
// };

// /**
//  * Example component showing how to use the Alpha Vantage hook
//  */
// const StockTracker = () => {
//   const [symbol, setSymbol] = useState("AAPL");

//   const { data, isLoading, isError, error, refetch } = useFetchData(
//     {
//       function: "GLOBAL_QUOTE",
//       symbol: symbol,
//     },
//     ALPHA_VANTAGE_API_KEY,
//     {
//       // Refetch data every 60 seconds (Alpha Vantage has rate limits)
//       refetchInterval: 60000,
//       // Don't refetch on window focus to avoid hitting rate limits
//       refetchOnWindowFocus: false,
//       // Keep data fresh for 5 minutes
//       staleTime: 300000,
//     }
//   );

//   // Transform the API response into a more usable format
//   const processedData: StockData | null =
//     data && data["Global Quote"]
//       ? {
//           symbol: data["Global Quote"]["01. symbol"],
//           price: parseFloat(data["Global Quote"]["05. price"]),
//           change: parseFloat(data["Global Quote"]["09. change"]),
//           changePercent: parseFloat(
//             data["Global Quote"]["10. change percent"].replace("%", "")
//           ),
//           timestamp: data["Global Quote"]["07. latest trading day"],
//         }
//       : null;

//   const handleSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSymbol(e.target.value.toUpperCase());
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     refetch();
//   };

//   return (
//     <div className="p-4 border border-gray-200 rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Stock Tracker</h2>

//       <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
//         <input
//           type="text"
//           value={symbol}
//           onChange={handleSymbolChange}
//           placeholder="Enter stock symbol"
//           className="p-2 border border-gray-300 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Fetch Data
//         </button>
//       </form>

//       {isLoading && <p>Loading...</p>}

//       {isError && (
//         <div className="text-red-500">
//           Error: {(error as Error).message || "Failed to fetch data"}
//         </div>
//       )}

//       {processedData && (
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold">{processedData.symbol}</h3>
//           <p className="text-2xl font-bold">
//             ${processedData.price.toFixed(2)}
//           </p>

//           <div
//             className={`flex items-center mt-2 ${
//               processedData.change >= 0 ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             <span>{processedData.change >= 0 ? "▲" : "▼"}</span>
//             <span className="ml-1">
//               {processedData.change.toFixed(2)} (
//               {processedData.changePercent.toFixed(2)}%)
//             </span>
//           </div>

//           <p className="text-sm text-gray-500 mt-2">
//             Last updated: {processedData.timestamp}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockTracker;

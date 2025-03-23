// $ This hook uses react query to fetch data from the Alpha Vantage API. It takes the API parameters, API key, and additional options as arguments and returns a query result with data, error, and loading state. The hook uses axios to make the API request and checks for API errors in the response. The useFetchData hook can be used in any component to fetch data from the Alpha Vantage API.

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type AlphaVantageFunction =
  | "TIME_SERIES_DAILY"
  | "TIME_SERIES_WEEKLY"
  | "TIME_SERIES_MONTHLY"
  | "GLOBAL_QUOTE"
  | "SYMBOL_SEARCH"
  | "CRYPTO_INTRADAY"
  | "CRYPTO_DAILY"
  | "CRYPTO_WEEKLY";

type AlphaVantageParams = {
  function: AlphaVantageFunction;
  symbol?: string;
  keywords?: string;
  interval?: "1min" | "5min" | "15min" | "30min" | "60min";
  outputsize?: "compact" | "full";
  datatype?: "json" | "csv";
  market?: string;
};

// Define response types
export interface AlphaVantageErrorResponse {
  "Error Message": string;
}

export interface AlphaVantageFrequencyResponse {
  Information: string;
}

/**
 * Custom hook for fetching data from Alpha Vantage API
 *
 * @param params - Alpha Vantage API parameters
 * @param apiKey - Your Alpha Vantage API key
 * @param options - Additional options for react-query
 * @returns Query result with data, error, and loading state
 */
const useFetchData = <T = unknown>(
  params: AlphaVantageParams,
  apiKey: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
    refetchInterval?: number | false;
    refetchOnWindowFocus?: boolean;
  }
) => {
  const fetchData = async (): Promise<T> => {
    const url = new URL("https://www.alphavantage.co/query");

    // $ Add API key
    url.searchParams.append("apikey", apiKey);

    // $ Add all parameters to the URL
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });

    const response = await axios.get<
      T | AlphaVantageErrorResponse | AlphaVantageFrequencyResponse
    >(url.toString());

    // $ Check for API errors
    if (
      response.data &&
      typeof response.data === "object" &&
      "Error Message" in response.data
    ) {
      throw new Error(
        (response.data as AlphaVantageErrorResponse)["Error Message"]
      );
    }

    if (
      response.data &&
      typeof response.data === "object" &&
      response.data !== null &&
      "Information" in response.data &&
      typeof (response.data as AlphaVantageFrequencyResponse)["Information"] ===
        "string" &&
      (response.data as AlphaVantageFrequencyResponse)["Information"].includes(
        "API call frequency"
      )
    ) {
      throw new Error("API call frequency exceeded. Please try again later.");
    }

    return response.data as T;
  };

  return useQuery({
    queryKey: ["alphaVantage", params, apiKey],
    queryFn: fetchData,
    ...options,
  });
};

export default useFetchData;

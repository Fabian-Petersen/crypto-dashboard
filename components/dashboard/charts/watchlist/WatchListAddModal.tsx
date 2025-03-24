import React, { useState, useEffect } from "react";
import { X, Search, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ChartHeading from "@/components/ChartHeading";
import type { StockIndicatorProps } from "@/public/data/StockItems";

type AddWatchlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  addIndicator: (asset: StockIndicatorProps) => void;
};

type AlphaVantageSearchResult = {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
};

const fetchSearchResults = async (
  searchTerm: string
): Promise<{ bestMatches: AlphaVantageSearchResult[] }> => {
  if (!searchTerm || searchTerm.length < 2) return { bestMatches: [] };
  const apiKey = process.env.NEXT_PUBLIC_APIKEY_ALPHA_VANTAGE as string;
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${apiKey}`;
  try {
    // const response = await fetch("/data/alphaSearchData.json");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await response.json();
    console.log(data);

    // $ Filter results based on search term to simulate server-side filtering
    const filteredMatches = data.bestMatches.filter(
      (match: AlphaVantageSearchResult) =>
        match["1. symbol"].toLowerCase().includes(searchTerm.toLowerCase()) ||
        match["2. name"].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return { bestMatches: filteredMatches };
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

const AddWatchlistModal: React.FC<AddWatchlistModalProps> = ({
  isOpen,
  onClose,
  addIndicator,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] =
    useState<AlphaVantageSearchResult | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // $ Debounce search term to prevent excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  console.log(searchTerm);
  // $ Use React Query to fetch search results
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["alphaVantageSearch", debouncedSearchTerm],
    queryFn: () => fetchSearchResults(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length >= 2 && isOpen,
  });

  const searchResults = data?.bestMatches || [];
  console.log(searchResults);

  const handleCloseModal = () => {
    onClose();
    setSearchTerm("");
    setSelectedAsset(null);
  };

  const handleSelectAsset = (asset: AlphaVantageSearchResult) => {
    setSelectedAsset(asset);
  };

  const handleAddToWatchlist = () => {
    if (selectedAsset) {
      const newAsset: StockIndicatorProps = {
        symbol: selectedAsset["1. symbol"],
        name: selectedAsset["2. name"],
        price: Math.floor(Math.random() * 1000) + 10, // Mock price
        change: Math.random() * 10 - 5, // Mock change (-5% to +5%)
      };

      addIndicator(newAsset);
      handleCloseModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <ChartHeading title="Add to Watchlist" />
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4 flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
            <Search size={20} className="text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search by symbol or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none ml-2 dark:text-white"
            />
          </div>

          {/* Search Results */}
          <div className="max-h-60 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400 flex justify-center">
                <div className="animate-spin h-5 w-5 mr-2 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                Loading results...
              </div>
            ) : isError ? (
              <div className="p-4 text-center text-red-500">
                {error instanceof Error
                  ? error.message
                  : "Failed to fetch results"}
              </div>
            ) : searchResults.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {searchResults.map((result: AlphaVantageSearchResult) => (
                  <li
                    key={result["1. symbol"]}
                    className={`p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center ${
                      selectedAsset &&
                      selectedAsset["1. symbol"] === result["1. symbol"]
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }`}
                    onClick={() => handleSelectAsset(result)}
                  >
                    <div>
                      <p className="font-medium dark:text-white">
                        {result["1. symbol"]}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {result["2. name"]}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
                          {result["3. type"]}
                        </span>
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
                          {result["4. region"]}
                        </span>
                      </div>
                    </div>
                    <button
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAsset(result);
                      }}
                    >
                      <Plus size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : debouncedSearchTerm.length > 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No results found for &quot;{debouncedSearchTerm}&quot;
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Type at least 2 characters to search
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 hover:cursor-pointer dark:text-gray-200 dark:hover:bg-gray-600 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddToWatchlist}
            disabled={!selectedAsset}
            className={`px-4 py-2 rounded-md ${
              selectedAsset
                ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
            }`}
          >
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWatchlistModal;

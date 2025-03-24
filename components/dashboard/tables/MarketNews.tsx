"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import ChartHeading from "@/components/ChartHeading";
import { Clock, ExternalLink } from "lucide-react";
import mockMarketNewsData from "@/public/data/mockMarketNewsData";

// $ Import Types
import type { NewsItem } from "@/public/data/mockMarketNewsData";

// $ Helper function to format the published time to "X time ago"
const formatTimeAgo = (timePublished: string): string => {
  const published = new Date(timePublished);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - published.getTime()) / 1000
  );

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

// $ Function to fetch market news
const fetchMarketNews = async (): Promise<NewsItem[]> => {
  // $ Use mock data in development environment
  if (process.env.NODE_ENV === "development") {
    // $ Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockMarketNewsData.feed;
  }

  // $ In production, use the actual API
  const apiKey = process.env.NEXT_PUBLIC_APIKEY_ALPHA_VANTAGE || "";
  const response = await fetch(
    `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&sort=LATEST&limit=5&apikey=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news data");
  }

  const data = await response.json();

  if (data.feed && Array.isArray(data.feed)) {
    return data.feed;
  } else {
    throw new Error("Invalid response format");
  }
};

function MarketNews() {
  // Use react-query to fetch and manage data
  const {
    data: newsFeed,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["marketNews"],
    queryFn: fetchMarketNews,
    staleTime: 60 * 60 * 1000, // Consider data fresh for 1 hour
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });

  return (
    <div className="p-4 col-span-full row-start-3 border border-gray-200 dark:border-gray-700 shadow-md rounded-md h-[500px] overflow-auto">
      <ChartHeading
        title="Market News"
        subHeading="Latest Financial News and Updates"
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-pulse">Loading latest news...</div>
        </div>
      ) : error ? (
        <div className="text-red-500 mt-4">
          Error:{" "}
          {error instanceof Error ? error.message : "Failed to load news"}
        </div>
      ) : (
        <div className="mt-4 space-y-6">
          {newsFeed?.map((item, index) => (
            <div
              key={index}
              className="p-3 dark:border-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {item.source}
                </span>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock size={12} className="mr-1" />
                  {formatTimeAgo(item.time_published)}
                </div>
              </div>

              <h3 className="font-medium mb-1 line-clamp-2 dark:text-green-500">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                {item.summary}
              </p>

              <div className="flex justify-between items-center mt-2">
                <div className="flex gap-2">
                  {item.topics.slice(0, 2).map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-300 text-xs rounded-full"
                    >
                      {topic.topic}
                    </span>
                  ))}
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read more <ExternalLink size={12} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MarketNews;

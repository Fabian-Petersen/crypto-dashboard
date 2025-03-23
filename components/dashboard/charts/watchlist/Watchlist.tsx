"use client";

import ChartHeading from "../../../ChartHeading";
import AddWishlistButton from "./WatchlistAddButton";
import WishlistItem from "./WatchlistItem";
import Stockitems from "@/public/data/StockItems";
import React, { useState } from "react";
import type { StockIndicatorProps } from "@/public/data/StockItems";
import WatchListAddModal from "./WatchListAddModal";

type WishlistProps = {
  className: string;
};

const Wishlist: React.FC<WishlistProps> = ({ className }) => {
  // $ Add the data to the state
  const [indicators, setIndicators] =
    useState<StockIndicatorProps[]>(Stockitems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // $ Function to handle removing an indicator from the wishlist
  const handleRemoveIndicator = (symbolToRemove: string) => {
    setIndicators(
      indicators.filter((indicator) => indicator.symbol !== symbolToRemove)
    );
  };

  // $ Handler for opening the modal
  const handleAddIndicator = () => {
    setIsModalOpen(true);
  };

  // $ Handler for adding a new indicator from the modal
  const handleAddToWatchlist = (asset: {
    symbol: string;
    name: string;
    price: number;
    change: number;
  }) => {
    const newIndicator: StockIndicatorProps = {
      symbol: asset.symbol,
      name: asset.name,
      price: asset.price,
      change: asset.change,
    };

    setIndicators((prev) => [...prev, newIndicator]);
  };

  return (
    <div
      className={`${className} flex flex-col rounded-lg p-4 border border-gray-200 dark:border-gray-700 dark:bg-slate-800 shadow-md gap-4`}
    >
      <ChartHeading title="Watchlist" subHeading="Track your favorite assets" />
      {indicators.length > 0 ? (
        indicators.map((indicator) => (
          <WishlistItem
            key={indicator.symbol}
            symbol={indicator.symbol}
            name={indicator.name}
            price={indicator.price}
            change={indicator.change}
            onRemove={handleRemoveIndicator}
          />
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">
          Your watchlist is empty. Add symbols to track them here.
        </div>
      )}
      <AddWishlistButton handleAddIndicator={handleAddIndicator} />
      <WatchListAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addIndicator={handleAddToWatchlist}
      />
    </div>
  );
};

export default Wishlist;

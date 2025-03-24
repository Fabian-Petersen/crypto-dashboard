import { X } from "lucide-react";
import React, { useState } from "react";
import { useGlobalContext } from "@/app/hooks/useGlobalContext";

type WatchlistItemProps = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  onRemove: (symbol: string) => void;
};

const WatchlistItem: React.FC<WatchlistItemProps> = ({
  symbol,
  name,
  price,
  change,
  onRemove,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState<string>("");
  const { setSymbol } = useGlobalContext();
  return (
    <article
      className={`flex justify-between w-full py-1 px-2 dark:hover:bg-gray-600 hover:bg-gray-100 rounded hover:cursor-pointer relative`}
      onMouseEnter={() => setHoveredItemId(symbol)}
      onMouseLeave={() => setHoveredItemId("")}
      onClick={() => setSymbol(symbol)}
      tabIndex={0} // Allows keyboard focus
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setSymbol(symbol);
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="text-sm text-gray-700 dark:text-white capitalize">
          {name}
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{symbol}</p>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <p className="text-gray-900 dark:text-white capitalize text-[1.2rem] flex gap-[3px]">
          <span>$</span>
          {price}
        </p>
        <p
          className={`text-sm ${
            change > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change.toFixed(2)}%
        </p>
      </div>
      {hoveredItemId === symbol && (
        <button
          className={`hover:cursor-pointer absolute rounded-full p-1 bg-slate-200 text-gray-900 top-[-10] left-[-5]`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(symbol);
          }}
        >
          <X size={16} />
        </button>
      )}
    </article>
  );
};

export default WatchlistItem;

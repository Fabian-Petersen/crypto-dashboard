"use client";

import ChartHeading from "../../../ChartHeading";
import AddWishlistButton from "./AddWishlistButton";
import WishlistIndicators from "./WishlistIndicators";

type Props = {
  className: string;
};

const WishlistChart = ({ className }: Props) => {
  return (
    <div
      className={`${className} flex flex-col rounded-lg p-4 border border-gray-200 dark:border-gray-700 dark:bg-slate-800 shadow-md gap-4`}
    >
      <ChartHeading title="Watchlist" subHeading="Track your favorite assets" />
      <WishlistIndicators />
      <AddWishlistButton />
    </div>
  );
};

export default WishlistChart;

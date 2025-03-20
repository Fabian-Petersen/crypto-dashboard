"use client";

import ChartHeading from "../../../ChartHeading";
import AddWishlistButton from "./AddWishlistButton";
import WishlistIndicators from "./WishlistIndicators";

type Props = {
  className: string;
};

const Wishlist = ({ className }: Props) => {
  return (
    <div
      className={`${className} flex flex-col rounded-lg p-4 border border-clr_blueGray_400 shadow-md gap-4`}
    >
      <ChartHeading title="Watchlist" subHeading="Track your favorite assets" />
      <WishlistIndicators />
      <AddWishlistButton />
    </div>
  );
};

export default Wishlist;

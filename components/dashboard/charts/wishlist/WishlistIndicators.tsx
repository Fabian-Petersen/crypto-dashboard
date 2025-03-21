import wishlistData from "@/public/data/wishlistData";
import React from "react";

function WishlistIndicators() {
  return (
    <>
      {wishlistData.map((item) => {
        return (
          <article key={item.id} className={`flex justify-between w-full`}>
            <div className="flex flex-col gap-1">
              <div className="text-sm text-gray-700 dark:text-white capitalize">
                {item.title}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.name}
              </p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <p className="text-gray-900 dark:text-white capitalize text-[1.2rem] flex gap-[3px]">
                <span>$</span>
                {item.value}
              </p>
              <p className="text-sm text-gray-700">
                {item.trend} <span>%</span>
              </p>
            </div>
          </article>
        );
      })}
    </>
  );
}

export default WishlistIndicators;

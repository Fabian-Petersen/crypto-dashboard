import React from "react";
import StockTracker from "@/components/StockTracker";
import CryptoTrackerExample from "@/components/CryptoTrackerExample";

function page() {
  return (
    <div>
      <StockTracker />
      <CryptoTrackerExample />
    </div>
  );
}

export default page;

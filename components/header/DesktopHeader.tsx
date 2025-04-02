import React from "react";
import ChartHeading from "../ChartHeading";
import ThemeToggleButton from "../ThemeToggleButton";
import useScreenSize from "@/app/hooks/useScreenSize";

export default function DesktopHeader() {
  const isMobile = useScreenSize(768);
  return isMobile ? (
    ""
  ) : (
    <div className="flex justify-between items-center py-2">
      <ChartHeading
        title="Financial Dashboard"
        subHeading="Track stocks and cryptocurrencies in real time"
      />
      <ThemeToggleButton />
    </div>
  );
}

import ChartHeading from "../ChartHeading";
import MarketOverviewChart from "./charts/marketOverview/MarketOverviewChart";
import Watchlist from "./charts/watchlist/Watchlist";
import WeeklyStockPriceChart from "./charts/WeeklyStockPriceChart";
import Stocks from "./tables/Stocks";
import CryptoCurrencies from "./tables/CryptoCurrencies";
import MarketNews from "./tables/MarketNews";
import ThemeToggleButton from "../ThemeToggleButton";

type GridProps = {
  className?: string;
};

const Grid = ({ className }: GridProps) => {
  return (
    <div className={`${className} w-full space-y-4 h-auto overflow-hidden p-4`}>
      <div className="flex justify-between items-center">
        <ChartHeading
          title="Financial Dashboard"
          subHeading="Track stocks and cryptocurrencies in real time"
        />
        <ThemeToggleButton />
      </div>
      {/* // $ Top row - Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:grid-rows-3">
        <MarketOverviewChart className="col-span-2 row-span-1" />
        <Watchlist className="row-span-3" />
        <WeeklyStockPriceChart className="col-span-2 row-start-2 row-span-2" />
      </div>

      {/* // $ Bottom grid - Tables */}
      <div className="grid gap-4 sm:grid-cols-3 sm:grid-rows-3">
        <Stocks />
        <CryptoCurrencies />
        <MarketNews />
      </div>
    </div>
  );
};

export default Grid;

// lg:grid-cols-[minmax(250px,1fr)_minmax(0px,1fr)_minmax(250px,1fr)]

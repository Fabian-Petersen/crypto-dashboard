import MarketOverviewChart from "./charts/marketOverview/MarketOverviewChart";
import Watchlist from "./charts/watchlist/Watchlist";
import WeeklyStockPriceChart from "./charts/WeeklyStockPriceChart";
import Stocks from "./tables/Stocks";
import CryptoCurrencies from "./tables/CryptoCurrencies";
import MarketNews from "./tables/MarketNews";
import DesktopHeader from "../header/DesktopHeader";

type GridProps = {
  className?: string;
};

const Grid = ({ className }: GridProps) => {
  return (
    <div className={`${className} w-full space-y-4 h-auto px-4`}>
      <DesktopHeader />
      {/* // $ Top row - Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_minmax(250px,300px)] lg:gap-4 gap-y-4 lg:grid-rows-[minmax()_1fr]">
        <MarketOverviewChart className="w-full lg:col-span-2" />
        <Watchlist className="lg:col-start-3 lg:row-span-2 row-start-3 col-span-full" />
        <WeeklyStockPriceChart className="col-span-2 row-start-2 w-full" />
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

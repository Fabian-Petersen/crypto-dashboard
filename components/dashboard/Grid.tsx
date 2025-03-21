import ChartHeading from "../ChartHeading";
import MarketOverviewChart from "./charts/marketOverview/MarketOverviewChart";
import WishlistChart from "./charts/wishlist/WishListChart";
import StockPriceChart from "./charts/StockPriceChart";
import Stocks from "./tables/Stocks";
import CryptoCurrencies from "./tables/CryptoCurrencies";
import MarketNews from "./tables/MarketNews";
import SearchBar from "../navbar/SearchBar";
import ThemeToggleButton from "../ThemeToggleButton";

type GridProps = {
  className?: string;
};

const Grid = ({ className }: GridProps) => {
  // $ Default classes shared by all the graphs
  // const defaultClasses =
  //   "rounded-lg p-4 border border-clr_blueGray_400 shadow-md h-[250px]";
  return (
    <div className={`${className} w-full space-y-4 h-auto overflow-hidden p-4`}>
      <div className="flex justify-around items-center">
        <ChartHeading
          title="Financial Dashboard"
          subHeading="Track stocks and cryptocurrencies in real time"
        />
        <SearchBar className="mr-auto" />
        <ThemeToggleButton />
      </div>
      {/* // $ Top row - Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:grid-rows-3">
        <MarketOverviewChart className="col-span-2 row-span-1" />
        <WishlistChart className="row-span-3" />
        <StockPriceChart className="col-span-2 row-start-2 row-span-2" />
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

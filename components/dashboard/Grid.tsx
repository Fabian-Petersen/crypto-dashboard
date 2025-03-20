import Heading from "../ChartHeading";
import MarketOverviewChart from "./charts/marketOverview/MarketOverviewChart";
import Wishlist from "./charts/wishlist/WishList";

type GridProps = {
  className?: string;
};

const Grid = ({ className }: GridProps) => {
  // $ Default classes shared by all the graphs
  // const defaultClasses =
  //   "rounded-lg p-4 border border-clr_blueGray_400 shadow-md h-[250px]";
  return (
    <div
      className={`${className} w-full space-y-4 h-auto overflow-hidden sm:px-2`}
    >
      <Heading title="Financial Dashboard" className="py-10" />
      {/* // $ Top row - Indicators */}
      <div className="grid grid-cols-1 grid-rows-[auto_1fr] sm:grid-cols-3 gap-4">
        <MarketOverviewChart className="col-span-2 row-span-1" />
        <Wishlist className="col-span-1 row-span-2" />
        {/* // Charts go here */}
      </div>

      {/* // $ Bottom grid - Responsive stacking */}
      <div className="grid gap-4 h-[500px] border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Charts go here */}
        </div>
      </div>
    </div>
  );
};

export default Grid;

// lg:grid-cols-[minmax(250px,1fr)_minmax(0px,1fr)_minmax(250px,1fr)]

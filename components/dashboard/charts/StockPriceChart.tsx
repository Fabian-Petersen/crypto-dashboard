"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import stockPriceData from "@/public/data/stockPriceData";
import ChartHeading from "../../ChartHeading";

type Props = {
  className: string;
};

const StockPriceChart = ({ className }: Props) => {
  return (
    <div
      className={`${className} flex flex-col rounded-lg p-4 h-auto shadow-md gap-4 border border-gray-200 dark:bg-slate-800 dark:border-gray-700`}
    >
      <ChartHeading title="Stock Price" />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={500}
          data={stockPriceData}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" className="text-sm" />
          <YAxis
            domain={[(dataMin: number) => dataMin - 20, "auto"]}
            className="text-sm"
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockPriceChart;

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import totalRevenueData from "@/public/data/totalRevenueData";
import ChartHeading from "../../ChartHeading";

type Props = {
  className?: string;
};

const TotalRevenue = ({ className }: Props) => {
  return (
    <div
      className={`flex flex-col rounded-lg p-4 border border-clr_blueGray_400 shadow-md gap-4 ${className}`}
    >
      <ChartHeading title="Total Revenue" />
      <ResponsiveContainer width="100%">
        <BarChart
          data={totalRevenueData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={15} // Controls the width of each individual bar
          barGap={4} // Controls the gap between bars in the same category
          barCategoryGap={32} // Controls the gap between different category groups
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fill: "currentColor" }}
            className="text-clr_blueGray_700 text-[10px]"
          />
          <YAxis
            tick={{ fill: "currentColor" }}
            className="dark:text-clr_blueGray_600 text-[10px]"
            tickFormatter={(value) => `$${value / 1000}K`}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, "Revenue"]}
            contentStyle={{
              backgroundColor: "rgb(255 255 255 / 0.9)",
              border: "1px solid rgb(229 231 235)",
              borderRadius: "0.375rem",
              fontSize: "10px",
            }}
          />
          <Legend
            wrapperStyle={{
              fontSize: "10px",
              color: "currentColor",
              display: "flex",
              justifyContent: "center",
            }}
          />
          <Bar
            dataKey="onlineSales"
            name="Online Sales"
            fill="#00E096"
            radius={[2, 2, 0, 0]}
          />
          <Bar
            dataKey="offlineSales"
            name="Offline Sales"
            fill="#0095FF"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalRevenue;

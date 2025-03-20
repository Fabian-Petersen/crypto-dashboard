"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import visitorInsightsData from "@/public/data/visitorInsightsData";
import ChartHeading from "../../ChartHeading";

type Props = {
  className: string;
};

const VisitorInsights = ({ className }: Props) => {
  return (
    <div
      className={`${className} flex flex-col rounded-lg p-4 shadow-md gap-4 h-auto`}
    >
      <ChartHeading title="Visitor Insights" />
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={visitorInsightsData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fill: "currentColor", fontSize: 10 }}
            className="dark:text-gray-400"
          />
          <YAxis
            tick={{ fill: "currentColor", fontSize: 10 }}
            className="dark:text-clr_blueGray_600 text-[10px]"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(255 255 255 / 0.9)",
              border: "1px solid rgb(229 231 235)",
              borderRadius: "0.375rem",
              fontSize: "10px",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={5}
            iconSize={10}
            wrapperStyle={{ fontSize: "10px", color: "currentColor" }}
          />
          <Line
            type="monotone"
            dataKey="loyalCustomers"
            stroke="#EF4444"
            strokeWidth={2}
            dot={false}
            name="Loyal Customers"
          />
          <Line
            type="monotone"
            dataKey="newCustomers"
            stroke="#A700FF"
            strokeWidth={2}
            dot={false}
            name="New Customers"
          />
          <Line
            type="monotone"
            dataKey="uniqueCustomers"
            stroke="#3CD856"
            strokeWidth={2}
            dot={false}
            name="Unique Customers"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorInsights;

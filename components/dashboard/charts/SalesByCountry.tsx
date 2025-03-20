"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import ChartHeading from "../../ChartHeading";

type Props = {
  className?: string;
};

const salesData = [
  { name: "USA", value: 35 },
  { name: "UK", value: 25 },
  { name: "France", value: 20 },
  { name: "Germany", value: 15 },
  { name: "Japan", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Custom label renderer for outside labels
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
}) => {
  const RADIAN = Math.PI / 180;
  // Increase this value to push labels further from the pie
  const radius = outerRadius * 1.3;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-[10px]"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

const SalesByCountry = ({ className }: Props) => {
  return (
    <div className={`${className} flex flex-col relative`}>
      <ChartHeading title="Sales Mapping by Country" />
      <ResponsiveContainer className="flex justify-center items-center">
        <PieChart width={300} height={300}>
          <Pie
            data={salesData}
            cx="50%"
            cy="50%"
            label={renderCustomizedLabel}
            // labelLine={true}
            innerRadius={50}
            outerRadius={75}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {salesData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                name={entry.name}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}%`, "Sales Vol%"]}
            contentStyle={{
              backgroundColor: "rgb(255 255 255 / 0.9)",
              border: "1px solid rgb(229 231 235)",
              borderRadius: "0.375rem",
              fontSize: "10px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesByCountry;

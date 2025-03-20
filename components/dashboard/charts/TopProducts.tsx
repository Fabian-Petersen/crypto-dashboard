"use client";

import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import ChartHeading from "../../ChartHeading";

type Props = {
  className?: string;
};

interface DataItem {
  name: string;
  Popularity: number;
  Sales: number;
  color: string;
  backgroundColor: string;
  maxValue: number;
}

function TopProducts({ className }: Props) {
  const data: DataItem[] = [
    {
      name: "Home Decor Range",
      Popularity: 85,
      Sales: 20,
      maxValue: 100,
      color: "#0095FF",
      backgroundColor: "#0095FF10",
    },
    {
      name: "Disney Princess Pink Bag",
      Popularity: 60,
      Sales: 20,
      maxValue: 100,
      color: "#82ca9d",
      backgroundColor: "#82ca9d10",
    },
    {
      name: "Bathroom Essentials",
      Popularity: 38,
      Sales: 20,
      maxValue: 100,
      color: "#8884d8",
      backgroundColor: "#8884d810",
    },
    {
      name: "Apple Smart Watch",
      Popularity: 25,
      Sales: 45,
      maxValue: 100,
      color: "#ffc658",
      backgroundColor: "#ffc65810",
    },
  ];

  return (
    <div className={`${className}`}>
      <ChartHeading title="Top Products" />
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 20,
          }}
          barSize={15}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
          <YAxis
            dataKey="name"
            type="category"
            width={150}
            tick={{ fontSize: 10 }}
          />
          <Tooltip
            formatter={(value: number) => `${value}%`}
            contentStyle={{
              backgroundColor: "rgb(255 255 255 / 0.9)",
              border: "1px solid rgb(229 231 235)",
              borderRadius: "0.375rem",
              fontSize: "10px",
            }}
            labelStyle={{ fontSize: 10 }}
          />
          {/* Foreground Bars */}
          <Bar dataKey="Popularity" name="Popularity">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopProducts;

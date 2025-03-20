"use client";
import React from "react";
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
import ChartHeading from "../../ChartHeading";
import { volumeServiceData } from "@/public/data/volumeServiceData";
type Props = {
  className?: string;
};

const data = volumeServiceData;
function VolumevsService({ className }: Props) {
  return (
    <div className={`${className}`}>
      <ChartHeading title="Volume vs Service Level" />
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -20,
            bottom: 0,
          }}
          barSize={20} // Controls the width of each individual bar
          barGap={2} // Controls the gap between bars in the same category
          barCategoryGap={32} // Controls the gap between different category groups
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" className="text-clr_blueGray_700 text-[10px]" />
          <YAxis className="text-clr_blueGray_700 text-[10px]" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(255 255 255 / 0.9)",
              border: "1px solid rgb(229 231 235)",
              borderRadius: "0.375rem",
              fontSize: "10px",
            }}
          />
          <Legend
            height={5}
            iconSize={10}
            wrapperStyle={{ fontSize: "10px", color: "currentColor" }}
          />
          <Bar dataKey="volume" stackId="a" fill="#0095FF" />
          <Bar dataKey="service" stackId="a" fill="#00E096" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VolumevsService;

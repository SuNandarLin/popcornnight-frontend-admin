"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashboardDummyData } from "@/dummy/dummydata";
import { MovieRevenue } from "@/types/types";

export default function RevenueChart({ data }: { data: MovieRevenue[] }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        // data={data}
        data={DashboardDummyData.revenueByMovie}
      >
        <XAxis dataKey="movie" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  );
}

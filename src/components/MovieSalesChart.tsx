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
import { MovieTicketSales } from "@/types/types";

export default function MovieSalesChart({
  data,
}: {
  data: MovieTicketSales[];
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        // data={data}
        data={DashboardDummyData.movieTicketSales}
      >
        <XAxis dataKey="movie" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="tickets" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}

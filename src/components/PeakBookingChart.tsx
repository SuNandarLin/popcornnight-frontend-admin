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
import { PeakBookingHour } from "@/types/types";

export default function PeakBookingChart({
  data,
}: {
  data: PeakBookingHour[];
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        // data={data}
        data={DashboardDummyData.peakBookingHours}
      >
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="bookings" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  );
}

"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DashboardDummyData } from "@/dummy/dummydata";
import { CustomerTypeCount } from "@/types/types";

const COLORS = ["#4f46e5", "#ec4899"];

export default function UserTypePieChart({
  data,
}: {
  data: CustomerTypeCount[];
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={DashboardDummyData.customerType}
          // data={data}
          dataKey="count"
          nameKey="type"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {DashboardDummyData.customerType.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

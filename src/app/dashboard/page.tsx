"use client";
import {
  getTotalRevenueThisWeek,
  getTotalTicketsThisWeek,
  getRevenueByMovie,
  getMovieTicketSales,
  getPeakBookingHours,
  getCustomerType,
} from "@/api/dashboard";
import { DashboardDummyData } from "@/dummy/dummydata";
import {
  MovieRevenue,
  MovieTicketSales,
  PeakBookingHour,
  CustomerTypeCount,
} from "@/types/types";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const RevenueChart = dynamic(() => import("@/components/RevenueChart"), {
  ssr: false,
});
const MovieSalesChart = dynamic(() => import("@/components/MovieSalesChart"), {
  ssr: false,
});
const PeakBookingChart = dynamic(
  () => import("@/components/PeakBookingChart"),
  { ssr: false }
);
const UserTypePieChart = dynamic(
  () => import("@/components/UserTypePieChart"),
  { ssr: false }
);

export default function AdminDashboard() {
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null);
  const [totalTickets, setTotalTickets] = useState<number | null>(null);
  const [revenueByMovie, setRevenueByMovie] = useState<MovieRevenue[]>([]);
  const [movieTicketSales, setMovieTicketSales] = useState<MovieTicketSales[]>(
    []
  );
  const [peakBookingHours, setPeakBookingHours] = useState<PeakBookingHour[]>(
    []
  );
  const [customerType, setCustomerType] = useState<CustomerTypeCount[]>([]);

  useEffect(() => {
    getTotalRevenueThisWeek().then(setTotalRevenue).catch(console.error);
    getTotalTicketsThisWeek().then(setTotalTickets).catch(console.error);
    getRevenueByMovie().then(setRevenueByMovie).catch(console.error);
    getMovieTicketSales().then(setMovieTicketSales).catch(console.error);
    getPeakBookingHours().then(setPeakBookingHours).catch(console.error);
    getCustomerType().then(setCustomerType).catch(console.error);
  }, []);

  return (
    <div className="p-6 space-y-10 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      {/* <h1 className="text-2xl font-bold text-center text-zinc-800 dark:text-white">
        Admin Dashboard
      </h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Number cards */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6 flex flex-col justify-center items-center ring-1 ring-zinc-200 dark:ring-zinc-700/50 h-40">
            <h2 className="text-md font-medium text-zinc-800 dark:text-white/80 mb-2">
              Total Tickets Sold This Week
            </h2>
            <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
              {/* {totalTickets !== null ? totalTickets : "..."} */}
              {DashboardDummyData.totalTicketsThisWeek}
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6 flex flex-col justify-center items-center ring-1 ring-zinc-200 dark:ring-zinc-700/50 h-40">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
              Total Revenue This Week
            </p>
            <p className="text-4xl font-bold text-green-500 dark:text-green-400">
              {/* {totalRevenue !== null ? `$${totalRevenue}` : "..."} */}$
              {DashboardDummyData.totalRevenueThisWeek}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6 ring-1 ring-zinc-200 dark:ring-zinc-700/50">
          <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white/90">
            Revenue by Movie ($)
          </h2>
          <RevenueChart data={revenueByMovie} />
        </div>

        <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6 ring-1 ring-zinc-200 dark:ring-zinc-700/50">
          <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white/90">
            Movies with Ticket Sales
          </h2>
          <MovieSalesChart data={movieTicketSales} />
        </div>

        <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6 md:col-span-2 ring-1 ring-zinc-200 dark:ring-zinc-700/50">
          <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white/90">
            Peak Booking Hours
          </h2>
          <PeakBookingChart data={peakBookingHours} />
        </div>

        <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6 ring-1 ring-zinc-200 dark:ring-zinc-700/50">
          <h2 className="text-lg font-semibold mb-4 text-zinc-800 dark:text-white/90">
            User Types
          </h2>
          <UserTypePieChart data={customerType} />
        </div>
      </div>
    </div>
  );
}

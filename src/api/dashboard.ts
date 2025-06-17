import { authFetch, getAuthHeaders } from "@/utils/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const getTotalRevenueThisWeek = async () => {
  const res = await authFetch(
    `${BASE_URL}/api/dashboard/total-revenue-this-week`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!res.ok) throw new Error("Failed to fetch total revenue");
  return res.json();
};

export const getTotalTicketsThisWeek = async () => {
  const res = await authFetch(
    `${BASE_URL}/api/dashboard/total-tickets-this-week`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );
  if (!res.ok) throw new Error("Failed to fetch total tickets");
  return res.json();
};

export const getRevenueByMovie = async () => {
  const res = await authFetch(`${BASE_URL}/api/dashboard/revenue-by-movie`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch revenue by movie");
  return res.json();
};

export const getMovieTicketSales = async () => {
  const res = await authFetch(`${BASE_URL}/api/dashboard/movie-ticket-sales`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch movie ticket sales");
  return res.json();
};

export const getPeakBookingHours = async () => {
  const res = await authFetch(`${BASE_URL}/api/dashboard/peak-booking-hours`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch peak booking hours");
  return res.json();
};

export const getCustomerType = async () => {
  const res = await authFetch(`${BASE_URL}/api/dashboard/customer-type`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch customer type counts");
  return res.json();
};

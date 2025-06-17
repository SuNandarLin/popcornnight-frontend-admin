import { Showtime } from "@/types/types";
import { authFetch, getAuthHeaders } from "@/utils/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function saveShowtimes(showtimes: Showtime[]): Promise<void> {
  const res = await authFetch(`${BASE_URL}/api/showtimes/all`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ showtimes }),
  });

  if (!res.ok) {
    throw new Error("Failed to save showtimes");
  }
}

export const getShowtimesByDate = async (date: string): Promise<Showtime[]> => {
  const res = await authFetch(
    `${BASE_URL}/api/showtimes/by-date?date=${date}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch showtimes");
  }

  return res.json();
};

export const deleteShowtimes = async (ids: number[]): Promise<void> => {
  const res = await authFetch(`${BASE_URL}/api/showtimes/bulk`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify(ids),
  });

  if (!res.ok) {
    throw new Error("Failed to delete showtimes");
  }
};

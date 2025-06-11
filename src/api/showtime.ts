import { Showtime } from "@/types/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export async function saveShowtimes(showtimes: Showtime[]): Promise<void> {
  const res = await fetch(`${BASE_URL}/showtimes/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      showtimes,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to save showtimes");
  }
}

export const getShowtimesByDate = async (date: string): Promise<Showtime[]> => {
  const res = await fetch(`${BASE_URL}/showtimes/by-date?date=${date}`);
  if (!res.ok) {
    throw new Error("Failed to fetch showtimes");
  }
  return res.json();
};

export const deleteShowtimes = async (ids: number[]): Promise<void> => {
  const res = await fetch(`${BASE_URL}/showtimes/bulk`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  });

  if (!res.ok) {
    throw new Error("Failed to delete showtimes");
  }
};

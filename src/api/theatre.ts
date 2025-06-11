import { Theatre } from "@/types/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

export const getTheatres = async (): Promise<Theatre[]> => {
  const res = await fetch(`${BASE_URL}/theatres/theatredetails`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch theatres");
  }

  return res.json();
};

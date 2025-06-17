import { Theatre } from "@/types/types";
import { authFetch, getAuthHeaders } from "@/utils/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const getTheatres = async (): Promise<Theatre[]> => {
  const token = localStorage.getItem("authToken");

  const res = await authFetch(`${BASE_URL}/api/theatres/theatredetails`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch theatres");
  }

  return res.json();
};

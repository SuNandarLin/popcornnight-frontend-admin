import { authFetch, getAuthHeaders } from "@/utils/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const createMovie = async (movie: any) => {
  console.log("here in create movie", JSON.stringify(movie));

  const res = await authFetch(`${BASE_URL}/api/movies`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(movie),
  });

  console.log(res);
  if (!res.ok) throw new Error("Failed to create movie");

  return res.json();
};

export const getMovies = async () => {
  const res = await authFetch(`${BASE_URL}/api/movies`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch movies");

  return res.json();
};

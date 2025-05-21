const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api";

// Example: Create movie
export const createMovie = async (movie: any) => {
  console.log("here in create movie", JSON.stringify(movie));

  const res = await fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });
  console.log(res);
  if (!res.ok) throw new Error("Failed to create movie");
  return res.json();
};

// Example: Get all movies
export const getMovies = async () => {
  const res = await fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
};

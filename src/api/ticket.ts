const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const getUserTickets = async () => {
  const res = await fetch(`${BASE_URL}/api/tickets`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ticket history");
  }
  return res.json();
};

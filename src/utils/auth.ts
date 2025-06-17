export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const authFetch = async (input: RequestInfo, init: RequestInit = {}) => {
  const headers = {
    ...getAuthHeaders(),
    ...init.headers,
  };

  const res = await fetch(input, { ...init, headers });

  if (res.status === 401) {
    // Token expired or invalid
    console.warn("Unauthorized. Redirecting to login...");
    localStorage.removeItem("authToken");

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    throw new Error("Unauthorized. Please log in again.");
  }

  return res;
};

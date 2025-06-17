"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AdminNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // 🔐 Remove the token
    router.push("/login"); // 🔁 Redirect to login page
  };

  const linkClasses = (path: string) =>
    `px-4 py-2 rounded hover:bg-zinc-800 transition ${
      pathname === path ? "bg-zinc-800 text-indigo-400" : "text-gray-300"
    }`;

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 p-4 flex gap-4">
      <Link href="/dashboard" className={linkClasses("/dashboard")}>
        Dashboard
      </Link>
      <Link href="/movies" className={linkClasses("/movies")}>
        Movies
      </Link>
      <Link href="/movies/assign" className={linkClasses("/movies/assign")}>
        Assign
      </Link>
      <Link href="/tickets" className={linkClasses("/tickets")}>
        Tickets
      </Link>
      <button
        onClick={handleLogout}
        className="ml-auto text-sm text-red-400 hover:text-red-500 border border-red-400 hover:border-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default AdminNav;

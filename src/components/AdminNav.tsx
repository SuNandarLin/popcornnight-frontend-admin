"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `px-4 py-2 rounded hover:bg-zinc-800 transition ${
      pathname === path ? "bg-zinc-800 text-indigo-400" : "text-gray-300"
    }`;

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 p-4 flex gap-4">
      <Link href="/movies" className={linkClasses("/movies")}>
        Movies
      </Link>
      <Link href="/movies/assign" className={linkClasses("/movies/assign")}>
        Assign
      </Link>
    </nav>
  );
};

export default AdminNav;

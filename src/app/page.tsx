"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.replace("/movies");
    } else {
      router.replace("/login");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-zinc-900">
      Redirecting...
    </div>
  );
}

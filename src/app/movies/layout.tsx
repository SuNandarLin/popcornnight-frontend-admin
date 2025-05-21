import AdminNav from "@/components/AdminNav";
import React from "react";

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

type Ticket = {
  id: number;
  customerName: string;
  movieTitle: string;
  hallNumber: number;
  showtime: string;
  status: "valid" | "expired" | "attended";
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      customerName: "Alice",
      movieTitle: "Elemental",
      hallNumber: 3,
      showtime: "2025-06-09 14:00",
      status: "attended",
    },
  ]);

  useEffect(() => {
    // const fetchTickets = async () => {
    //   const res = await fetch("/api/tickets");
    //   if (!res.ok) {
    //     console.error("Failed to fetch tickets");
    //     return;
    //   }
    //   const data = await res.json();
    //   setTickets(data);
    // };
    // fetchTickets();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-400 mb-4">Tickets</h1>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-zinc-800 p-4 rounded border border-zinc-700 text-white"
          >
            <div className="flex justify-between">
              <div>
                🎟️ {ticket.customerName} booked{" "}
                <strong>{ticket.movieTitle}</strong> (Hall {ticket.hallNumber})
                at {ticket.showtime}
              </div>
              <span
                className={`px-3 py-1 text-sm rounded ${
                  ticket.status === "expired"
                    ? "bg-red-500"
                    : ticket.status === "attended"
                    ? "bg-green-600"
                    : "bg-yellow-500"
                }`}
              >
                {ticket.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

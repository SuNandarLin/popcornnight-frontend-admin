"use client";

import { getUserTickets } from "@/api/ticket";
import { Ticket } from "@/types/types";
import { useEffect, useState } from "react";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getUserTickets();
        setTickets(data);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      }
    };
    fetchTickets();
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
            <div className="flex justify-between items-start">
              <div>
                🎟️ {ticket.user.name} booked{" "}
                <strong>{ticket.showTime.movie?.title}</strong> (Hall{" "}
                {ticket.showTime.hall?.hallNumber}) at{" "}
                {new Date(ticket.showTime.timestamp).toLocaleString()}
                <div className="text-sm text-gray-400 mt-1">
                  Seats: {ticket.seatNumbers.join(", ")}
                </div>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded ${
                  ticket.status === "EXPIRED"
                    ? "bg-red-500"
                    : ticket.status === "REDEEMED"
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

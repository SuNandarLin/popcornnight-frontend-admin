"use client";

import { Hall, Showtime } from "@/types/types";

type Props = {
  hall: Hall;
  onAddShowtime: () => void;
  onRemoveShowtime: (hallId: number, showtimeId: number) => void;
};

export default function HallColumn({
  hall,
  onAddShowtime,
  onRemoveShowtime,
}: Props) {
  return (
    <div className="w-64 bg-zinc-900 border border-zinc-700 rounded p-3">
      <h3 className="text-sm font-semibold text-indigo-300 mb-3">
        Hall {hall.hallNumber}
      </h3>

      {hall.showTimes.map((showtime) => (
        <ShowtimeCard
          key={showtime.id}
          showtime={showtime}
          onRemove={() => onRemoveShowtime(hall.id, showtime.id!)}
        />
      ))}

      <button
        onClick={onAddShowtime}
        className="mt-2 w-full py-2 rounded border border-dashed border-indigo-500 text-indigo-400 hover:bg-zinc-800 transition"
      >
        ＋ Add Showtime
      </button>
    </div>
  );
}

function ShowtimeCard({
  showtime,
  onRemove,
}: {
  showtime: Showtime;
  onRemove: () => void;
}) {
  return (
    <div className="bg-zinc-800 text-gray-100 px-3 py-2 mb-2 rounded border border-zinc-700 hover:bg-zinc-700 flex items-center gap-3 justify-between">
      {/* Poster + Info */}
      <div className="flex items-center gap-3">
        {showtime.movie?.posterUrl ? (
          <img
            src={showtime.movie.posterUrl}
            alt={showtime.movie.title}
            className="w-10 h-14 object-cover rounded"
          />
        ) : (
          <div className="w-10 h-14 bg-zinc-700 rounded flex items-center justify-center text-sm text-zinc-400">
            🎬
          </div>
        )}
        <div className="flex flex-col">
          <div className="font-semibold text-sm truncate">
            {showtime.movie?.title || (
              <span className="italic text-zinc-400">Unassigned</span>
            )}
          </div>
          <div className="text-xs text-gray-400">
            <p>{formatTimeslot12Hour(showtime.timeslot)}</p>
          </div>
          <div className="text-xs text-green-400">
            ${showtime.price?.toFixed(2) ?? "0.00"}
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="text-red-400 hover:text-red-600 text-lg font-bold"
      >
        ×
      </button>
    </div>
  );
}

function convertTo12HourFormat(time24: string): string {
  const [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

function formatTimeslot12Hour(timeslot: string): string {
  const [start, end] = timeslot.split(" - ");
  return `${convertTo12HourFormat(start)} - ${convertTo12HourFormat(end)}`;
}

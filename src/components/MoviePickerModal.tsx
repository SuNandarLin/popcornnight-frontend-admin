"use client";

import React, { useState } from "react";
import { Movie } from "@/types/types";
import { addHours, format } from "date-fns";

type Props = {
  hallId: number;
  movies: Movie[];
  lastEndTime: string;
  onClose: () => void;
  onAssign: (movie: Movie, startTime: string) => void;
};

const MoviePickerModal: React.FC<Props> = ({
  hallId,
  movies,
  lastEndTime,
  onClose,
  onAssign,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [startTime, setStartTime] = useState(() =>
    getOneHourAfter(lastEndTime)
  );

  const handleAssign = () => {
    if (selectedMovie && startTime) {
      onAssign(selectedMovie, startTime);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-lg max-w-lg w-full space-y-4 text-white">
        <h2 className="text-xl font-semibold mb-2">
          {selectedMovie ? "Select Start Time" : "Pick a Movie"}
        </h2>

        {!selectedMovie ? (
          <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {movies.map((movie) => (
              <button
                key={movie.id}
                onClick={() => {
                  setSelectedMovie(movie);
                }}
                className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded flex gap-3 items-center"
              >
                <img
                  src={
                    movie.imageUrl ??
                    "https://image.tmdb.org/t/p/w200/kgrLpJcLBbyhWIkK7fx1fM4iSvf.jpg"
                  }
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded"
                />
                <div className="text-left">
                  <div className="font-medium text-sm">{movie.title}</div>
                  <div className="text-xs text-gray-400">
                    {movie.duration} mins
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={
                  selectedMovie.imageUrl ??
                  "https://image.tmdb.org/t/p/w200/kgrLpJcLBbyhWIkK7fx1fM4iSvf.jpg"
                }
                alt={selectedMovie.title}
                className="w-16 h-24 object-cover rounded"
              />
              <div>
                <div className="font-semibold text-lg">
                  {selectedMovie.title}
                </div>
                <div className="text-sm text-gray-400">
                  {selectedMovie.duration} mins
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm mb-1 block text-gray-300">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="p-2 w-full bg-zinc-800 border border-zinc-700 rounded text-white"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-zinc-700 text-gray-300 hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700"
              >
                Assign
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
function getOneHourAfter(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  const oneHourLater = addHours(now, 1);
  console.log("oneHourLater::", oneHourLater);
  console.log("format::", format(oneHourLater, "hh:mm a"));
  return format(oneHourLater, "HH:mm");
}

export default MoviePickerModal;

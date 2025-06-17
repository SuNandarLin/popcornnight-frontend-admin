"use client";

import React, { useState } from "react";
import MoviePickerModal from "@/components/MoviePickerModal";
import { Movie, Showtime, Theatre } from "@/types/types";
import { allMovies, initialHalls, initialTheatres } from "@/dummy/dummydata";
import HallColumn from "@/components/HallColumn";
import { Hall } from "@/types/types";
import { useEffect } from "react";
import { getTheatres } from "@/api/theatre";
import { getMovies } from "@/api/movie";
import {
  deleteShowtimes,
  getShowtimesByDate,
  saveShowtimes,
} from "@/api/showtime";

// type Showtime = {
//   id: string;
//   movieTitle: string;
//   posterUrl: string;
//   startTime: string; // e.g. "13:00"
//   endTime: string; // e.g. "15:30"
// };

export default function AssignPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // default: yyyy-mm-dd
  });
  const [halls, setHalls] = useState(initialHalls);
  const [selectedHallId, setSelectedHallId] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>(allMovies);
  const [lastEndTime, setLastEndTime] = useState("12:00"); // default value
  const [theatres, setTheatres] = useState<Theatre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [originalShowtimes, setOriginalShowtimes] = useState<Showtime[]>([]);
  const [defaultStandardCost, setDefaultStandardCost] = useState<number>(12);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const openMoviePicker = (hallId: number) => {
    const targetHall = theatres
      .flatMap((t) => t.halls)
      .find((hall) => hall.id === hallId);

    if (!targetHall) return;

    const lastShowtime =
      targetHall.showTimes?.[targetHall.showTimes.length - 1];
    const lastEnd = lastShowtime?.timeslot?.split(" - ")[1] || "12:00";

    setLastEndTime(lastEnd);
    setSelectedHallId(hallId);
  };

  const handleAssign = (movie: Movie, startTime: string, price: number) => {
    const timestamp = new Date(`${selectedDate}T${startTime}:00`).getTime();

    setTheatres((prev) =>
      prev.map((theatre) => {
        return {
          ...theatre,
          halls: theatre.halls.map((hall) => {
            if (hall.id !== selectedHallId) return hall;

            const seatStatusGrid = hall.seatNoGrid.map((row) =>
              row.map((seat) => (seat !== "" ? 0 : -1))
            );

            const endTime = calculateEndTime(startTime, movie.duration);
            console.log("starttime::", startTime, "endtime::", endTime);
            console.log("timestamp::", timestamp);
            const tempId = Date.now() + Math.floor(Math.random() * 1000);

            const newShowtime: Showtime = {
              id: tempId,
              movie: movie,
              hall: hall,
              timeslot: `${startTime} - ${endTime}`,
              timestamp,
              isPublished: false,
              seatStatusGrid,
              movieId: movie.id,
              hallId: hall.id,
              price,
            };

            return {
              ...hall,
              showTimes:
                hall.showTimes && hall.showTimes.length > 0
                  ? [...hall.showTimes, newShowtime]
                  : [newShowtime],
            };
          }),
        };
      })
    );

    setSelectedHallId(null);
  };

  const handleRemoveShowtime = (hallId: number, showtimeId: number) => {
    setTheatres((prev) =>
      prev.map((theatre) => ({
        ...theatre,
        halls: theatre.halls.map((hall) => {
          if (hall.id !== hallId) return hall;
          return {
            ...hall,
            showTimes: hall.showTimes.filter((s) => s.id !== showtimeId),
          };
        }),
      }))
    );
  };

  const handleSave = async () => {
    console.log("Saving showtimes for:", selectedDate);
    console.log("Current theatre state:", theatres);
    setIsSaving(true);
    setSaveMessage("");
    const allShowtimes = theatres.flatMap((theatre) =>
      theatre.halls.flatMap((hall) =>
        (hall.showTimes ?? []).map((showtime: Showtime) => ({
          id: showtime.id,
          movieId: showtime.movieId,
          hallId: showtime.hallId,
          timestamp: showtime.timestamp,
          timeslot: showtime.timeslot,
          seatStatusGrid: showtime.seatStatusGrid,
          isPublished: showtime.isPublished,
          price: showtime.price,
        }))
      )
    );

    console.log("all show times::", allShowtimes);

    // Deleted
    const deletedShowtimes = originalShowtimes.filter(
      (original) => !allShowtimes.some((current) => current.id === original.id)
    );
    console.log("deleted show times::", deleteShowtimes);

    // New
    const newShowtimes = allShowtimes.filter(
      (current) =>
        !originalShowtimes.some((original) => original.id === current.id)
    );
    console.log("new show times::", newShowtimes);

    // Now:

    try {
      deletedShowtimes.length > 0 &&
        (await deleteShowtimes(deletedShowtimes.map((s) => s.id!)));
      newShowtimes.length > 0 && (await saveShowtimes([...newShowtimes]));
      setSaveMessage("Showtimes saved successfully.");

      setOriginalShowtimes(allShowtimes);
    } catch (error) {
      console.error("Error saving showtimes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        console.log("selecteddate::", selectedDate);
        const [theatreData, movieData, showtimeData] = await Promise.all([
          getTheatres(),
          getMovies(),
          getShowtimesByDate(selectedDate),
        ]);
        setOriginalShowtimes(showtimeData);

        const theatresWithShowtimes = theatreData.map((theatre) => ({
          ...theatre,
          halls: theatre.halls.map((hall) => ({
            ...hall,
            showTimes: showtimeData.filter((s) => s.hall?.id === hall.id),
          })),
        }));

        setTheatres(theatresWithShowtimes);
        setMovies(movieData);
      } catch (err) {
        setError("Could not load data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [selectedDate]);

  if (loading) {
    return <p className="text-gray-400 p-6">Loading theatres...</p>;
  }

  if (error) {
    return <p className="text-red-500 p-6">{error}</p>;
  }
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-4">
        <label className="text-sm text-gray-300">Assigning for:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 text-white p-2 rounded"
        />
        <label className="text-sm text-gray-300">Standard Cost (SGD):</label>
        <input
          type="number"
          min={0}
          step={1}
          value={defaultStandardCost}
          onChange={(e) => setDefaultStandardCost(Number(e.target.value))}
          className="w-24 bg-zinc-800 border border-zinc-700 text-white p-2 rounded"
        />
        <button
          onClick={handleSave}
          className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        {saveMessage && (
          <span className="text-sm text-green-400">{saveMessage}</span>
        )}
      </div>
      <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
        {theatres.map((theatre) => (
          <div key={theatre.id} className="mb-10">
            <h2 className="text-lg font-bold text-indigo-400 mb-4">
              {theatre.name}
            </h2>
            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-[800px] items-start">
                {[...theatre.halls]
                  .slice()
                  .sort((a, b) => {
                    const numA = parseInt(a.hallNumber.replace(/\D/g, ""), 10);
                    const numB = parseInt(b.hallNumber.replace(/\D/g, ""), 10);
                    return numA - numB;
                  })
                  .map((hall: Hall) => (
                    <HallColumn
                      key={hall.id}
                      hall={hall}
                      onAddShowtime={() => openMoviePicker(hall.id)}
                      onRemoveShowtime={handleRemoveShowtime}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
        {selectedHallId && (
          <MoviePickerModal
            hallId={selectedHallId}
            movies={movies}
            lastEndTime={lastEndTime}
            defaultStandardCost={defaultStandardCost}
            onClose={() => setSelectedHallId(null)}
            onAssign={handleAssign}
          />
        )}
      </div>
    </div>
  );
}

function calculateEndTime(startTime: string, duration: number): string {
  const [h, m] = startTime.split(":").map(Number);
  const totalMins = h * 60 + m + duration;
  const endH = String(Math.floor(totalMins / 60)).padStart(2, "0");
  const endM = String(totalMins % 60).padStart(2, "0");
  return `${endH}:${endM}`;
}

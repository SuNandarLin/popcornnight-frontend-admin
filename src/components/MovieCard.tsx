"use client";

import React from "react";
import { formatDate } from "@/lib/format";
import { Movie } from "@/types/movie";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const formattedDate = formatDate(movie.releaseDate);

  return (
    <div className="bg-zinc-900 rounded-xl border border-indigo-600 text-gray-100 p-4 w-full max-w-2xl flex shadow-md transition-shadow duration-300 hover:shadow-[8px_8px_16px_rgba(99,102,241,0.2)]">
      {/* Image with padding inside card */}
      <div className="w-[100px] h-[150px] flex-shrink-0 mr-4">
        <img
          src={
            movie.imageUrl ??
            "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg"
          }
          alt={movie.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-bold mb-1 text-indigo-400">
          {movie.title}
        </h2>
        <p className="text-sm text-gray-300 mb-2">{movie.description}</p>
        <p className="text-xs text-gray-400">
          <span className="text-indigo-500">🎬</span> {movie.duration} mins
          &nbsp; | &nbsp;
          <span className="text-indigo-500">📅</span> {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

// src/components/MovieCard.tsx
"use client";

import React from "react";

type Movie = {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
};

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  const formattedDate = new Date(movie.releaseDate).toLocaleDateString();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
      <p className="text-gray-700 mb-1">{movie.description}</p>
      <p className="text-sm text-gray-500">
        🎬 {movie.duration} mins &nbsp; | &nbsp; 📅 {formattedDate}
      </p>
    </div>
  );
};

export default MovieCard;

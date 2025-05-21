// src/app/movies/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import MovieForm from "@/components/MovieForm";
import { getMovies } from "@/api/movie";
import { Movie } from "@/types/movie";

const allMovies = [
  {
    id: 1,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    id: 2,
    title: "Inside Out 2",
    description: "An emotional journey of growing up",
    releaseDate: "2024-06-20T00:00:00.000+00:00",
    duration: 95,
    imageUrl: "https://image.tmdb.org/t/p/w500/kgrLpJcLBbyhWIkK7fx1fM4iSvf.jpg",
  },
  {
    id: 3,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    id: 4,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    id: 5,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    id: 6,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    id: 7,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    id: 8,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    id: 9,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    id: 10,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    id: 11,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    id: 12,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
    imageUrl: "https://image.tmdb.org/t/p/w500/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  // Add more movies...
];

export default function MovieReviewPage() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]); // replace `filteredMovies` usage with `movies`

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6">
      {/* Search + Create Movie Row */}
      <div className="max-w-4xl mx-auto mb-6 relative">
        <div className="flex items-center gap-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 pr-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-500"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            {showForm ? "Cancel" : "Create Movie"}
          </button>
        </div>
      </div>

      {/* Create Movie Form */}
      {showForm && (
        <MovieForm
          onAdd={(movie) => {
            setMovies([...movies, movie]);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          nextId={movies.length + 1}
        />
      )}

      {/* Movie Grid */}
      <div className="grid gap-2 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-visible">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {filteredMovies.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No movies found.
          </p>
        )}
      </div>
    </main>
  );
}

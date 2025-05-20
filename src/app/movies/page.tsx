// src/app/movies/page.tsx
import MovieCard from "@/components/MovieCard";

const movies = [
  {
    id: 1,
    title: "Elemental",
    description: "Fire and Water Love story",
    releaseDate: "2023-07-16T00:00:00.000+00:00",
    duration: 80,
  },
  // Add more movie objects here
];

export default function MovieReviewPage() {
  return (
    <main className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </main>
  );
}

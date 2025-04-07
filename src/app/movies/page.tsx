import { Movie } from "@/app/types/typeMovie";
import MovieCard from "@/components/MovieCard";
import { use, useEffect, useState } from "react";

export default function Movies({ movies }: { movies: Movie[]}) {
  if (!movies) {
    return <p>Nenhum filme disponível no momento.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
    </div>
  );
}

import { Movie } from '@/app/typeMovie'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function Movies({ movies }: { movies: Movie[] }) {
  if (!movies || movies.length === 0) {
    return <p>Nenhum filme disponível no momento.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
      {movies?.map((movie) => (
        <Card className="movie-card hover:scale-105 transition-transform duration-300">
          <Link href={`/details?movie_id=${movie.id}`} key={`${movie.id}`}>
            <CardContent className="p-4" key={`${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold">{movie.title}</h3>
              {movie.overview && (
                <p className="text-sm text-gray-600 mt-2">
                  {movie.overview.slice(0, 100)}...
                </p>
              )}
              {movie.release_date && (
                <p className="text-sm text-gray-500 mt-1">
                  Lançamento: {movie.release_date}
                </p>
              )}
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}

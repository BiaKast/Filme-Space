'use client'

import { useEffect, useState } from 'react'
// import fetchMovies from '../api/fetchApiMovies'
import Error from 'next/error'
import { MovieDetails } from '@/app/typeMovie'

const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`

export default function Details({
  searchParams,
}: {
  searchParams: { movie_id: '' }
}) {
  const [movie, setMovieDetails] = useState<MovieDetails>()

  useEffect(() => {
    async function loadMoviesDetails() {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${searchParams.movie_id}?language=pt-br&${keyApi}`,
        )
        const result = await data.json()
        setMovieDetails(result)
        console.log(result)
      } catch (error) {
        console.error('Erro ao carregar filmes:', error)
      }
    }
    loadMoviesDetails()
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
      {movie ? (
        <div>
          <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          className="rounded-lg mb-4"
          />
          <h1>{movie.original_title}</h1>
          <p>Popularidade: {movie.popularity}</p>

        </div>
      ) : (
        <Error statusCode={500}></Error>
      )}
    </div>
  )
}

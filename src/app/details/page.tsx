"use client";

import { useEffect, useState } from "react";
import fetchMovies from "../api/fetchApiMovies";
import { MovieDetails, MovieCredits } from "@/app/types/typeMovie";
import { Credits } from "@/components/Credits";
import Pictures from "@/components/Pictures";
import { formatDateWithIntl } from "../api/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { MovieImages, MovieVideos } from "../types/typeMovieImages";
import { useSearchParams } from "next/navigation";
import ReactPlayer from "react-player";
import { Player } from "@/components/Player";
import NavFix from "@/components/NavFix";

const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`;

export default function Details() {
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movie_id");
  const [movie, setMovieDetails] = useState<MovieDetails>();
  const [credits, setMovieCredits] = useState<MovieCredits>();
  const [images, setMovieImages] = useState<MovieImages>();
  const [videos, setMovieVideos] = useState<MovieVideos>();

  useEffect(() => {
    async function loadMoviesDetails() {
      try {
        const link1 = `https://api.themoviedb.org/3/movie/${movieId}?language=pt-br&${keyApi}`;
        const link2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=pt-br&${keyApi}`;
        const link5 = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=pt-br&${keyApi}`;
        const link6 = `https://api.themoviedb.org/3/movie/${movieId}/images?language=pt&${keyApi}`;

        const [results1, results2, results5, results6] = await Promise.all([
          fetchMovies(link1),
          fetchMovies(link2),
          fetchMovies(link5),
          fetchMovies(link6),
        ]);

        setMovieDetails(results1);
        setMovieCredits(results2);
        setMovieVideos(results5);
        setMovieImages(results6);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    }

    loadMoviesDetails();
  }, [movieId]);

  return (
    <div>
      <NavFix />
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden pt-20">
        {" "}
        {/* <- Aqui adicionamos pt-20 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url('https://image.tmdb.org/t/p/original${images?.posters[0]?.file_path}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            filter: "blur(10px)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-8 p-8">
          {movie ? (
            <div className="glass w-full max-w-7xl p-6 rounded-lg shadow-xl">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="rounded-lg shadow-md w-full md:w-64 object-cover transform hover:scale-105 transition duration-300"
                />

                <div className="flex flex-col flex-grow gap-4">
                  <h1 className="text-3xl md:text-4xl font-bold glow">
                    {movie.original_title}
                  </h1>
                  {movie.tagline && (
                    <p className="italic text-gray-300 text-lg">
                      "{movie.tagline}"
                    </p>
                  )}
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {movie.overview}
                  </p>
                  <div className="flex gap-6 flex-wrap">
                    <div>
                      <span className="text-yellow-400 font-semibold">
                        Rating:{" "}
                      </span>
                      <span className="text-gray-300">
                        {movie.vote_average.toFixed(1)} / 10
                      </span>
                    </div>
                    <div>
                      <span className="text-blue-400 font-semibold">
                        Popularity:{" "}
                      </span>
                      <span className="text-gray-300">{movie.popularity}</span>
                    </div>
                    <div>
                      <span className="text-red-400 font-semibold">
                        Release Date:{" "}
                      </span>
                      <span className="text-gray-300">
                        {movie.release_date}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2 text-cyan-400">
                      Genres
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map(({ id, name }) => (
                        <span
                          key={id}
                          className="bg-cyan-900 text-cyan-300 text-xs px-3 py-1 rounded-full shadow-md"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {credits && <Credits artists={credits} />}
              {images && <Pictures images={images} />}
              {videos && <Player videos={videos} />}
            </div>
          ) : (
            <h1>Loading movie details...</h1>
          )}
        </div>
      </div>
    </div>
  );
}

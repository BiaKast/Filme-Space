'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { FaCalendar } from "react-icons/fa";
import SkeletonCard from "@/components/SkeletonCard";

import { HiStar, HiOutlineStar } from "react-icons/hi";
import { formatDateWithIntl } from "@/app/api/utils";
import { Movie } from "@/app/types/typeMovie";
import cineImage from "@/app/images/_fb95478c-3ad0-4384-b787-d7382c6af57c.jpg";

export default function MovieCard({ movie }: { movie: Movie }) {
  const [loaded, setLoaded] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (movie.release_date) {
      // console.log("Data de lançamento recebida:", movie.release_date);
      setFormattedDate(formatDateWithIntl(movie.release_date));
    }
  }, [movie.release_date]);

  function MovieRating({ vote_average }: { vote_average: number }) {
    const rating = vote_average / 2;
    return (
      <div className="flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          rating >= i + 1 ? (
            <HiStar key={i} className="text-stars" />
          ) : rating >= i + 0.5 ? (
            <HiStar key={i} className="text-stars opacity-50" />
          ) : (
            <HiOutlineStar key={i} className="text-stars opacity-50" />
          )
        ))}
      </div>
    );
  }

  return (
    <Card
      className="movie-card hover:scale-105 transition-transform duration-300 bg-lilac relative overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      style={{ minHeight: "400px" }}
    >
      {!loaded && <SkeletonCard />}

      <Link href={`/details?movie_id=${movie.id}`} className="absolute inset-0 flex flex-col">
        <CardContent className="p-4 flex flex-col justify-between h-full">
          <div className="w-full flex justify-center">
            <Image
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : cineImage}
              alt={movie.title}
              width={300}
              height={200}
              className="rounded-lg transition-opacity duration-500 w-full h-auto object-cover max-h-72 sm:max-h-72 sm:w-60 md:max-h-72 xl:max-h-80"
              onLoad={() => setLoaded(true)}
              loading="lazy"
              style={{ opacity: loaded ? 1 : 0 }}
            />
          </div>

          {loaded && (
            <div className="w-full text-center mt-3 md:mt-0 flex flex-col items-center">
              <h3 className="text-lg font-bold text-africanViolet truncate w-full px-2" title={movie.title}>
                {movie.title}
              </h3>

              <div className="flex justify-center gap-2 flex-wrap mt-1 w-full">
                <MovieRating vote_average={movie.vote_average} />
              </div>

              {formattedDate && (
                <p className="text-sm text-africanViolet mt-1 flex items-center justify-center gap-1">
                  <FaCalendar className="text-africanViolet" /> Lançamento: {formattedDate}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}

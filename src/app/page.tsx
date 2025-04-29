"use client";

import { useEffect } from "react";
import Movies from "../components/movies/page";
import fetchMovies from "./api/fetchApiMovies";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useMovies } from "../context/MoviesContext";
import Sidebar from "@/components/Sidebar";
import NavFix from "@/components/NavFix";
import Timeline from "@/components/Timeline";

const API = process.env.NEXT_PUBLIC_APIURL;
const API_SEARCH = process.env.NEXT_PUBLIC_APIURL_SEARCH;
const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`;

export default function Home() {
  const {
    reload,
    mainPage,
    setMainPage,
    selectedCategory,
    setPage,
    page,
    selectedGenre,
    searchQuery,
    setTotalPage,
    totalPage,
    years,
    setReload,
    setOriginalArray,
    selectYear,
    originalArray,
  } = useMovies();

  // 🔍 Filtra os filmes que ainda vão estrear
  function filterUpcomingMovies(movies: any[]) {
    const today = new Date();
    const upcomingMovies = movies.filter((movie) => {
      if (!movie.release_date) return false;
      return new Date(movie.release_date) >= today;
    });

    if (upcomingMovies.length === 0 && selectYear === today.getFullYear()) {
      setPage((prevPage) => prevPage + 1);
    }

    return upcomingMovies;
  }

  useEffect(() => {
    const loadMovies = async () => {
      try {
        let requests = [];

        if (searchQuery) {
          const url = `${API_SEARCH}?page=${page}&language=pt-br&${keyApi}&query=${searchQuery}`;
          requests.push(fetchMovies(url));
        } else if (selectYear && selectYear !== 0) {
          const url = `${API}?page=${page}&language=pt-br&${keyApi}&sort_by=${selectedCategory.category}.desc&with_genres=${selectedGenre}&primary_release_year=${selectYear}`;
          const response = await fetchMovies(url);
          requests.push(response);
        } else {
          requests = years
            .filter((year) => year)
            .map((year) => {
              const url = `${API}?page=${page}&language=pt-br&${keyApi}&sort_by=${selectedCategory.category}.desc&with_genres=${selectedGenre}&primary_release_year=${year}`;
              return fetchMovies(url);
            });
        }

        const results = await Promise.all(requests);

        let totalPageCount = 0;
        let allMovies = results
          .filter((result) => result?.results)
          .flatMap((result) => result.results || []);

        results.forEach((result) => {
          totalPageCount += result?.total_pages || 0;
        });

        if (selectedCategory.category === "upcoming") {
          allMovies = filterUpcomingMovies(allMovies);
        }

        setTotalPage(totalPageCount);
        setMainPage(allMovies);
        setOriginalArray(allMovies);
        setReload(false);
      } catch (error) {
        console.error("Erro ao carregar filmes:", error);
      }
    };

    loadMovies();
  }, [
    page,
    reload,
    selectedCategory,
    selectedGenre,
    years,
    searchQuery,
    selectYear,
  ]);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
    scrollToTop();
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
    scrollToTop();
  };

  return (
    <section className="space-y-6 lg:py-15 py-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden pt-28 lg:pt-20">
      <NavFix />
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

          <div className="lg:col-span-9 space-y-6">
            {!searchQuery && <Timeline />}
            <Movies movies={mainPage} />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        {page > 1 && mainPage && (
          <Button
            color="danger"
            onClick={prevPage}
            className="flex items-center"
          >
            <ArrowBigLeft className="mr-2" /> Anterior
          </Button>
        )}

        {page < totalPage && mainPage.length > 0 && (
          <Button
            color="primary"
            onClick={nextPage}
            className="flex items-center"
          >
            Próxima <ArrowBigLeft className="rotate-180 ml-2" />
          </Button>
        )}
      </div>
    </section>
  );
}

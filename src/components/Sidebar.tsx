"use client";

import fetchMovies from "@/app/api/fetchApiMovies";
import { generateDecades, generateYears } from "@/app/api/utils";
import { useMovies } from "../context/MoviesContext";
import { useEffect, useRef, useState } from "react";
import { HiFilm, HiCog } from "react-icons/hi";
import { HiOutlineSortDescending } from "react-icons/hi";
import { Label } from "@radix-ui/react-label";
import ButtonSidebar from "./ButtonSidebar";

const selectStyles =
  "px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:bg-gray-700 shadow-lg transition-all";

export default function Sidebar() {
  const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`;
  const genresListUrl = `${process.env.NEXT_PUBLIC_MOVIE_LIST}?${keyApi}`;
  const currentYear = new Date().getFullYear();
  const currentDecade = Math.floor(currentYear / 10) * 10;
  const categories = [
    { key: "popularity", name: "Populares" },
    { key: "vote_average", name: "Favoritos da crítica" },
    { key: "upcoming", name: "Por vir" },
  ];
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sortNameState, setSortNameState] = useState(1);
  const [sortDateState, setSortDateState] = useState(1);

  const {
    setGenresId,
    genresId,
    setSelectedCategory,
    setPage,
    setSelectedGenre,
    setSelectedDecade,
    setYears,
    selectedGenre,
    selectedCategory,
    selectedDecade,
    setSearchQuery,
    menuOpen,
    setMenuOpen,
    mainPage,
    setMainPage,
    setReload,
    originalArray,
    setSelectYear,
    page,
    selectYear,
    years,
    searchQuery,
    setOriginalArray,
  } = useMovies();

  useEffect(() => {
    async function loadGenres() {
      try {
        const { genres } = await fetchMovies(`${genresListUrl}&language=pt-br`);
        setGenresId(genres || []);
      } catch (error) {
        console.error("Erro ao carregar gêneros:", error);
      }
    }

    loadGenres();
  }, [genresListUrl]);

  // Função para capturar o clique fora da sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false); // Fecha a sidebar quando clica fora dela
      }
    };

    // Adiciona o event listener ao clicar na tela
    document.addEventListener("mousedown", handleClickOutside);

    // Limpeza do event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortChange = ({
    nameSort,
    dateSort,
  }: {
    nameSort: string;
    dateSort: string;
  }) => {
    if (nameSort === "Original" && dateSort === "None") {
      setMainPage([...originalArray]);
      return;
    }

    let sortedMovies = [...originalArray];

    if (nameSort !== "Original") {
      sortedMovies = sortedMovies.sort((a, b) =>
        nameSort === "A-Z"
          ? a.original_title.localeCompare(b.original_title)
          : b.original_title.localeCompare(a.original_title),
      );
    }

    if (dateSort !== "None") {
      sortedMovies = sortedMovies.sort((a, b) =>
        dateSort === "Old"
          ? new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
          : new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime(),
      );
    }

    setMainPage(sortedMovies);
  };

  useEffect(() => {
    console.log(sortNameState, sortDateState);

    const nameSortOptions = ["Z-A", "Original", "A-Z"];
    const dateSortOptions = ["Old", "None", "Recent"];

    // Agora chamamos `handleSortChange` passando um objeto com as duas ordenações
    handleSortChange({
      nameSort: nameSortOptions[sortNameState],
      dateSort: dateSortOptions[sortDateState],
    });
  }, [
    sortNameState,
    sortDateState,
    selectYear,
    searchQuery,
    selectedCategory,
    selectedGenre,
    years,
    page,
    originalArray,
  ]);

  const toggleSortName = () => {
    setSortDateState(1); // Reseta a ordenação de data
    const nextState = (sortNameState + 1) % 3;
    setSortNameState(nextState);
  };

  const toggleSortDate = () => {
    setSortNameState(1); // Reseta a ordenação de nome
    const nextState = (sortDateState + 1) % 3;
    setSortDateState(nextState);
  };

  const handleCategoryChange = (category: string) => {
    setSearchQuery("");
    // console.log("category", category)
    setSelectedCategory({
      category,
      name: categories.find((c) => c.key === category)?.name || "",
    });
    setPage(1);
    if (category === "upcoming") {
      setSelectedDecade(String(currentDecade));
      setYears(generateYears(currentDecade + 10, category));
    } else {
      setSelectedDecade(String(currentYear));
      setYears(generateYears(currentDecade));
    }
  };

  const handleGenreChange = (genreId: string) => {
    setSelectedGenre(genreId);
    setSearchQuery("");
    setPage(1);
  };

  const handleDecadeChange = (decade: string) => {
    setSelectedDecade(decade);
    setSearchQuery("");
    setYears(generateYears(Number(decade)));
    setPage(1);
    setSelectYear(0);
  };

  const renderDecadesOptions = () => {
    return selectedCategory.category === "upcoming" ? (
      <option key={currentYear} value={currentYear}>
        {currentYear}
      </option>
    ) : (
      generateDecades(currentYear, 1950).map((decade) => (
        <option key={decade} value={decade}>
          {decade}
        </option>
      ))
    );
  };

  return (
    <div>
      <ButtonSidebar />
      <div
        ref={sidebarRef} // Referência para o elemento da sidebar
        className={`fixed top-[9%] left-0 h-full bg-russianviolet text-blue p-6 shadow-xl w-60 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 z-50`}
      >
        <h2 className="text-xl font-bold mb-6">Explorar:</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block w-full text-left hover:bg-gray-700 p-2 rounded transition">
              Nome
              <button
                onClick={toggleSortName}
                className="relative w-40 h-5 bg-gray-300 rounded-full flex items-center px-1 transition-colors duration-300 hover:bg-gray-400"
              >
                <div
                  className={`w-16 h-4 bg-purple-500 rounded-full transition-transform duration-300 shadow-md ${sortNameState === 0 ? "translate-x-0" : sortNameState === 1 ? "translate-x-12" : "translate-x-20"}`}
                >
                  <p className="text-xs">
                    {sortNameState === 0
                      ? "Z-A"
                      : sortNameState === 1
                        ? "Original"
                        : "A-Z"}
                  </p>
                </div>
              </button>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block w-full text-left hover:bg-gray-700 p-2 rounded transition">
              Data de Lançamento
              <button
                onClick={toggleSortDate}
                className="relative w-40 h-5 bg-gray-300 rounded-full flex items-center px-1 transition-colors duration-300 hover:bg-gray-400"
              >
                <div
                  className={`w-16 h-4 bg-purple-500 rounded-full transition-transform duration-300 shadow-md ${sortDateState === 0 ? "translate-x-0" : sortDateState === 1 ? "translate-x-12" : "translate-x-20"}`}
                >
                  <p className="text-xs">
                    {sortDateState === 0
                      ? "Antigo"
                      : sortDateState === 1
                        ? "Nenhum"
                        : "Recente"}
                  </p>
                </div>
              </button>
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="decades" className="text-sm">
              Décadas:
            </Label>
            <select
              id="decades"
              value={selectedDecade}
              onChange={(e) => handleDecadeChange(e.target.value)}
              className={selectStyles}
            >
              {renderDecadesOptions()}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="categories" className="text-sm">
              Categorias:
            </Label>
            <select
              id="categories"
              value={selectedCategory.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={selectStyles}
            >
              {categories.map(({ key, name }) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="genres" className="text-sm">
              Gêneros:
            </Label>
            <select
              id="genres"
              value={selectedGenre}
              onChange={(e) => handleGenreChange(e.target.value)}
              className={selectStyles}
            >
              {genresId.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
// Compare this snippet from src/components/ButtonSidebar.tsx:
// import { useMovies } from "@/app/context/MoviesContext"

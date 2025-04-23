"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { useMovies } from "../context/MoviesContext";
import { useRouter } from "next/navigation";
import { HiUser } from "react-icons/hi";
import { generateYears } from "@/app/api/utils";
import AccountMenu from "./AccountMenu";
import { set } from "react-hook-form";

const categories = [
  { key: "popularity", name: "Populares" },
  { key: "vote_average", name: "Favoritos da crítica" },
  { key: "upcoming", name: "Por vir" },
];

const currentYear = new Date().getFullYear();
const currentDecade = Math.floor(currentYear / 10) * 10;

export default function NavFix() {
  const {
    setSelectedCategory,
    setSelectedGenre,
    setSelectedDecade,
    setYears,
    searchQuery,
    setSearchQuery,
    setReload,
    setPage,
    setSelectYear,
    setSortNameState,
    setSortDateState,
  } = useMovies();

  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isDetailsPage, setIsDetailsPage] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.location.pathname.includes("/details") || window.location.pathname.includes("/favorites")) {
      setIsDetailsPage(true);
      
    }
  }, []);

  const reloadPage = () => {
    const defaultCategory = { category: categories[0].key, name: categories[0].name };
    
    setSortNameState(1);
    setSortDateState(1);
    setSearchQuery("");
    setYears(generateYears(currentDecade));
    setSelectedCategory(defaultCategory);
    setSelectedDecade(String(currentDecade));
    setSelectedGenre("28");
    setPage(1);
    setReload(true);
    setSelectYear(0);
    router.refresh();
  };

  const handleSearchInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedDecade(String(currentDecade));
    setSearchQuery(event.target.value);
    setSelectedCategory({
      category: categories[0].key,
      name: categories[0].name,
    });
    setSelectedGenre("28");
    setPage(1);
  };

  return (
    <div className="bg-russianviolet p-4 m-0 w-full fixed top-0 z-50">
      <nav className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl md:text-4xl font-bold">
          <Link
            href={"/"}
            onClick={reloadPage}
            className="hover:text-purple-400 text-textBlue"
          >
            FilmeSpace
          </Link>
        </h2>
  
        {mounted && !isDetailsPage && (
          <form className="w-full md:w-auto flex justify-center md:justify-start">
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Qual filme procura?"
              className="w-full md:w-96 text-textBlue placeholder:text-textBlue/70 text-base md:text-lg rounded-full px-6 py-2 bg-russianviolet border border-textBlue/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 shadow-md"
            />
          </form>
        )}
  
        <div className="flex items-center gap-2">
          <AccountMenu />
        </div>
      </nav>
    </div>
  );
  
}

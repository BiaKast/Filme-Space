"use client";

import React, { createContext, useContext, useState } from "react";
import { Genre, Movie } from "@/types/typeMovie";
import { UserAccount } from "@/types/typeUser";
import { generateDecades, generateYears } from "../app/api/utils";

type MoviesContextType = {
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mainPage: Movie[];
  setMainPage: (movies: Movie[]) => void;
  originalArray: Movie[];
  setOriginalArray: (movies: Movie[]) => void;
  genresId: Genre[];
  setGenresId: (genres: Genre[]) => void;
  selectedCategory: Record<string, any>;
  setSelectedCategory: (select: Record<string, any>) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
  setTotalPage: (select: number) => void;
  selectedGenre: string;
  setSelectedGenre: (select: string) => void;
  selectedDecade: string;
  setSelectedDecade: (select: string) => void;
  years: number[];
  setYears: (years: number[]) => void;
  selectYear: number;
  setSelectYear: (select: number) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  user: any;
  setSortNameState: React.Dispatch<React.SetStateAction<number>>;
  setSortDateState: React.Dispatch<React.SetStateAction<number>>;
  sortNameState: number;
  sortDateState: number;
  userAccount: UserAccount | null;
  setUserAccount: (user: UserAccount) => void;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [reload, setReload] = useState(true);
  const [mainPage, setMainPage] = useState<Movie[]>([]);
  const [genresId, setGenresId] = useState<Genre[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Object>({
    category: "popularity",
    name: "Populares",
  });
  const [selectedGenre, setSelectedGenre] = useState<string>("28");
  const [selectedDecade, setSelectedDecade] = useState<string>(
    String(Math.floor(new Date().getFullYear() / 10) * 10),
  );
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [years, setYears] = useState<number[]>(
    generateYears(Math.floor(new Date().getFullYear() / 10) * 10),
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar a visibilidade do menu
  const [originalArray, setOriginalArray] = useState<Movie[]>([]);
  const [selectYear, setSelectYear] = useState<number>(0);
  const [user, setUser] = useState<any>(null);
  const [sortNameState, setSortNameState] = useState(1);
  const [sortDateState, setSortDateState] = useState(1);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);

  return (
    <MoviesContext.Provider
      value={{
        reload,
        setReload,
        genresId,
        setGenresId,
        mainPage,
        setMainPage,
        selectedCategory,
        setSelectedCategory,
        setPage,
        page,
        totalPage,
        setTotalPage,
        selectedGenre,
        setSelectedGenre,
        selectedDecade,
        setSelectedDecade,
        setYears,
        years,
        searchQuery,
        setSearchQuery,
        menuOpen,
        setMenuOpen,
        setOriginalArray,
        originalArray,
        selectYear,
        setSelectYear,
        setUser,
        user,
        setSortNameState,
        setSortDateState,
        sortNameState,
        sortDateState,
        userAccount,
        setUserAccount,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
  return context;
};

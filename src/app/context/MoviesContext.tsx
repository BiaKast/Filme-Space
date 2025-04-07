'use client'

import React, { createContext, useContext, useState } from 'react'
import { Genre, Movie } from '@/app/types/typeMovie'
import { generateDecades, generateYears } from '../api/utils'

type MoviesContextType = {
  reload: boolean
  setReload: React.Dispatch<React.SetStateAction<boolean>>,
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  mainPage: Movie[]
  setMainPage: (movies: Movie[]) => void,
  originalArray: Movie[]
  setOriginalArray: (movies: Movie[]) => void,
  genresId: Genre[]
  setGenresId: (genres: Genre[]) => void
  selectedCategory: Record<string, any>;
  setSelectedCategory: (select: Record<string, any>) => void;
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  totalPage: number,
  setTotalPage: (select: number) => void,
  selectedGenre: string,
  setSelectedGenre: (select: string) => void,
  selectedDecade: string,
  setSelectedDecade: (select: string) => void,
  years: number[],
  setYears: (years: number[]) => void,
  selectYear: number,
  setSelectYear: (select: number) => void,
  searchQuery: string,
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined)

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [reload, setReload] = useState(true)
  const [mainPage, setMainPage] = useState<Movie[]>([])
  const [genresId, setGenresId] = useState<Genre[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Object>({category:'popularity', name: 'Populares'})
  const [selectedGenre, setSelectedGenre] = useState<string>('28')
  const [selectedDecade, setSelectedDecade] = useState<string>(String(Math.floor(new Date().getFullYear() / 10) * 10))
  const [totalPage, setTotalPage] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [years, setYears] = useState<number[]>(generateYears(Math.floor(new Date().getFullYear() / 10) * 10))
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [menuOpen, setMenuOpen] = useState(false);  // Estado para controlar a visibilidade do menu
  const [originalArray, setOriginalArray] = useState<Movie[]>([]);
  const [selectYear, setSelectYear] = useState<number>(0)


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
        setSelectYear
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export const useMovies = () => {
  const context = useContext(MoviesContext)
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider')
  }
  return context
}

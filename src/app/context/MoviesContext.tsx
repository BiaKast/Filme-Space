'use client'

import React, { createContext, useContext, useState } from 'react'
import { Movie } from '@/app/typeMovie'

type MoviesContextType = {
  movies: Movie[]
  setMovies: (movies: Movie[]) => void
  reload: boolean
  setReload: React.Dispatch<React.SetStateAction<boolean>>
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined)

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [reload, setReload] = useState(false)

  return (
    <MoviesContext.Provider value={{ movies, setMovies, reload, setReload }}>
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

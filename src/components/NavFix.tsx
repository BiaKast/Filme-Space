'use client'

import { SetStateAction, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Link from 'next/link'
import { useMovies } from '@/app/context/MoviesContext'
import { useRouter } from "next/navigation"
import { HiUser } from 'react-icons/hi'
import { generateYears } from '@/app/api/utils'

const categories = [
  { key: 'popularity', name: 'Populares' },
  { key: 'vote_average', name: 'Favoritos da crítica' },
  { key: 'upcoming', name: 'Por vir' }
]

const currentYear = new Date().getFullYear()
const currentDecade = Math.floor(currentYear / 10) * 10

export default function NavFix() {
  const {
    setMainPage,
    setSelectedCategory,
    setSelectedGenre,
    setSelectedDecade,
    setYears,
    page,
    searchQuery,
    setSearchQuery,
    setReload,
    setTotalPage,
    setPage
  } = useMovies()

  const reloadPage = () => {
    setSearchQuery('')
    setYears(generateYears(currentDecade))
    setSelectedCategory({category: categories[0].key, name: categories[0].name})
    setSelectedDecade(String(currentDecade))
    setSelectedGenre('28')
    setReload(true)
    useRouter().refresh
  }

  const handleSearchInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSelectedDecade(String(currentDecade))
    setSearchQuery(event.target.value)
    setSelectedCategory({category: categories[0].key, name: categories[0].name})
    setSelectedGenre('28')
    setPage(1)
  }

  return (
    <div className="bg-russianviolet p-4 m-0 w-full fixed top-0 z-50">
      <nav className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-4xl font-bold">
          <Link
            href={'/'}
            onClick={reloadPage}
            className="hover:text-purple-400 text-textBlue"
          >
            FilmeSpace
          </Link>
        </h2>
        {!window.location.pathname.includes('/details') && (
        <form className="flex items-center w-full md:w-auto gap-2">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Qual filme procura ?"
            className="w-full md:w-96 text-center placeholder:text-textBlue placeholder:text-lg border-textBlue rounded-full py-2 px-4 shadow-md focus:ring-2 focus:ring-purple-500 transition"
          />
        </form>
        )}

        <div className="flex items-center gap-2">
          <h1 className="text-sm md:text-base text-textBlue">Minha conta</h1>
          <HiUser className="text-xl text-textBlue" />
        </div>
      </nav>
    </div>
  )
}

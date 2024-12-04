'use client'

import { SetStateAction, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Link from 'next/link'
import fetchMovies2 from '@/app/api/fetchApiMovies'
import { useMovies } from '@/app/context/MoviesContext'

const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`

export default function NavFix() {
  const [value, setValue] = useState('')
  const { setMovies } = useMovies()
  const { setReload } = useMovies()

  const reloadPage = () => setReload((prev: boolean) => !prev)

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value)

    if (e.target.value === '') {
      reloadPage()
    }
  }

  async function searchMovie(e: { preventDefault: () => void }) {
    e.preventDefault()
    try {
      const data = await fetchMovies2(
        `https://api.themoviedb.org/3/search/movie?query=${value}&${keyApi}&language=pt-br`,
      )
      console.log(data)

      setMovies(data || [])
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    }
  }

  return (
    <div className="text-center center bg-russianviolet h-1/20 pl-10 pr-10">
      <nav className="flex justify-between items-center">
        <h2>
          <Link href={'/'} onClick={reloadPage}>
            MOVIES LIB
          </Link>
        </h2>
        <form className="flex gap-2 w-2/4 justify-end h-14 items-center">
          <Input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Qual filme procura ?"
            className="w-2/4"
          />
          <Button type="submit" variant="secondary" onClick={searchMovie}>
            Pesquisar
          </Button>
        </form>
      </nav>
    </div>
  )
}

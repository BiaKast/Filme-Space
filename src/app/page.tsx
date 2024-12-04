'use client'

import { useState, useEffect } from 'react'
import Movies from './movies/page'
import fetchMovies2 from './api/fetchApiMovies'
import { Button } from '@/components/ui/button'
import { ArrowBigLeft } from 'lucide-react'
import { useMovies } from './context/MoviesContext'

const API = process.env.NEXT_PUBLIC_APIURL
const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`

export default function Home() {
  const { movies, setMovies, reload } = useMovies()
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchMovies2(
          `${API}popular?&page=${page}&language=pt-br&${keyApi}`,
        )
        setMovies(data)
        console.log('data', data)
      } catch (error) {
        console.error('Erro ao carregar filmes:', error)
      }
    }
    loadMovies()
  }, [page, reload])

  function nextPage() {
    setPage((prevPage) => prevPage + 1)
  }

  function prevPage() {
    setPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  return (
    <section className="space-y-6 pt-6 pb-8 md:pb-12 md:pt-10 lg-py-32">
      <div className="container flex flex-col items-center gap-4 text-center max-w-[64rem]">
        <Movies movies={movies} /> {/* Passa os filmes como prop */}
      </div>
      <div className="flex justify-center gap-4">
        <Button color="danger" onClick={prevPage}>
          <ArrowBigLeft /> Anterior
        </Button>
        <Button color="primary" onClick={nextPage}>
          Próxima <ArrowBigLeft className="rotate-180" />
        </Button>
      </div>
    </section>
  )
}

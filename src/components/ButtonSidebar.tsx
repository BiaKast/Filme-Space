'use client'

import { useMovies } from "@/app/context/MoviesContext";

export default function ButtonSidebar() {
    const {   
        menuOpen,
        setMenuOpen
      } = useMovies();

    return(
        <button 
          className="fixed top-[9%] left-0 lg:hidden text-white p-2 bg-russianviolet rounded-r-md shadow-xl z-50" 
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(!menuOpen)}  // Alternar o estado do menu
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    )
}
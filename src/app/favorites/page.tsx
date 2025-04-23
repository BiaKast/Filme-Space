"use client"

import NavFix from '@/components/NavFix';
import { useMovies } from '@/context/MoviesContext';
import React, { useEffect } from 'react';

const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`;
const token = process.env.NEXT_TMDB_ACCESS_TOKEN

const FavoritePage = () => {
  const { userAccount } = useMovies();

  useEffect(() => {

    const getSessionId = () => {
      const cookies = document.cookie.split("; ");
      const sessionCookie = cookies.find((row) =>
        row.startsWith("session_id="),
      );
      return sessionCookie ? sessionCookie.split("=")[1] : null;
    };

    const fetchFavoriteMovies = async () => {
      if (!userAccount || !userAccount.id) {
        console.warn("Usuário não logado ou ID ausente.");
        return;
      }
  
      try {
        console.log(getSessionId(), 'sessionId');
  
        const response = await fetch(`/api/favorites?sessionId=${getSessionId()}&userAccount=${userAccount.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro ao buscar filmes favoritos:', response.status, errorText);
          return;
        }
  
        const data = await response.json();
        console.log('Filmes favoritos:', data);
      } catch (error) {
        console.error("Erro ao buscar filmes favoritos:", error);
      }
    };
  
    fetchFavoriteMovies();
  }, [userAccount]);

    return (
        <div>
            <NavFix />
            <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden pt-20">  
                <h1>Favorite Page</h1>
                <p>Welcome to the favorite page! Here you can manage your favorite items.</p>
            </div>
        </div>
    );
};

export default FavoritePage;
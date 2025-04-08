"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
  };

  useEffect(() => {
    const getSessionId = () => {
      const cookies = document.cookie.split("; ");
      const sessionCookie = cookies.find((row) => row.startsWith("session_id="));
      return sessionCookie ? sessionCookie.split("=")[1] : null;
    };

    const fetchUsername = async () => {
      const sessionId = getSessionId();
      if (!sessionId) return;

        console.log("Session ID:", sessionId); // Log the session ID for debugging
        
      try {
        const response = await fetch(`/api/account?session_id=${sessionId}`);
        const data = await response.json();
        console.log("Dados do usuário:", data); // Log the user data for debugging
        
        if (data.username) {
          setUsername(data.username);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition"
      >
        <span>👤</span>
        {username ? username : "Carregando..."}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <button
              onClick={() => router.push("/favoritos")}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Favoritos
            </button>
            <button
              onClick={() => router.push("/watchlist")}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Lista de Observação
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

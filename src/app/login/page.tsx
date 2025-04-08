"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const router = useRouter();

  const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`;
  const accessToken = process.env.NEXT_TMDB_ACCESS_TOKEN;

  interface JwtResponse {
    encryptedToken: string;
  }

  interface GuestResponse {
    guest_session_id: string;
  }

  interface TokenResponse {
    request_token: string;
  }

  const saveSessionToken = async (session_id: string): Promise<void> => {
    try {
      const response = await fetch(`/api/auth`, {
        method: "POST",
        body: JSON.stringify({ session_id }),
      });

      const data: JwtResponse = await response.json();

      document.cookie = `session_id=${data.encryptedToken}; path=/; secure; SameSite=Strict`;
      router.push("/");
    } catch (error) {
      console.error("Erro ao salvar sessão:", error);
      setError("Erro ao processar autenticação.");
    }
  };

  const createSession = async (requestToken: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new?${keyApi}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ request_token: requestToken }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setSessionId(data.session_id);
        saveSessionToken(data.session_id);
      } else {
        setError("Erro ao criar sessão.");
      }
    } catch (error) {
      console.error("Erro ao criar sessão:", error);
      setError("Erro ao criar sessão.");
    }
  };

  const handleLogin = async (isGuest: boolean) => {
    setError("");
    setLoading(true);

    try {
      if (isGuest) {
        const guestRes = await fetch(
          `https://api.themoviedb.org/3/authentication/guest_session/new?${keyApi}`,
        );
        const guestData: GuestResponse = await guestRes.json();
        await saveSessionToken(guestData.guest_session_id);
      } else {
        const res = await fetch(
          `https://api.themoviedb.org/3/authentication/token/new?${keyApi}`,
        );
        const result: TokenResponse = await res.json();

        if (!result.request_token)
          throw new Error("Erro ao gerar token de autenticação.");
        
        if (typeof window !== 'undefined') {
          window.location.href = `https://www.themoviedb.org/authenticate/${result.request_token}?redirect_to=http://localhost:3001/login`;
        }
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      setError("Erro ao autenticar. Tente novamente.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestToken = params.get("request_token");
    const approved = params.get("approved");

    if (requestToken && approved === "true") {
      createSession(requestToken);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-russianviolet">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg text-center">
        {loading ? (
          <h2 className="text-2xl font-bold text-gray-900">Aguarde...</h2>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900">
              Bem-vindo ao <span className="text-blue-600">FilmeSpace</span>
            </h2>
            <p className="text-gray-700">Escolha uma opção para continuar</p>
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={() => handleLogin(false)}
              className="w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 mb-4"
            >
              Entrar com login no TMDB
            </button>
            <button
              onClick={() => handleLogin(true)}
              className="w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
              Entrar como convidado
            </button>
          </>
        )}
      </div>
    </div>
  );
}

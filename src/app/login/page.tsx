"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`;
  const acessTokenTmdb = process.env.NEXT_TMDB_ACCESS_TOKEN;

  interface JwtResponse {
    encryptedToken: string;
  }

  const saveSessionToken = async (requestToken: string): Promise<void> => {
    try {
      const jwtResponse = await fetch(`/api/auth`, {
        method: "POST",
        body: JSON.stringify({ session_id: requestToken }),
      });

      const jwtData: JwtResponse = await jwtResponse.json();
      document.cookie = `session_id=${jwtData.encryptedToken}; path=/; secure; SameSite=Strict`;

      setLoading(true);
      router.push("/");
    } catch (error) {
      console.error("Erro ao salvar sessão:", error);
      setError("Erro ao processar autenticação.");
    }
  };

  interface GuestResponse {
    guest_session_id: string;
  }

  interface TokenResponse {
    request_token: string;
  }

  const handleLogin = async (isGuest: boolean): Promise<void> => {
    setError("");
    setLoading(true);

    try {
      if (isGuest) {
        const guestResponse = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?${keyApi}`);
        const guestData: GuestResponse = await guestResponse.json();
        await saveSessionToken(guestData.guest_session_id);
      } else {
        const response = await fetch(`https://api.themoviedb.org/3/authentication/token/new?${keyApi}`);
        const result: TokenResponse = await response.json();
        
        if (!result.request_token) throw new Error("Erro ao gerar token de autenticação.");
        window.location.href = `https://www.themoviedb.org/authenticate/${result.request_token}?redirect_to=http://localhost:3001/login`;
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
      setLoading(false);
      console.log("Token de autenticação recebido:", requestToken);

      // Criar a sessão no TMDB
      createSession(requestToken);
    }
  }, []);

  const account = (session_id: string) => {
    fetch(`https://api.themoviedb.org/3/account?${keyApi}&session_id=${session_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${acessTokenTmdb}`, // Usa o Bearer Token
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("Conta do usuário:", data))
      .catch((err) => console.error("Erro ao buscar conta:", err));
  };

  // Criar a sessão com o request_token aprovado
  const createSession = async (requestToken: string) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/authentication/session/new?${keyApi}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${acessTokenTmdb}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request_token: requestToken }),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log("Session ID:", data.session_id);
        setSessionId(data.session_id);
        console.log(account(data.session_id), "account"); // Chama a função account com o session_id
        
        saveSessionToken(data.session_id); // Função para salvar o session_id no cookie/localStorage
      } else {
        console.error("Erro ao criar sessão:", data);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-russianviolet">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg text-center">
        {loading ? (
          <h2 className="text-2xl font-bold text-gray-900">Aguarde...</h2>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900">Bem-vindo ao <span className="text-blue-600">FilmeSpace</span></h2>
            <p className="text-gray-700">Escolha uma opção para continuar</p>
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={() => handleLogin(false)}
              className="w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 mb-4"
              disabled={loading}
            >
              Entrar com login no TMDB
            </button>
            <button
              onClick={() => handleLogin(true)}
              className="w-full rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
              disabled={loading}
            >
              Entrar como convidado
            </button>
          </>
        )}
      </div>
    </div>
  );
}

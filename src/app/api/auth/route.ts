import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "dbbf07c101e9efb1aaa1f1def9dbd40e";

export async function POST(req: Request) {
  try {
    // Utilizando req.json() para ler o corpo da requisição como JSON
    const { session_id } = await req.json(); // Isso vai fazer o parsing do JSON e extrair o request_token

    console.log("Token recebido:", session_id);
    
    if (!session_id) return NextResponse.json({ error: "Token não enviado" }, { status: 400 });
    const account = await fetch(
      `https://api.themoviedb.org/3/account?api_key=${process.env.NEXT_PUBLIC_KEYAPI}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    );
    const accountData = await account.json();
    console.log("Resposta da API TMDB:", accountData);
    

    // Criação do token JWT
    const encryptedToken = jwt.sign({ session_id }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({ success: true, encryptedToken });
  } catch (error) {
    console.error("Erro ao salvar token:", error);
    return NextResponse.json({ error: "Erro ao salvar token" }, { status: 500 });
  }
}

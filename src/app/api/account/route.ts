// app/api/account/route.ts
import jwt from "jsonwebtoken";

const SECRET_KEY =
  process.env.NEXT_PUBLIC_SECRET_KEY || "dbbf07c101e9efb1aaa1f1def9dbd40e";
const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`;
const accessTokenTmdb = process.env.NEXT_TMDB_ACCESS_TOKEN;

interface DecodedToken {
  session_id: string;
  [key: string]: any;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Missing session ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const decoded = jwt.verify(sessionId, SECRET_KEY) as DecodedToken;

    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/account?${keyApi}&session_id=${decoded.session_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenTmdb}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await tmdbResponse.json();

    if (!tmdbResponse.ok && !decoded.session_id) {
      return new Response(JSON.stringify({ error: "Erro na API do TMDB", data: decoded.session_id}), {
        status: tmdbResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro no token ou requisição:", error);
    return new Response(
      JSON.stringify({ error: "Token expirado ou inválido!", status: 401 }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

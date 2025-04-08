// app/api/account/route.ts
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "dbbf07c101e9efb1aaa1f1def9dbd40e";
const keyApi = `api_key=${process.env.NEXT_PUBLIC_KEYAPI}`;
const acessTokenTmdb = process.env.NEXT_TMDB_ACCESS_TOKEN;

console.log("entrou aqui");

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    
    if (!sessionId) {
        return new Response(JSON.stringify({ error: "Missing session ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }
    const decoded = jwt.verify(sessionId, SECRET_KEY);
    console.log(decoded);

    if (!decoded || typeof decoded === "string" || !("session_id" in decoded)) {
      return new Response(JSON.stringify({ error: "Invalid session ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Exemplo de requisição à API externa (TMDB)
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/account?${keyApi}&session_id=${decoded.session_id}`, {
        headers: {
        Authorization: `Bearer ${process.env.NEXT_TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
  
    const data = await tmdbResponse.json();
  
    return new Response(JSON.stringify({ username: data.username }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  


// export async function GET(req: Request) {
//     try {
//       const { searchParams } = new URL(req.url);
//       const sessionId = searchParams.get("session_id");
//       if (!sessionId) {
//         return new Response(JSON.stringify({ error: "Missing or invalid session ID" }), {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         });
//       }
//       const decoded = jwt.verify(sessionId, SECRET_KEY);
//       console.log("Session ID:", decoded); // Log para depuração
  
//       if (!decoded) {
//         return new Response(JSON.stringify({ error: "Missing session ID" }), {
//           status: 400,
//           headers: { "Content-Type": "application/json" },
//         });
//       }
  
//       // Aqui você faria a chamada real à API do TMDB, por exemplo:
      
//       const tmdbRes = await fetch(`https://api.themoviedb.org/3/account?${keyApi}&session_id=${decoded}`, {
//               method: "GET",
//               headers: {
//                 Authorization: `Bearer ${acessTokenTmdb}`,
//                 "Content-Type": "application/json",
//               },
//       });

//       const tmdbData = await tmdbRes.json();
  
//       return new Response(JSON.stringify({ username: tmdbData.username }), {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       });
  
//     } catch (err) {
//       console.error("Erro na API /account:", err);
  
//       return new Response(JSON.stringify({ error: "Erro interno" }), {
//         status: 500,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//   }
  
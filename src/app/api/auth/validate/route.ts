import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "teste123";

export async function GET(req: Request) {
  // console.log(req.headers.get("Authorization"));
  
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ valid: true, decoded });
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "teste123";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session_id")?.value;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Login não encontrado" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(sessionId, SECRET_KEY);
    return NextResponse.json({ valid: true, decoded });
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}

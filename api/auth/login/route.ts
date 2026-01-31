import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { compareSync } from "bcryptjs";
import { createAuthToken } from "@/lib/auth-token";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios" },
        { status: 400 },
      );
    }

    // Find user
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email) as
      | {
          id: number;
          name: string;
          email: string;
          password: string;
          role: number;
        }
      | undefined;

    if (!user) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos" },
        { status: 401 },
      );
    }

    // Verify password
    const isValidPassword = compareSync(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "E-mail ou senha incorretos" },
        { status: 401 },
      );
    }

    const token = createAuthToken({ id: user.id, role: user.role });
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro ao fazer login" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { hashSync } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = hashSync(password, 10);

    // Insert user
    const result = db
      .prepare(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 0)",
      )
      .run(name, email, hashedPassword);

    return NextResponse.json(
      {
        success: true,
        message: "Cadastro realizado com sucesso",
        userId: result.lastInsertRowid,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro no cadastro:", error);
    return NextResponse.json(
      { error: "Erro ao realizar cadastro" },
      { status: 500 },
    );
  }
}

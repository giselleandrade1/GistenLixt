import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Deslogado com sucesso",
  });

  response.cookies.delete("auth_token");

  return response;
}

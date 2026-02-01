import { NextRequest, NextResponse } from "next/server";
import { parseAuthToken } from "@/lib/auth-token-edge";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const auth = await parseAuthToken(token);

  if (!auth) {
    const url = new URL("/", request.url);
    url.searchParams.set("unauthorized", "1");
    return NextResponse.redirect(url);
  }

  if (auth.role === 0) {
    const url = new URL("/aviso-acesso-limitado", request.url);
    url.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/clientes", "/clientes/novo", "/dashboard"],
};

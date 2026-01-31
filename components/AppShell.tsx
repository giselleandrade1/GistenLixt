"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export default function AppShell({
  title,
  subtitle,
  children,
  actions,
}: AppShellProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <header className="bg-zinc-800 text-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3 font-semibold">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/15 text-sm">
              ▦
            </span>
            <span>GistenLixt</span>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <a
              className="inline-flex items-center gap-2 text-white/90"
              href="/clientes"
            >
              Clientes
            </a>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white disabled:opacity-50"
            >
              {isLoggingOut ? "Saindo..." : "Sair"}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
            )}
          </div>
          {actions ? <div>{actions}</div> : null}
        </div>

        <div className="mt-6">{children}</div>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-4 text-center text-xs text-zinc-500">
        © 2026 Contabilizei - Sistema de Gestão Contábil e Fiscal
      </footer>
    </div>
  );
}

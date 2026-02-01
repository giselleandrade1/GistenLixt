/**
 * Página de Cadastro - Utiliza o componente CadastroPanel isolado
 */

"use client";

import { CadastroPanel } from "../components/CadastroPanel";
import { AuthFooter } from "../components/AuthFooter";

export default function CadastroPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900">
      {/* Efeito de fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-300 opacity-20 blur-3xl dark:bg-purple-600"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-pink-300 opacity-20 blur-3xl dark:bg-pink-600"></div>
      </div>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12 font-sans">
        <div className="w-full max-w-md">
          {/* Card principal */}
          <div className="rounded-3xl border border-white/30 bg-white/80 backdrop-blur-xl p-8 shadow-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-2xl dark:shadow-purple-500/10">
            <CadastroPanel />
          </div>
        </div>
      </main>

      {/* Theme Toggle Footer */}
      <AuthFooter />
    </div>
  );
}

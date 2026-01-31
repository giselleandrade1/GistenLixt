"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AvisoAcessoLimitado() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fromPage = searchParams.get("from") || "/dashboard";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12 font-sans dark:bg-black">
      <main className="w-full max-w-2xl">
        <div className="w-full rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow-sm dark:border-amber-900 dark:bg-amber-950">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚠️</div>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-amber-900 dark:text-amber-100">
                  Acesso Limitado
                </h1>
                <p className="text-base text-amber-800 dark:text-amber-200">
                  Sua conta está em fase de verificação e possui acesso
                  limitado.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white/50 p-4 dark:bg-black/20">
              <h2 className="font-semibold text-amber-900 dark:text-amber-100">
                O que você pode fazer:
              </h2>
              <ul className="mt-2 space-y-2 text-sm text-amber-800 dark:text-amber-200">
                <li>✓ Atualizar seu perfil</li>
                <li>✓ Visualizar informações básicas</li>
                <li>✓ Contatar administrador</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/50 p-4 dark:bg-black/20">
              <h2 className="font-semibold text-amber-900 dark:text-amber-100">
                Próximos passos:
              </h2>
              <p className="mt-2 text-sm text-amber-800 dark:text-amber-200">
                Para obter acesso completo ao sistema, entre em contato com um
                administrador.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-xl bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
              >
                Ir para Dashboard
              </button>
              <button
                onClick={() => router.back()}
                className="rounded-xl border border-amber-600 px-6 py-3 text-sm font-semibold text-amber-600 transition hover:bg-amber-50 dark:hover:bg-amber-950"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

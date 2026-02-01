"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "../../components/AppShell";

export default function NovoClientePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      razao_social: String(formData.get("razao") || "").trim(),
      cnpj: String(formData.get("cnpj") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      telefone: String(formData.get("telefone") || "").trim(),
      regime_tributario: String(formData.get("regime") || "").trim(),
      anexo_simples: String(formData.get("anexo") || "").trim(),
      cidade: String(formData.get("cidade") || "").trim(),
      estado: String(formData.get("estado") || "").trim(),
      faturamento_anual: String(formData.get("faturamento") || "").trim(),
    };

    try {
      const response = await fetch("/api/clients/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Erro ao salvar cliente");
        return;
      }

      router.push("/clientes");
    } catch {
      setError("Erro ao salvar cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell title="Cadastrar Novo Cliente">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="razao"
              >
                Razão Social <span className="text-red-500">*</span>
              </label>
              <input
                id="razao"
                name="razao"
                type="text"
                className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="cnpj"
              >
                CNPJ <span className="text-red-500">*</span>
              </label>
              <input
                id="cnpj"
                name="cnpj"
                type="text"
                placeholder="Apenas números"
                className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="email"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="telefone"
              >
                Telefone
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="regime"
              >
                Regime Tributário <span className="text-red-500">*</span>
              </label>
              <select
                id="regime"
                name="regime"
                className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
                defaultValue="simples"
                required
              >
                <option value="simples">Simples Nacional</option>
                <option value="lucro-presumido">Lucro Presumido</option>
                <option value="lucro-real">Lucro Real</option>
              </select>
            </div>
            <div>
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="anexo"
              >
                Anexo do Simples Nacional{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                id="anexo"
                name="anexo"
                className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Selecione...
                </option>
                <option value="anexo-1">Anexo I</option>
                <option value="anexo-2">Anexo II</option>
                <option value="anexo-3">Anexo III</option>
                <option value="anexo-4">Anexo IV</option>
                <option value="anexo-5">Anexo V</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="cidade"
              >
                Cidade
              </label>
              <input
                id="cidade"
                name="cidade"
                type="text"
                className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-zinc-700"
                htmlFor="estado"
              >
                Estado
              </label>
              <input
                id="estado"
                name="estado"
                type="text"
                placeholder="UF"
                className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="md:w-1/2">
            <label
              className="text-sm font-medium text-zinc-700"
              htmlFor="faturamento"
            >
              Faturamento Anual Estimado
            </label>
            <input
              id="faturamento"
              name="faturamento"
              type="text"
              className="mt-2 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-zinc-700 px-4 py-2 text-sm font-semibold text-white"
            >
              {loading ? "Salvando..." : "💾 Salvar"}
            </button>
            <a
              href="/clientes"
              className="rounded-md bg-zinc-500 px-4 py-2 text-sm font-semibold text-white"
            >
              ✖ Cancelar
            </a>
          </div>
        </form>
      </div>
    </AppShell>
  );
}

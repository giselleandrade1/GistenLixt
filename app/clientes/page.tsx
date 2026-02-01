"use client";

import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";

type Client = {
  id: number;
  razao_social: string;
  cnpj: string;
  regime_tributario: string;
  email?: string | null;
};

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("/api/clients/list", { method: "GET" });
        if (!response.ok) {
          setError("Erro ao carregar clientes");
          return;
        }
        const data = await response.json();
        setClients(data.clients || []);
      } catch {
        setError("Erro ao carregar clientes");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <AppShell
      title="Gerenciamento de Clientes"
      actions={
        <a
          href="/clientes/novo"
          className="rounded-md bg-zinc-700 px-4 py-2 text-sm font-semibold text-white"
        >
          + Novo Cliente
        </a>
      }
    >
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
        {error && (
          <div className="flex items-center justify-between rounded-t-xl border-b border-zinc-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            <span>{error}</span>
            <button className="text-red-400" aria-label="Fechar aviso">
              ✕
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Razão Social</th>
                <th className="px-4 py-3">CNPJ</th>
                <th className="px-4 py-3">Regime Tributário</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    className="px-4 py-12 text-center text-sm text-zinc-500"
                    colSpan={7}
                  >
                    Carregando...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-12 text-center text-sm text-zinc-500"
                    colSpan={7}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">🗂️</span>
                      <span>Nenhum cliente cadastrado</span>
                    </div>
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="border-b border-zinc-100">
                    <td className="px-4 py-3">{client.id}</td>
                    <td className="px-4 py-3">{client.razao_social}</td>
                    <td className="px-4 py-3">{client.cnpj}</td>
                    <td className="px-4 py-3">{client.regime_tributario}</td>
                    <td className="px-4 py-3">{client.email || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700">
                        Ativo
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-zinc-500 hover:text-zinc-800">
                        Ver
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

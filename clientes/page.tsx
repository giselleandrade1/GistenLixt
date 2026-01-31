import AppShell from "../components/AppShell";

export default function ClientesPage() {
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
        <div className="flex items-center justify-between rounded-t-xl border-b border-zinc-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <span>Erro ao carregar clientes</span>
          <button className="text-red-400">✕</button>
        </div>

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
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

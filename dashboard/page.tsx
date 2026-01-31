import AppShell from "../components/AppShell";

const stats = [
  { label: "Total de Clientes", value: 0, icon: "👥" },
  { label: "Clientes Ativos", value: 0, icon: "✅" },
  { label: "Impostos Vencidos", value: 0, icon: "⚠️" },
  { label: "Impostos Pendentes", value: 0, icon: "🕒" },
];

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard" subtitle="Visão geral do sistema">
      <section className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 text-center shadow-sm"
          >
            <div className="text-2xl">{stat.icon}</div>
            <div className="mt-2 text-2xl font-semibold text-zinc-700">
              {stat.value}
            </div>
            <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="rounded-t-xl bg-zinc-800 px-4 py-2 text-sm font-semibold text-white">
          ⚡ Ações Rápidas
        </div>
        <div className="flex flex-wrap gap-3 p-4">
          <button className="inline-flex items-center gap-2 rounded-md bg-zinc-700 px-3 py-2 text-xs font-semibold text-white">
            👤 Novo Cliente
          </button>
          <button className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-xs font-semibold text-white">
            🧾 Emitir Nota Fiscal
          </button>
          <button className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-3 py-2 text-xs font-semibold text-white">
            🧮 Calcular Impostos
          </button>
        </div>
      </section>
    </AppShell>
  );
}

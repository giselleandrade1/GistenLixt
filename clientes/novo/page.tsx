import AppShell from "../../components/AppShell";

export default function NovoClientePage() {
  return (
    <AppShell title="Cadastrar Novo Cliente">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <form className="space-y-4">
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
              className="rounded-md bg-zinc-700 px-4 py-2 text-sm font-semibold text-white"
            >
              💾 Salvar
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

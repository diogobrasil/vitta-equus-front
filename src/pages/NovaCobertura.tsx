import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface CoberturaForm {
    doadouraId: string;
    garanhaoId: string;
    dataHora: string;
    tipoProcedimento: string;
    tipoSemen: string;
    propriedade: string;
    observacoes: string;
}

const INITIAL_STATE: CoberturaForm = {
    doadouraId: "",
    garanhaoId: "",
    dataHora: "",
    tipoProcedimento: "",
    tipoSemen: "",
    propriedade: "",
    observacoes: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function NovaCobertura() {
    const navigate = useNavigate();
    const [form, setForm] = useState<CoberturaForm>(INITIAL_STATE);

    const update = (field: keyof CoberturaForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    /** Sêmen só faz sentido quando NÃO é Monta Natural */
    const semenDisabled = form.tipoProcedimento === "Monta Natural";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            tipoSemen: semenDisabled ? "" : form.tipoSemen,
        };
        console.log("📤 Dados da Cobertura:", JSON.stringify(payload, null, 2));
        alert("Registro salvo com sucesso! (verifique o console)");
    };

    /* ── Classes reutilizáveis ── */
    const inputClass =
        "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";
    const disabledClass =
        "w-full rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-sm text-neutral-400 outline-none cursor-not-allowed";

    return (
        <div className="space-y-6">
            {/* ── Botão Voltar ── */}
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-brand-blue"
            >
                <ArrowLeft className="h-4 w-4" />
                Voltar
            </button>

            {/* ── Cabeçalho ── */}
            <div>
                <h1 className="text-2xl font-bold text-brand-blue">
                    Registro de Cobertura / Inseminação
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Registre os dados do cruzamento, garanhão e método utilizado.
                </p>
            </div>

            {/* ── Card do Formulário ── */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* ─── Seção 1: Animais Envolvidos ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Animais Envolvidos
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Doadora / Égua */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="doadoura"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Doadora / Égua (Mãe)
                            </label>
                            <select
                                id="doadoura"
                                value={form.doadouraId}
                                onChange={(e) => update("doadouraId", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione a égua…</option>
                                <option value="1">Estrela Dalva (Box 05)</option>
                                <option value="2">Princesa (Box 12)</option>
                            </select>
                        </div>

                        {/* Garanhão */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="garanhao"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Produtor / Garanhão (Pai)
                            </label>
                            <select
                                id="garanhao"
                                value={form.garanhaoId}
                                onChange={(e) => update("garanhaoId", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione o garanhão…</option>
                                <option value="3">Trovão Negro</option>
                                <option value="4">Campeão</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 2: Detalhes do Procedimento ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Detalhes do Procedimento
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {/* Data e Hora */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="dataHora"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Data e Hora
                            </label>
                            <input
                                id="dataHora"
                                type="datetime-local"
                                value={form.dataHora}
                                onChange={(e) => update("dataHora", e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        {/* Tipo de Procedimento */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="tipoProcedimento"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Tipo de Procedimento
                            </label>
                            <select
                                id="tipoProcedimento"
                                value={form.tipoProcedimento}
                                onChange={(e) => {
                                    update("tipoProcedimento", e.target.value);
                                    if (e.target.value === "Monta Natural") {
                                        update("tipoSemen", "");
                                    }
                                }}
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Monta Natural</option>
                                <option>IA</option>
                                <option>TE</option>
                                <option>ICSI</option>
                            </select>
                        </div>

                        {/* Tipo de Sêmen */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="tipoSemen"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Tipo de Sêmen{" "}
                                {semenDisabled && (
                                    <span className="font-normal text-neutral-400">
                                        (N/A para Monta Natural)
                                    </span>
                                )}
                            </label>
                            <select
                                id="tipoSemen"
                                value={semenDisabled ? "" : form.tipoSemen}
                                onChange={(e) => update("tipoSemen", e.target.value)}
                                disabled={semenDisabled}
                                className={semenDisabled ? disabledClass : inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Fresco</option>
                                <option>Resfriado</option>
                                <option>Congelado</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 3: Local e Observações ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Local e Observações
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Propriedade */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="propriedade"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Propriedade / Haras
                            </label>
                            <select
                                id="propriedade"
                                value={form.propriedade}
                                onChange={(e) => update("propriedade", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option value="fbe">Fazenda Boa Esperança</option>
                                <option value="crc">Centro de Reprodução Central</option>
                            </select>
                        </div>
                    </div>

                    {/* Observações */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="obs"
                            className="block text-sm font-semibold text-neutral-700"
                        >
                            Observações
                        </label>
                        <textarea
                            id="obs"
                            rows={4}
                            placeholder="Particularidades do manejo reprodutivo…"
                            value={form.observacoes}
                            onChange={(e) => update("observacoes", e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition resize-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                        />
                    </div>
                </div>

                {/* ─── Rodapé: Ações ─── */}
                <div className="flex items-center justify-end gap-4 bg-neutral-50 px-6 py-4 rounded-b-xl">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]"
                    >
                        <Save className="h-4 w-4" />
                        Salvar Registro
                    </button>
                </div>
            </form>
        </div>
    );
}

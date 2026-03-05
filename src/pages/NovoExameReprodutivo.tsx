import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface ExameForm {
    animalId: string;
    dataHora: string;
    propriedade: string;
    diametroFolicular: string;
    edemaUterino: string;
    corpoLuteo: string;
    insumo: string;
    observacoes: string;
}

const INITIAL_STATE: ExameForm = {
    animalId: "",
    dataHora: "",
    propriedade: "",
    diametroFolicular: "",
    edemaUterino: "",
    corpoLuteo: "",
    insumo: "",
    observacoes: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function NovoExameReprodutivo() {
    const navigate = useNavigate();
    const [form, setForm] = useState<ExameForm>(INITIAL_STATE);

    /** Atualiza um campo do formulário */
    const update = (field: keyof ExameForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    /** Simula envio para a API */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("📤 Dados do Exame Reprodutivo:", JSON.stringify(form, null, 2));
        alert("Exame salvo com sucesso! (verifique o console)");
    };

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
                    Novo Exame Reprodutivo
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Registre o monitoramento folicular e acompanhamento de ciclo.
                </p>
            </div>

            {/* ── Card do Formulário ── */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* ─── Seção 1: Dados Gerais ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Dados Gerais
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Animal */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="animal"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Animal (Doadora / Égua)
                            </label>
                            <select
                                id="animal"
                                value={form.animalId}
                                onChange={(e) => update("animalId", e.target.value)}
                                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            >
                                <option value="">Selecione o animal…</option>
                                <option value="1">Estrela Dalva (Box 05)</option>
                                <option value="2">Princesa (Box 12)</option>
                            </select>
                        </div>

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
                                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            />
                        </div>

                        {/* Propriedade */}
                        <div className="space-y-1.5 sm:col-span-2">
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
                                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            >
                                <option value="">Selecione a propriedade…</option>
                                <option value="fbe">Fazenda Boa Esperança</option>
                                <option value="crc">Centro de Reprodução Central</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 2: Monitoramento Folicular ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Dados do Ultrassom
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {/* Diâmetro */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="diametro"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Diâmetro Folicular
                            </label>
                            <div className="relative">
                                <input
                                    id="diametro"
                                    type="number"
                                    min={0}
                                    step={0.1}
                                    placeholder="Ex: 35"
                                    value={form.diametroFolicular}
                                    onChange={(e) =>
                                        update("diametroFolicular", e.target.value)
                                    }
                                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 pr-12 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                                />
                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400">
                                    mm
                                </span>
                            </div>
                        </div>

                        {/* Edema Uterino */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="edema"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Edema Uterino
                            </label>
                            <select
                                id="edema"
                                value={form.edemaUterino}
                                onChange={(e) => update("edemaUterino", e.target.value)}
                                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            >
                                <option value="">Selecione…</option>
                                <option>Ausente</option>
                                <option>Grau 1</option>
                                <option>Grau 2</option>
                                <option>Grau 3</option>
                                <option>Grau 4</option>
                            </select>
                        </div>

                        {/* Corpo Lúteo */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="corpoLuteo"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Corpo Lúteo
                            </label>
                            <select
                                id="corpoLuteo"
                                value={form.corpoLuteo}
                                onChange={(e) => update("corpoLuteo", e.target.value)}
                                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            >
                                <option value="">Selecione…</option>
                                <option>Ausente</option>
                                <option>Presente - Ovário Esquerdo (OE)</option>
                                <option>Presente - Ovário Direito (OD)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 3: Insumos e Observações ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Insumos e Observações
                    </h2>

                    <div className="grid grid-cols-1 gap-5">
                        {/* Insumo */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="insumo"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Insumo / Indutor de Ovulação{" "}
                                <span className="font-normal text-neutral-400">(opcional)</span>
                            </label>
                            <select
                                id="insumo"
                                value={form.insumo}
                                onChange={(e) => update("insumo", e.target.value)}
                                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            >
                                <option value="">Nenhum</option>
                                <option>Deslorelina</option>
                                <option>hCG</option>
                            </select>
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
                                placeholder="Anotações e peculiaridades do exame…"
                                value={form.observacoes}
                                onChange={(e) => update("observacoes", e.target.value)}
                                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition resize-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            />
                        </div>
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
                        Salvar Exame
                    </button>
                </div>
            </form>
        </div>
    );
}

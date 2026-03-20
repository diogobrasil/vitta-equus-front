import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface GestacaoForm {
    eguaId: string;
    coberturaRef: string;
    data_diagnostico_inicial: string;
    resultado: string;
    data_previsao_parto: string;
    observacoes: string;
}

const INITIAL_STATE: GestacaoForm = {
    eguaId: "",
    coberturaRef: "",
    data_diagnostico_inicial: "",
    resultado: "",
    data_previsao_parto: "",
    observacoes: "",
};

const RESULTADOS_GESTACAO_ATIVA = [
    "Prenhe"
];

/* ─────────────────────── Componente ─────────────────────── */

export default function DiagnosticoGestacao() {
    const navigate = useNavigate();

    // Mock do usuário logado (veterinário)
    const usuarioLogado = { id: 1, nome: "Dr. Carlos" };

    const [form, setForm] = useState<GestacaoForm>(INITIAL_STATE);

    const update = (field: keyof GestacaoForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    /** Previsão de parto só aparece para gestação ativa */
    const gestacaoAtiva = RESULTADOS_GESTACAO_ATIVA.includes(form.resultado);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            fktb06idVeterinario: usuarioLogado.id,
            data_previsao_parto: gestacaoAtiva ? form.data_previsao_parto : "",
        };
        console.log(
            "📤 Dados do Diagnóstico de Gestação:",
            JSON.stringify(payload, null, 2)
        );
        alert("Diagnóstico salvo com sucesso! (verifique o console)");
    };

    const inputClass =
        "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";

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
                    Diagnóstico de Gestação
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Confirmação de prenhez e acompanhamento do desenvolvimento
                    embrionário.
                </p>
            </div>

            {/* ── Card do Formulário ── */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* ─── Seção 1: Histórico Base ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Histórico Base
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Égua */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="egua"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Égua (Receptora / Doadora)
                            </label>
                            <select
                                id="egua"
                                value={form.eguaId}
                                onChange={(e) => update("eguaId", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione a égua…</option>
                                <option value="1">Estrela Dalva (Box 05)</option>
                                <option value="2">Princesa (Box 12)</option>
                            </select>
                        </div>

                        {/* Cobertura de Referência */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="coberturaRef"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Cobertura de Referência
                            </label>
                            <select
                                id="coberturaRef"
                                value={form.coberturaRef}
                                onChange={(e) =>
                                    update("coberturaRef", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione a cobertura…</option>
                                <option value="cob-1">
                                    15 Fev - IA com Trovão Negro
                                </option>
                                <option value="cob-2">
                                    Monta Natural com Campeão
                                </option>
                            </select>
                        </div>

                        {/* Veterinário Responsável */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label
                                htmlFor="veterinario"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Veterinário Responsável
                            </label>
                            <input
                                id="veterinario"
                                type="text"
                                value={usuarioLogado.nome}
                                readOnly
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Seção 2: Resultado do Diagnóstico ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Resultado do Diagnóstico
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Data do Diagnóstico Inicial */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="dataExame"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Data do Diagnóstico Inicial
                            </label>
                            <input
                                id="dataExame"
                                type="date"
                                value={form.data_diagnostico_inicial}
                                onChange={(e) =>
                                    update("data_diagnostico_inicial", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>

                        {/* Resultado */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="resultado"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Resultado (Status)
                            </label>
                            <select
                                id="resultado"
                                value={form.resultado}
                                onChange={(e) => {
                                    update("resultado", e.target.value);
                                    if (
                                        !RESULTADOS_GESTACAO_ATIVA.includes(
                                            e.target.value
                                        )
                                    ) {
                                        update("data_previsao_parto", "");
                                    }
                                }}
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option value="Prenhe">Prenhe</option>
                                <option value="Vazia">Vazia</option>
                                <option value="Reabsorção">Reabsorção</option>
                                <option value="Aborto">Aborto</option>
                            </select>
                        </div>
                    </div>

                    {/* Previsão de Parto — condicional */}
                    {gestacaoAtiva && (
                        <div className="rounded-lg border border-green-200 bg-green-50 p-4 space-y-1.5 mt-5">
                            <label
                                htmlFor="previsaoParto"
                                className="block text-sm font-semibold text-green-800"
                            >
                                Data Prevista do Parto <span className="font-normal text-green-700">(~335 a 342 dias após cobertura)</span>
                            </label>
                            <input
                                id="previsaoParto"
                                type="date"
                                required
                                value={form.data_previsao_parto}
                                onChange={(e) =>
                                    update("data_previsao_parto", e.target.value)
                                }
                                className="w-full rounded-lg border border-green-300 bg-white px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            />
                        </div>
                    )}
                </div>

                {/* ─── Seção 3: Conduta e Observações ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Conduta e Observações
                    </h2>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="obs"
                            className="block text-sm font-semibold text-neutral-700"
                        >
                            Observações Ultrassonográficas
                        </label>
                        <textarea
                            id="obs"
                            rows={4}
                            placeholder="Ex: Vesícula embrionária com bom tônus, presença de batimento cardíaco…"
                            value={form.observacoes}
                            onChange={(e) =>
                                update("observacoes", e.target.value)
                            }
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
                        Salvar Diagnóstico
                    </button>
                </div>
            </form>
        </div>
    );
}

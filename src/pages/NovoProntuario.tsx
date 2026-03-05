import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface ProntuarioForm {
    animalId: string;
    veterinarioId: string;
    dataHora: string;
    queixa: string;
    fc: string;
    fr: string;
    temperatura: string;
    mucosas: string;
    diagnostico: string;
    prescricao: string;
}

const INITIAL_STATE: ProntuarioForm = {
    animalId: "",
    veterinarioId: "",
    dataHora: "",
    queixa: "",
    fc: "",
    fr: "",
    temperatura: "",
    mucosas: "",
    diagnostico: "",
    prescricao: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function NovoProntuario() {
    const navigate = useNavigate();
    const [form, setForm] = useState<ProntuarioForm>(INITIAL_STATE);

    const update = (field: keyof ProntuarioForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(
            "📤 Dados do Prontuário Clínico:",
            JSON.stringify(form, null, 2)
        );
        alert("Prontuário salvo com sucesso! (verifique o console)");
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
                    Novo Prontuário Clínico
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Registro de anamnese, sinais vitais, diagnóstico e prescrição
                    de medicamentos.
                </p>
            </div>

            {/* ── Card do Formulário ── */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* ─── Seção 1: Dados do Atendimento ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Dados do Atendimento
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {/* Paciente */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="animal"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Paciente (Animal)
                            </label>
                            <select
                                id="animal"
                                value={form.animalId}
                                onChange={(e) =>
                                    update("animalId", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione o animal…</option>
                                <option value="1">Campeão (Box 08)</option>
                                <option value="2">
                                    Estrela Dalva (Box 05)
                                </option>
                            </select>
                        </div>

                        {/* Veterinário */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="veterinario"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Veterinário Responsável
                            </label>
                            <select
                                id="veterinario"
                                value={form.veterinarioId}
                                onChange={(e) =>
                                    update("veterinarioId", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option value="v1">Dr. Carlos</option>
                                <option value="v2">Dra. Camila</option>
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
                                onChange={(e) =>
                                    update("dataHora", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Seção 2: Anamnese e Sinais Vitais ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Avaliação Clínica
                    </h2>

                    {/* Queixa */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="queixa"
                            className="block text-sm font-semibold text-neutral-700"
                        >
                            Queixa Principal / Histórico
                        </label>
                        <textarea
                            id="queixa"
                            rows={3}
                            placeholder="Motivo do atendimento..."
                            value={form.queixa}
                            onChange={(e) => update("queixa", e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition resize-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                        />
                    </div>

                    {/* Sinais Vitais */}
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
                        {/* FC */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="fc"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Freq. Cardíaca (FC)
                            </label>
                            <div className="relative">
                                <input
                                    id="fc"
                                    type="number"
                                    min={0}
                                    placeholder="Ex: 36"
                                    value={form.fc}
                                    onChange={(e) =>
                                        update("fc", e.target.value)
                                    }
                                    className={`${inputClass} pr-14`}
                                />
                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400">
                                    bpm
                                </span>
                            </div>
                        </div>

                        {/* FR */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="fr"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Freq. Respiratória (FR)
                            </label>
                            <div className="relative">
                                <input
                                    id="fr"
                                    type="number"
                                    min={0}
                                    placeholder="Ex: 12"
                                    value={form.fr}
                                    onChange={(e) =>
                                        update("fr", e.target.value)
                                    }
                                    className={`${inputClass} pr-16`}
                                />
                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400">
                                    mpm
                                </span>
                            </div>
                        </div>

                        {/* Temperatura */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="temperatura"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Temperatura
                            </label>
                            <div className="relative">
                                <input
                                    id="temperatura"
                                    type="number"
                                    min={30}
                                    max={45}
                                    step={0.1}
                                    placeholder="Ex: 37.5"
                                    value={form.temperatura}
                                    onChange={(e) =>
                                        update("temperatura", e.target.value)
                                    }
                                    className={`${inputClass} pr-12`}
                                />
                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400">
                                    °C
                                </span>
                            </div>
                        </div>

                        {/* Mucosas */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="mucosas"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Mucosas
                            </label>
                            <select
                                id="mucosas"
                                value={form.mucosas}
                                onChange={(e) =>
                                    update("mucosas", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Normocoradas</option>
                                <option>Pálidas</option>
                                <option>Congestas</option>
                                <option>Cianóticas</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 3: Diagnóstico e Tratamento ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Diagnóstico e Tratamento
                    </h2>

                    {/* Diagnóstico */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="diagnostico"
                            className="block text-sm font-semibold text-neutral-700"
                        >
                            Diagnóstico Presuntivo / Definitivo
                        </label>
                        <textarea
                            id="diagnostico"
                            rows={2}
                            placeholder="Descreva o diagnóstico…"
                            value={form.diagnostico}
                            onChange={(e) =>
                                update("diagnostico", e.target.value)
                            }
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition resize-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                        />
                    </div>

                    {/* Prescrição */}
                    <div className="space-y-1.5">
                        <label
                            htmlFor="prescricao"
                            className="block text-sm font-semibold text-neutral-700"
                        >
                            Prescrição / Medicamentos Aplicados
                        </label>
                        <textarea
                            id="prescricao"
                            rows={3}
                            placeholder="Descreva os medicamentos, doses e vias de administração (ex: Fenilbutazona 4,4 mg/kg IV)..."
                            value={form.prescricao}
                            onChange={(e) =>
                                update("prescricao", e.target.value)
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
                        Salvar Prontuário
                    </button>
                </div>
            </form>
        </div>
    );
}

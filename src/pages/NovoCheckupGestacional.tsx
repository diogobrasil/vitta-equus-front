import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

interface CheckupForm {
    fktb11idGestacao: string;
    data_hora: string;
    resultado: string;
    observacoes: string;
}

const INITIAL_STATE: CheckupForm = {
    fktb11idGestacao: "",
    data_hora: "",
    resultado: "",
    observacoes: "",
};

export default function NovoCheckupGestacional() {
    const navigate = useNavigate();

    // Mock do usuário logado (veterinário)
    const usuarioLogado = { id: 1, nome: "Dr. Carlos" };

    const [form, setForm] = useState<CheckupForm>(INITIAL_STATE);

    const update = (field: keyof CheckupForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            fktb06idVeterinario: usuarioLogado.id,
        };
        console.log("📤 Dados do Check-up Gestacional:", JSON.stringify(payload, null, 2));
        alert("Check-up salvo com sucesso! (verifique o console)");
    };

    const inputClass =
        "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";
    const disabledClass =
        "w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed outline-none";

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
                    Novo Check-up Gestacional
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Registre os ultrassons de acompanhamento (ex: 30, 45, 60 dias).
                </p>
            </div>

            {/* ── Card do Formulário ── */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* ─── Seção 1: Identificação ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Identificação
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Gestação em Andamento */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="gestacao"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Gestação em Andamento
                            </label>
                            <select
                                id="gestacao"
                                value={form.fktb11idGestacao}
                                onChange={(e) => update("fktb11idGestacao", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione a gestação…</option>
                                <option value="1">Égua Princesa - Cobertura: 10/08/2025</option>
                                <option value="2">Estrela Dalva - Cobertura: 15/09/2025</option>
                            </select>
                        </div>

                        {/* Data e Hora */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="data_hora"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Data e Hora
                            </label>
                            <input
                                id="data_hora"
                                type="datetime-local"
                                value={form.data_hora}
                                onChange={(e) => update("data_hora", e.target.value)}
                                className={inputClass}
                            />
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
                                className={disabledClass}
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Seção 2: Avaliação do Check-up ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Avaliação do Check-up
                    </h2>

                    <div className="grid grid-cols-1 gap-5">
                        {/* Resultado / Evolução */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="resultado"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Resultado / Evolução
                            </label>
                            <select
                                id="resultado"
                                value={form.resultado}
                                onChange={(e) => update("resultado", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option value="Desenvolvimento Normal">Desenvolvimento Normal</option>
                                <option value="Sem batimento">Sem batimento</option>
                                <option value="Reabsorção">Reabsorção</option>
                            </select>
                        </div>

                        {/* Observações Ultrassonográficas */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="observacoes"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Observações Ultrassonográficas
                            </label>
                            <textarea
                                id="observacoes"
                                rows={4}
                                placeholder="Laudo detalhado do ultrassom…"
                                value={form.observacoes}
                                onChange={(e) => update("observacoes", e.target.value)}
                                className={`${inputClass} resize-none`}
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
                        Salvar Check-up
                    </button>
                </div>
            </form>
        </div>
    );
}

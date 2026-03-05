import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface PartoForm {
    eguaId: string;
    dataHoraParto: string;
    tipoParto: string;
    retencaoPlacenta: string;
    condicaoNeonato: string;
    sexo: string;
    pelagem: string;
    observacoes: string;
}

const INITIAL_STATE: PartoForm = {
    eguaId: "",
    dataHoraParto: "",
    tipoParto: "",
    retencaoPlacenta: "",
    condicaoNeonato: "",
    sexo: "",
    pelagem: "",
    observacoes: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function RegistroParto() {
    const navigate = useNavigate();
    const [form, setForm] = useState<PartoForm>(INITIAL_STATE);

    const update = (field: keyof PartoForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    /** Campos do potro ficam desabilitados quando natimorto */
    const isNatimorto = form.condicaoNeonato === "Natimorto";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            sexo: isNatimorto ? "" : form.sexo,
            pelagem: isNatimorto ? "" : form.pelagem,
        };
        console.log(
            "📤 Dados do Registro de Parto:",
            JSON.stringify(payload, null, 2)
        );
        alert("Registro salvo com sucesso! (verifique o console)");
    };

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
                    Registro de Parto
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Documente o nascimento, intercorrências e dados do neonato.
                </p>
            </div>

            {/* ── Card do Formulário ── */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* ─── Seção 1: Dados da Gestação ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Dados da Gestação
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Égua */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="egua"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Égua (Mãe)
                            </label>
                            <select
                                id="egua"
                                value={form.eguaId}
                                onChange={(e) => update("eguaId", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione a égua…</option>
                                <option value="1">
                                    Estrela Dalva (Gestação: 330 dias)
                                </option>
                            </select>
                        </div>

                        {/* Data e Hora do Parto */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="dataHoraParto"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Data e Hora do Parto
                            </label>
                            <input
                                id="dataHoraParto"
                                type="datetime-local"
                                value={form.dataHoraParto}
                                onChange={(e) =>
                                    update("dataHoraParto", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Seção 2: Detalhes do Parto ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Detalhes do Parto
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Tipo de Parto */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="tipoParto"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Tipo de Parto
                            </label>
                            <select
                                id="tipoParto"
                                value={form.tipoParto}
                                onChange={(e) =>
                                    update("tipoParto", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Normal (Eutócico)</option>
                                <option>Distócico (Complicado)</option>
                                <option>Cesariana</option>
                            </select>
                        </div>

                        {/* Retenção de Placenta */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="retencaoPlacenta"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Retenção de Placenta
                            </label>
                            <select
                                id="retencaoPlacenta"
                                value={form.retencaoPlacenta}
                                onChange={(e) =>
                                    update("retencaoPlacenta", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Não (Expulsão normal)</option>
                                <option>Sim (Requer intervenção)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 3: Dados do Recém-Nascido ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Dados do Potro
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {/* Condição do Neonato */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="condicaoNeonato"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Condição do Neonato
                            </label>
                            <select
                                id="condicaoNeonato"
                                value={form.condicaoNeonato}
                                onChange={(e) => {
                                    update("condicaoNeonato", e.target.value);
                                    if (e.target.value === "Natimorto") {
                                        update("sexo", "");
                                        update("pelagem", "");
                                    }
                                }}
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Vivo e Saudável</option>
                                <option>Vivo com Debilidade</option>
                                <option>Natimorto</option>
                            </select>
                        </div>

                        {/* Sexo */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="sexo"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Sexo{" "}
                                {isNatimorto && (
                                    <span className="font-normal text-neutral-400">
                                        (N/A)
                                    </span>
                                )}
                            </label>
                            <select
                                id="sexo"
                                value={isNatimorto ? "" : form.sexo}
                                onChange={(e) => update("sexo", e.target.value)}
                                disabled={isNatimorto}
                                className={isNatimorto ? disabledClass : inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Macho</option>
                                <option>Fêmea</option>
                            </select>
                        </div>

                        {/* Pelagem */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="pelagem"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Pelagem Inicial{" "}
                                {isNatimorto && (
                                    <span className="font-normal text-neutral-400">
                                        (N/A)
                                    </span>
                                )}
                            </label>
                            <select
                                id="pelagem"
                                value={isNatimorto ? "" : form.pelagem}
                                onChange={(e) =>
                                    update("pelagem", e.target.value)
                                }
                                disabled={isNatimorto}
                                className={isNatimorto ? disabledClass : inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Alazão</option>
                                <option>Castanho</option>
                                <option>Tordilho</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 4: Conduta e Observações ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Conduta e Observações
                    </h2>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="obs"
                            className="block text-sm font-semibold text-neutral-700"
                        >
                            Intercorrências / Observações Clínicas
                        </label>
                        <textarea
                            id="obs"
                            rows={4}
                            placeholder="Ex: Cura do umbigo realizada, mamou colostro em 2 horas…"
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
                        Salvar Registro
                    </button>
                </div>
            </form>
        </div>
    );
}

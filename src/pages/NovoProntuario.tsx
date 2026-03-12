import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface MedicacaoAplicada {
    id: string; // ID temporário para o React renderizar a lista
    insumoId: string;
    dose: string;
    viaAdministracao: string;
    observacao: string;
}

interface ProntuarioForm {
    animalId: string;
    propriedadeId: string;
    veterinarioId: string;
    dataHora: string;
    tipoAtendimento: string;
    queixa: string;
    diagnostico: string;
    conduta: string;
}

const INITIAL_FORM: ProntuarioForm = {
    animalId: "",
    propriedadeId: "",
    veterinarioId: "",
    dataHora: "",
    tipoAtendimento: "",
    queixa: "",
    diagnostico: "",
    conduta: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function NovoProntuario() {
    const navigate = useNavigate();
    const [form, setForm] = useState<ProntuarioForm>(INITIAL_FORM);
    const [medicacoes, setMedicacoes] = useState<MedicacaoAplicada[]>([]);

    const updateForm = (field: keyof ProntuarioForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleAddMedicacao = () => {
        setMedicacoes((prev) => [
            ...prev,
            {
                id: crypto.randomUUID(),
                insumoId: "",
                dose: "",
                viaAdministracao: "",
                observacao: "",
            },
        ]);
    };

    const handleRemoveMedicacao = (id: string) => {
        setMedicacoes((prev) => prev.filter((med) => med.id !== id));
    };

    const updateMedicacao = (id: string, field: keyof MedicacaoAplicada, value: string) => {
        setMedicacoes((prev) =>
            prev.map((med) => (med.id === id ? { ...med, [field]: value } : med))
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // payload que seria enviado para a API
        const payload = {
            ...form,
            medicacoesAplicadas: medicacoes.map(({ id, ...rest }) => rest), // Remove o UUID no payload final
        };

        console.log("📤 Dados do Prontuário Clínico:", JSON.stringify(payload, null, 2));
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
                    Registro de anamnese, diagnóstico, conduta e medicações
                    aplicadas.
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
                                onChange={(e) => updateForm("animalId", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione o animal…</option>
                                <option value="1">Campeão (Box 08)</option>
                                <option value="2">Estrela Dalva (Box 05)</option>
                            </select>
                        </div>

                        {/* Propriedade */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="propriedade"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Propriedade
                            </label>
                            <select
                                id="propriedade"
                                value={form.propriedadeId}
                                onChange={(e) => updateForm("propriedadeId", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione a propriedade…</option>
                                <option value="1">Fazenda Esperança</option>
                                <option value="2">Haras Boa Vista</option>
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
                                onChange={(e) => updateForm("veterinarioId", e.target.value)}
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
                                onChange={(e) => updateForm("dataHora", e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Seção 2: Dados Clínicos ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Dados Clínicos
                    </h2>

                    <div className="space-y-5">
                        {/* Tipo de Atendimento */}
                        <div className="space-y-1.5 sm:w-1/2">
                            <label
                                htmlFor="tipoAtendimento"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Tipo de Atendimento
                            </label>
                            <select
                                id="tipoAtendimento"
                                value={form.tipoAtendimento}
                                onChange={(e) => updateForm("tipoAtendimento", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option value="clínico geral">Clínico Geral</option>
                                <option value="vacinação">Vacinação</option>
                                <option value="vermifugação">Vermifugação</option>
                                <option value="exame laboratório">Exame Laboratorial</option>
                            </select>
                        </div>

                        {/* Queixa Principal */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="queixa"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Queixa Principal
                            </label>
                            <textarea
                                id="queixa"
                                rows={3}
                                placeholder="Descreva os motivos e o histórico do atendimento..."
                                value={form.queixa}
                                onChange={(e) => updateForm("queixa", e.target.value)}
                                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition resize-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            />
                        </div>

                        {/* Diagnóstico Presuntivo */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="diagnostico"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Diagnóstico Presuntivo
                            </label>
                            <textarea
                                id="diagnostico"
                                rows={2}
                                placeholder="Descreva o diagnóstico inicial..."
                                value={form.diagnostico}
                                onChange={(e) => updateForm("diagnostico", e.target.value)}
                                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition resize-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            />
                        </div>

                        {/* Conduta */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="conduta"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Conduta
                            </label>
                            <textarea
                                id="conduta"
                                rows={2}
                                placeholder="Descreva os procedimentos realizados ou orientações..."
                                value={form.conduta}
                                onChange={(e) => updateForm("conduta", e.target.value)}
                                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition resize-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Seção 3: Medicações Aplicadas ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-brand-blue">
                            Medicações Aplicadas
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {medicacoes.map((med, index) => (
                            <div key={med.id} className="relative rounded-lg border border-neutral-200 bg-neutral-50/50 p-4">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveMedicacao(med.id)}
                                    className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full border border-red-200 bg-white text-red-500 shadow-sm transition hover:bg-red-50 hover:text-red-600"
                                    title="Remover Medicação"
                                    aria-label="Remover Medicação"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                                
                                <h3 className="mb-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                                    Medicação {index + 1}
                                </h3>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                                        <label className="block text-xs font-semibold text-neutral-700">
                                            Insumo
                                        </label>
                                        <select
                                            value={med.insumoId}
                                            onChange={(e) => updateMedicacao(med.id, "insumoId", e.target.value)}
                                            className={inputClass}
                                        >
                                            <option value="">Selecione…</option>
                                            <option value="1">Fenilbutazona</option>
                                            <option value="2">Soro Fisiológico (Ringer)</option>
                                            <option value="3">Flunixin Meglumine</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold text-neutral-700">
                                            Dose / Quantidade
                                        </label>
                                        <input
                                            type="text"
                                            value={med.dose}
                                            onChange={(e) => updateMedicacao(med.id, "dose", e.target.value)}
                                            placeholder="Ex: 10ml"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-semibold text-neutral-700">
                                            Via de Admin.
                                        </label>
                                        <select
                                            value={med.viaAdministracao}
                                            onChange={(e) => updateMedicacao(med.id, "viaAdministracao", e.target.value)}
                                            className={inputClass}
                                        >
                                            <option value="">Selecione…</option>
                                            <option value="IV">Intravenosa (IV)</option>
                                            <option value="IM">Intramuscular (IM)</option>
                                            <option value="Oral">Oral</option>
                                            <option value="SC">Subcutânea (SC)</option>
                                        </select>
                                    </div>

                                    <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                                        <label className="block text-xs font-semibold text-neutral-700">
                                            Observações
                                        </label>
                                        <input
                                            type="text"
                                            value={med.observacao}
                                            onChange={(e) => updateMedicacao(med.id, "observacao", e.target.value)}
                                            placeholder="Ex: Diluído"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {medicacoes.length === 0 && (
                            <div className="py-6 text-center text-sm text-neutral-500 border-2 border-dashed border-neutral-200 rounded-lg">
                                Nenhuma medicação aplicada registrada neste atendimento.
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleAddMedicacao}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-brand-blue/30 bg-brand-blue/5 px-5 py-3 text-sm font-semibold text-brand-blue transition-colors hover:border-brand-blue/50 hover:bg-brand-blue/10"
                        >
                            <Plus className="h-4 w-4" />
                            Adicionar Medicação
                        </button>
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

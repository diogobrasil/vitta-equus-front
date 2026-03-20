import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface InsumoForm {
    nome: string;
    categoria: string;
    unidade: string;
    estoqueAtual: string;
    estoqueMinimo: string;
    validade: string;
    fornecedor: string;
    observacoes: string;
}

const INITIAL_STATE: InsumoForm = {
    nome: "",
    categoria: "",
    unidade: "",
    estoqueAtual: "",
    estoqueMinimo: "",
    validade: "",
    fornecedor: "",
    observacoes: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function NovoInsumo() {
    const navigate = useNavigate();
    const [form, setForm] = useState<InsumoForm>(INITIAL_STATE);

    const update = (field: keyof InsumoForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(
            "📤 Dados do Novo Insumo:",
            JSON.stringify(form, null, 2)
        );
        alert("Insumo cadastrado com sucesso! (verifique o console)");
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
                    Cadastrar Novo Insumo
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Registre medicamentos, hormônios, vacinas e materiais de
                    consumo.
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
                        {/* Nome */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="nome"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Nome do Insumo
                            </label>
                            <input
                                id="nome"
                                type="text"
                                placeholder="Ex: Deslorelina, Fenilbutazona…"
                                value={form.nome}
                                onChange={(e) => update("nome", e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        {/* Categoria */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="categoria"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Categoria
                            </label>
                            <select
                                id="categoria"
                                value={form.categoria}
                                onChange={(e) =>
                                    update("categoria", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Medicamento</option>
                                <option>Hormônio</option>
                                <option>Vacina</option>
                                <option>Material de Consumo</option>
                                <option>Sêmen / Palheta</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 2: Controle de Estoque ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Controle de Estoque
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {/* Unidade */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="unidade"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Unidade de Medida
                            </label>
                            <select
                                id="unidade"
                                value={form.unidade}
                                onChange={(e) =>
                                    update("unidade", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Frasco (ml)</option>
                                <option>Caixa</option>
                                <option>Unidade</option>
                                <option>Dose</option>
                            </select>
                        </div>

                        {/* Estoque Atual */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="estoqueAtual"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Estoque Atual
                            </label>
                            <input
                                id="estoqueAtual"
                                type="number"
                                min={0}
                                placeholder="Ex: 25"
                                value={form.estoqueAtual}
                                onChange={(e) =>
                                    update("estoqueAtual", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>

                        {/* Estoque Mínimo */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="estoqueMinimo"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Estoque Mínimo
                            </label>
                            <input
                                id="estoqueMinimo"
                                type="number"
                                min={0}
                                placeholder="Ex: 10"
                                value={form.estoqueMinimo}
                                onChange={(e) =>
                                    update("estoqueMinimo", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Seção 3: Validade e Fornecedor ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Validade e Fornecedor
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Validade */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="validade"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Data de Validade
                            </label>
                            <input
                                id="validade"
                                type="date"
                                value={form.validade}
                                onChange={(e) =>
                                    update("validade", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>

                        {/* Fornecedor */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="fornecedor"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Fornecedor
                            </label>
                            <select
                                id="fornecedor"
                                value={form.fornecedor}
                                onChange={(e) =>
                                    update("fornecedor", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option value="vp">VetPharma S/A</option>
                                <option value="ac">
                                    Agropecuária Central
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 4: Observações ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Observações
                    </h2>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="obs"
                            className="block text-sm font-semibold text-neutral-700"
                        >
                            Modo de Uso / Restrições de Armazenamento
                        </label>
                        <textarea
                            id="obs"
                            rows={4}
                            placeholder="Ex: Manter refrigerado entre 2ºC e 8ºC…"
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
                        Salvar Insumo
                    </button>
                </div>
            </form>
        </div>
    );
}

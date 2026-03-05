import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

type CategoriaInsumo =
    | "Medicamento"
    | "Hormônio"
    | "Vacina"
    | "Material";

type StatusEstoque = "normal" | "baixo" | "vencido";

interface InsumoSummary {
    id: number;
    nome: string;
    categoria: CategoriaInsumo;
    lote: string;
    validade: string;
    estoqueAtual: number;
    estoqueMinimo: number;
    unidade: string;
    status: StatusEstoque;
}

/* ─────────────────────── Dados mockados ─────────────────────── */

const MOCK_INSUMOS: InsumoSummary[] = [
    {
        id: 1,
        nome: "Deslorelina (Sincrorrelin®)",
        categoria: "Hormônio",
        lote: "DES-2026-001",
        validade: "15 Set 2026",
        estoqueAtual: 25,
        estoqueMinimo: 10,
        unidade: "Dose",
        status: "normal",
    },
    {
        id: 2,
        nome: "Fenilbutazona 200mg/ml",
        categoria: "Medicamento",
        lote: "FBZ-2025-114",
        validade: "30 Jun 2026",
        estoqueAtual: 4,
        estoqueMinimo: 10,
        unidade: "Frasco",
        status: "baixo",
    },
    {
        id: 3,
        nome: "Seringa Descartável 20ml",
        categoria: "Material",
        lote: "SER-2026-050",
        validade: "01 Mar 2028",
        estoqueAtual: 150,
        estoqueMinimo: 50,
        unidade: "Unidade",
        status: "normal",
    },
    {
        id: 4,
        nome: "Vacina Antitetânica Equina",
        categoria: "Vacina",
        lote: "VAT-2024-089",
        validade: "10 Jan 2026",
        estoqueAtual: 8,
        estoqueMinimo: 5,
        unidade: "Dose",
        status: "vencido",
    },
];

/* ─────────────────────── Helpers visuais ─────────────────────── */

const STATUS_BADGE: Record<StatusEstoque, string> = {
    normal: "bg-brand-green/20 text-green-800",
    baixo: "bg-amber-100 text-amber-700",
    vencido: "bg-red-100 text-red-700",
};

const STATUS_LABEL: Record<StatusEstoque, string> = {
    normal: "Estoque Normal",
    baixo: "Estoque Baixo",
    vencido: "Vencido",
};

const CATEGORIA_BADGE: Record<CategoriaInsumo, string> = {
    Medicamento: "bg-blue-100 text-blue-700",
    "Hormônio": "bg-purple-100 text-purple-700",
    Vacina: "bg-emerald-100 text-emerald-700",
    Material: "bg-neutral-100 text-neutral-600",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function EstoqueFarmacia() {
    const navigate = useNavigate();
    const [busca, setBusca] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("Todas");
    const [filtroStatus, setFiltroStatus] = useState("Todos");

    const insumosFiltrados = MOCK_INSUMOS.filter((item) => {
        const matchBusca =
            busca === "" ||
            item.nome.toLowerCase().includes(busca.toLowerCase());

        const matchCategoria =
            filtroCategoria === "Todas" ||
            item.categoria === filtroCategoria ||
            (filtroCategoria === "Hormônios/Reprodução" &&
                item.categoria === "Hormônio") ||
            (filtroCategoria === "Materiais" &&
                item.categoria === "Material") ||
            (filtroCategoria === "Medicamentos" &&
                item.categoria === "Medicamento") ||
            (filtroCategoria === "Vacinas" && item.categoria === "Vacina");

        const matchStatus =
            filtroStatus === "Todos" ||
            STATUS_LABEL[item.status] === filtroStatus;

        return matchBusca && matchCategoria && matchStatus;
    });

    const inputClass =
        "rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";

    return (
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* ── Cabeçalho ── */}
            <div className="flex flex-col gap-4 border-b border-neutral-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold text-brand-blue sm:text-2xl">
                        Farmácia e Estoque
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Controle de medicamentos, hormônios e materiais de consumo.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => navigate("/farmacia/novo")}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]"
                >
                    <Plus className="h-4 w-4" />
                    Novo Insumo
                </button>
            </div>

            {/* ── Barra de ferramentas ── */}
            <div className="flex flex-col gap-3 border-b border-neutral-100 p-6 sm:flex-row sm:items-center sm:gap-4">
                {/* Busca */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                        type="text"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        placeholder="Buscar insumo por nome..."
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                </div>

                {/* Filtro Categoria */}
                <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className={inputClass}
                >
                    <option>Todas</option>
                    <option>Medicamentos</option>
                    <option>Hormônios/Reprodução</option>
                    <option>Vacinas</option>
                    <option>Materiais</option>
                </select>

                {/* Filtro Status */}
                <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                    className={inputClass}
                >
                    <option>Todos</option>
                    <option>Estoque Normal</option>
                    <option>Estoque Baixo</option>
                    <option>Vencidos</option>
                </select>
            </div>

            {/* ── Tabela ── */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-neutral-100 bg-neutral-50 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                            <th className="px-6 py-3">Item</th>
                            <th className="px-6 py-3">Categoria</th>
                            <th className="px-6 py-3">Lote / Validade</th>
                            <th className="px-6 py-3">Estoque Atual</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {insumosFiltrados.map((item) => (
                            <tr
                                key={item.id}
                                className="transition-colors hover:bg-neutral-50"
                            >
                                {/* Item */}
                                <td className="px-6 py-4">
                                    <p className="font-semibold text-neutral-800">
                                        {item.nome}
                                    </p>
                                </td>

                                {/* Categoria */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORIA_BADGE[item.categoria]}`}
                                    >
                                        {item.categoria}
                                    </span>
                                </td>

                                {/* Lote / Validade */}
                                <td className="px-6 py-4">
                                    <p className="text-neutral-700">
                                        {item.lote}
                                    </p>
                                    <p className="text-xs text-neutral-400">
                                        Val: {item.validade}
                                    </p>
                                </td>

                                {/* Estoque */}
                                <td className="px-6 py-4">
                                    <span className="font-semibold text-neutral-800">
                                        {item.estoqueAtual}
                                    </span>
                                    <span className="text-neutral-400">
                                        {" "}
                                        / mín. {item.estoqueMinimo}{" "}
                                        {item.unidade}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[item.status]}`}
                                    >
                                        {STATUS_LABEL[item.status]}
                                    </span>
                                </td>

                                {/* Ações */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            type="button"
                                            aria-label="Editar"
                                            title="Editar"
                                            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-brand-blue"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Entrada de estoque"
                                            title="Entrada de Estoque"
                                            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-brand-green"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {insumosFiltrados.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-12 text-center text-sm text-neutral-400"
                                >
                                    Nenhum insumo encontrado com os filtros
                                    selecionados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

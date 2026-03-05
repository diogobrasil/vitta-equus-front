import { useState } from "react";
import { Search, Eye, Edit, Plus, Mars, Venus } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

type Categoria = "Garanhão" | "Égua" | "Potro" | "Receptora";
type Sexo = "M" | "F";
type StatusAnimal = "ativo" | "vendido" | "óbito";

interface Animal {
    id: number;
    identificacao: string;
    nome: string;
    categoria: Categoria;
    sexo: Sexo;
    raca: string;
    pelagem: string;
    status: StatusAnimal;
}

/* ─────────────────────── Dados mockados ─────────────────────── */

const MOCK_ANIMAIS: Animal[] = [
    {
        id: 1,
        identificacao: "BRA-001-2019",
        nome: "Trovão Negro",
        categoria: "Garanhão",
        sexo: "M",
        raca: "Mangalarga Marchador",
        pelagem: "Tordilho",
        status: "ativo",
    },
    {
        id: 2,
        identificacao: "BRA-002-2020",
        nome: "Estrela Dalva",
        categoria: "Égua",
        sexo: "F",
        raca: "Quarto de Milha",
        pelagem: "Alazão",
        status: "ativo",
    },
    {
        id: 3,
        identificacao: "BRA-003-2023",
        nome: "Ventania",
        categoria: "Potro",
        sexo: "M",
        raca: "Mangalarga Marchador",
        pelagem: "Castanho",
        status: "ativo",
    },
    {
        id: 4,
        identificacao: "BRA-004-2018",
        nome: "Imperador",
        categoria: "Garanhão",
        sexo: "M",
        raca: "Lusitano",
        pelagem: "Tordilho Negro",
        status: "vendido",
    },
    {
        id: 5,
        identificacao: "BRA-005-2021",
        nome: "Aurora",
        categoria: "Receptora",
        sexo: "F",
        raca: "Quarto de Milha",
        pelagem: "Baio",
        status: "ativo",
    },
    {
        id: 6,
        identificacao: "BRA-006-2017",
        nome: "Relâmpago",
        categoria: "Garanhão",
        sexo: "M",
        raca: "Puro Sangue Inglês",
        pelagem: "Alazão",
        status: "óbito",
    },
];

/* ─────────────────────── Helpers visuais ─────────────────────── */

const STATUS_BADGE: Record<StatusAnimal, string> = {
    ativo: "bg-emerald-100 text-emerald-700",
    vendido: "bg-blue-100 text-blue-700",
    óbito: "bg-neutral-200 text-neutral-600",
};

const STATUS_LABEL: Record<StatusAnimal, string> = {
    ativo: "Ativo",
    vendido: "Vendido",
    óbito: "Óbito",
};

const AVATAR_COLORS = [
    "bg-brand-blue",
    "bg-amber-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-emerald-600",
    "bg-violet-500",
];

/* ─────────────────────── Componente ─────────────────────── */

export default function Plantel() {
    const [busca, setBusca] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("Todos");
    const [filtroStatus, setFiltroStatus] = useState("Todos");

    const animaisFiltrados = MOCK_ANIMAIS.filter((a) => {
        const matchBusca =
            busca === "" ||
            a.nome.toLowerCase().includes(busca.toLowerCase()) ||
            a.identificacao.toLowerCase().includes(busca.toLowerCase());

        const matchCategoria =
            filtroCategoria === "Todos" || a.categoria === filtroCategoria;

        const matchStatus =
            filtroStatus === "Todos" || a.status === filtroStatus.toLowerCase();

        return matchBusca && matchCategoria && matchStatus;
    });

    return (
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* ── Cabeçalho ── */}
            <div className="flex flex-col gap-4 border-b border-neutral-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold text-neutral-900 sm:text-2xl">
                        Gestão de Plantel
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Controle e listagem de todos os equinos da propriedade.
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]"
                >
                    <Plus className="h-4 w-4" />
                    Cadastrar Animal
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
                        placeholder="Buscar por nome, chip ou SISBOV..."
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                </div>

                {/* Filtro Categoria */}
                <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                >
                    <option>Todos</option>
                    <option>Garanhão</option>
                    <option>Égua</option>
                    <option>Potro</option>
                    <option>Receptora</option>
                </select>

                {/* Filtro Status */}
                <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                    className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                >
                    <option>Todos</option>
                    <option>Ativo</option>
                    <option>Vendido</option>
                    <option>Óbito</option>
                </select>
            </div>

            {/* ── Tabela ── */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-neutral-100 bg-neutral-50 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                            <th className="px-6 py-3">Identificação</th>
                            <th className="px-6 py-3">Categoria / Sexo</th>
                            <th className="px-6 py-3">Raça / Pelagem</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {animaisFiltrados.map((animal, idx) => (
                            <tr
                                key={animal.id}
                                className="transition-colors hover:bg-neutral-50"
                            >
                                {/* Identificação */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white select-none ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                                        >
                                            {animal.nome
                                                .split(" ")
                                                .map((w) => w[0])
                                                .join("")
                                                .slice(0, 2)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-neutral-800">
                                                {animal.nome}
                                            </p>
                                            <p className="text-xs text-neutral-400">
                                                {animal.identificacao}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Categoria / Sexo */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-neutral-700">{animal.categoria}</span>
                                        {animal.sexo === "M" ? (
                                            <Mars className="h-4 w-4 text-blue-500" />
                                        ) : (
                                            <Venus className="h-4 w-4 text-pink-500" />
                                        )}
                                    </div>
                                </td>

                                {/* Raça / Pelagem */}
                                <td className="px-6 py-4 text-neutral-600">
                                    {animal.raca} / {animal.pelagem}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[animal.status]}`}
                                    >
                                        {STATUS_LABEL[animal.status]}
                                    </span>
                                </td>

                                {/* Ações */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            type="button"
                                            aria-label="Ver perfil"
                                            title="Ver Perfil"
                                            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-brand-blue"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Editar"
                                            title="Editar"
                                            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-brand-blue"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {animaisFiltrados.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-12 text-center text-sm text-neutral-400"
                                >
                                    Nenhum animal encontrado com os filtros selecionados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

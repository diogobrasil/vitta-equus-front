import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Eye } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface AtendimentoSummary {
    id: number;
    data: string;
    animalNome: string;
    animalBox: string;
    avatar: string;
    veterinario: string;
    queixa: string;
    propriedade: string;
}

/* ─────────────────────── Dados mockados ─────────────────────── */

const MOCK_ATENDIMENTOS: AtendimentoSummary[] = [
    {
        id: 1,
        data: "05 Mar 2026 - 10:30",
        animalNome: "Campeão",
        animalBox: "Box 08",
        avatar: "CA",
        veterinario: "Dr. Carlos",
        queixa: "Claudicação membro anterior direito",
        propriedade: "Fazenda Esperança",
    },
    {
        id: 2,
        data: "03 Mar 2026 - 14:00",
        animalNome: "Estrela Dalva",
        animalBox: "Box 05",
        avatar: "ED",
        veterinario: "Dra. Marina",
        queixa: "Cólica leve",
        propriedade: "Haras Boa VistaLTDA",
    },
    {
        id: 3,
        data: "28 Fev 2026 - 09:15",
        animalNome: "Trovão Negro",
        animalBox: "Box 12",
        avatar: "TN",
        veterinario: "Dr. Carlos",
        queixa: "Vacinação de rotina",
        propriedade: "Fazenda Esperança",
    },
    {
        id: 4,
        data: "20 Fev 2026 - 16:45",
        animalNome: "Eclipse",
        animalBox: "Box 22",
        avatar: "EC",
        veterinario: "Dr. Carlos",
        queixa: "Síndrome cólica grave — encaminhado para cirurgia",
        propriedade: "Haras Boa VistaLTDA",
    },
    {
        id: 5,
        data: "15 Fev 2026 - 08:00",
        animalNome: "Ventania",
        animalBox: "Box 08",
        avatar: "VE",
        veterinario: "Dra. Marina",
        queixa: "Ferida lacerante no membro posterior esquerdo",
        propriedade: "Fazenda Esperança",
    },
];

/* ─────────────────────── Helpers visuais ─────────────────────── */

const AVATAR_COLORS = [
    "bg-brand-blue",
    "bg-amber-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-emerald-600",
];

/* ─────────────────────── Componente ─────────────────────── */

export default function ProntuariosClinicos() {
    const navigate = useNavigate();
    const [busca, setBusca] = useState("");
    const [propriedadeFiltro, setPropriedadeFiltro] = useState("Todas");
    const [filtroPeriodo, setFiltroPeriodo] = useState("Todos");

    const atendimentosFiltrados = MOCK_ATENDIMENTOS.filter((a) => {
        const matchBusca =
            busca === "" ||
            a.animalNome.toLowerCase().includes(busca.toLowerCase()) ||
            a.veterinario.toLowerCase().includes(busca.toLowerCase());
            
        const matchPropriedade = 
            propriedadeFiltro === "Todas" || 
            a.propriedade === propriedadeFiltro;

        // Período simplificado (mock — sem lógica real de datas)
        const matchPeriodo = filtroPeriodo !== undefined;

        return matchBusca && matchPeriodo && matchPropriedade;
    });

    const inputClass =
        "rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";

    return (
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* ── Cabeçalho ── */}
            <div className="flex flex-col gap-4 border-b border-neutral-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold text-brand-blue sm:text-2xl">
                        Prontuários Clínicos
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Gestão de atendimentos, diagnósticos e tratamentos do
                        plantel.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={propriedadeFiltro}
                        onChange={(e) => setPropriedadeFiltro(e.target.value)}
                        className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    >
                        <option value="Todas">Todas as Propriedades</option>
                        <option value="Fazenda Esperança">Fazenda Esperança</option>
                        <option value="Haras Boa VistaLTDA">Haras Boa Vista</option>
                    </select>
                    <button
                        type="button"
                        onClick={() => navigate('/clinico/novo')}
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]"
                    >
                        <Plus className="h-4 w-4" />
                        Novo Atendimento
                    </button>
                </div>
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
                        placeholder="Buscar por animal ou veterinário..."
                        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                    />
                </div>

                {/* Filtro Período */}
                <select
                    value={filtroPeriodo}
                    onChange={(e) => setFiltroPeriodo(e.target.value)}
                    className={inputClass}
                >
                    <option>Todos</option>
                    <option>Últimos 7 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Este Ano</option>
                </select>
            </div>

            {/* ── Tabela ── */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-neutral-100 bg-neutral-50 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                            <th className="px-6 py-3">Data</th>
                            <th className="px-6 py-3">Animal</th>
                            <th className="px-6 py-3">Veterinário</th>
                            <th className="px-6 py-3">Queixa Principal</th>
                            <th className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {atendimentosFiltrados.map((at, idx) => (
                            <tr
                                key={at.id}
                                className="transition-colors hover:bg-neutral-50"
                            >
                                {/* Data */}
                                <td className="whitespace-nowrap px-6 py-4 text-neutral-500">
                                    {at.data}
                                </td>

                                {/* Animal */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white select-none ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                                        >
                                            {at.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-neutral-800">
                                                {at.animalNome}
                                            </p>
                                            <p className="text-xs text-neutral-400">
                                                {at.animalBox}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Veterinário */}
                                <td className="px-6 py-4 text-neutral-700">
                                    {at.veterinario}
                                </td>

                                {/* Queixa */}
                                <td className="max-w-xs px-6 py-4 text-neutral-600 truncate">
                                    {at.queixa}
                                </td>

                                {/* Ações */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            type="button"
                                            aria-label="Ver detalhes"
                                            title="Ver Detalhes"
                                            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-brand-blue"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {atendimentosFiltrados.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-12 text-center text-sm text-neutral-400"
                                >
                                    Nenhum atendimento encontrado com os filtros
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

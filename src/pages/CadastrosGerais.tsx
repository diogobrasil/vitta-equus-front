import { useState } from "react";
import { Users, MapPin, Truck, Edit, Trash2, Plus } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

type TabKey = "proprietarios" | "propriedades" | "fornecedores";

interface ProprietarioSummary {
    id: number;
    nome: string;
    cpfCnpj: string;
    telefone: string;
    email: string;
}

interface PropriedadeSummary {
    id: number;
    nome: string;
    proprietario: string;
    cidadeUf: string;
}

interface FornecedorSummary {
    id: number;
    nomeFantasia: string;
    cnpj: string;
    categoria: string;
    telefone: string;
}

/* ─────────────────────── Dados mockados ─────────────────────── */

const PROPRIETARIOS: ProprietarioSummary[] = [
    {
        id: 1,
        nome: "João da Silva",
        cpfCnpj: "123.456.789-00",
        telefone: "(31) 99876-5432",
        email: "joao@email.com",
    },
    {
        id: 2,
        nome: "Haras Boa Vista LTDA",
        cpfCnpj: "12.345.678/0001-99",
        telefone: "(31) 3333-4444",
        email: "contato@boavista.com",
    },
];

const PROPRIEDADES: PropriedadeSummary[] = [
    {
        id: 1,
        nome: "Fazenda Esperança",
        proprietario: "João da Silva",
        cidadeUf: "Belo Horizonte / MG",
    },
    {
        id: 2,
        nome: "Centro Reprodutivo Sul",
        proprietario: "Haras Boa Vista LTDA",
        cidadeUf: "Curitiba / PR",
    },
];

const FORNECEDORES: FornecedorSummary[] = [
    {
        id: 1,
        nomeFantasia: "VetPharma S/A",
        cnpj: "98.765.432/0001-10",
        categoria: "Medicamentos",
        telefone: "(11) 4002-8922",
    },
    {
        id: 2,
        nomeFantasia: "Agropecuária Central",
        cnpj: "11.222.333/0001-44",
        categoria: "Ração e Suplementos",
        telefone: "(31) 3456-7890",
    },
];

/* ─────────────────────── Config de abas ─────────────────────── */

const TABS: { key: TabKey; label: string; icon: React.ReactNode; btnLabel: string }[] = [
    {
        key: "proprietarios",
        label: "Proprietários",
        icon: <Users className="h-4 w-4" />,
        btnLabel: "Novo Proprietário",
    },
    {
        key: "propriedades",
        label: "Propriedades",
        icon: <MapPin className="h-4 w-4" />,
        btnLabel: "Nova Propriedade",
    },
    {
        key: "fornecedores",
        label: "Fornecedores",
        icon: <Truck className="h-4 w-4" />,
        btnLabel: "Novo Fornecedor",
    },
];

/* ─────────────────────── Componente ─────────────────────── */

export default function CadastrosGerais() {
    const [activeTab, setActiveTab] = useState<TabKey>("proprietarios");

    const currentTab = TABS.find((t) => t.key === activeTab)!;

    return (
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            {/* ── Cabeçalho ── */}
            <div className="flex flex-col gap-4 border-b border-neutral-100 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl font-bold text-brand-blue sm:text-2xl">
                        Cadastros Gerais
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Gerenciamento de proprietários, propriedades e
                        fornecedores parceiros.
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]"
                >
                    <Plus className="h-4 w-4" />
                    {currentTab.btnLabel}
                </button>
            </div>

            {/* ── Abas ── */}
            <div className="flex border-b border-neutral-200">
                {TABS.map((tab) => {
                    const isActive = tab.key === activeTab;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-colors ${isActive
                                    ? "border-b-2 border-brand-blue text-brand-blue"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* ── Conteúdo dinâmico ── */}
            <div className="overflow-x-auto">
                {activeTab === "proprietarios" && renderProprietariosTable()}
                {activeTab === "propriedades" && renderPropriedadesTable()}
                {activeTab === "fornecedores" && renderFornecedoresTable()}
            </div>
        </div>
    );
}

/* ─────────────────────── Tabelas auxiliares ─────────────────────── */

function ActionButtons() {
    return (
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
                aria-label="Excluir"
                title="Excluir"
                className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}

function renderProprietariosTable() {
    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    <th className="px-6 py-3">Nome / Razão Social</th>
                    <th className="px-6 py-3">CPF / CNPJ</th>
                    <th className="px-6 py-3">Telefone</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3 text-right">Ações</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
                {PROPRIETARIOS.map((p) => (
                    <tr
                        key={p.id}
                        className="transition-colors hover:bg-neutral-50"
                    >
                        <td className="px-6 py-4 font-semibold text-neutral-800">
                            {p.nome}
                        </td>
                        <td className="px-6 py-4 text-neutral-600">
                            {p.cpfCnpj}
                        </td>
                        <td className="px-6 py-4 text-neutral-600">
                            {p.telefone}
                        </td>
                        <td className="px-6 py-4 text-neutral-600">
                            {p.email}
                        </td>
                        <td className="px-6 py-4">
                            <ActionButtons />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function renderPropriedadesTable() {
    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    <th className="px-6 py-3">Nome da Propriedade</th>
                    <th className="px-6 py-3">Proprietário Responsável</th>
                    <th className="px-6 py-3">Cidade / UF</th>
                    <th className="px-6 py-3 text-right">Ações</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
                {PROPRIEDADES.map((p) => (
                    <tr
                        key={p.id}
                        className="transition-colors hover:bg-neutral-50"
                    >
                        <td className="px-6 py-4 font-semibold text-neutral-800">
                            {p.nome}
                        </td>
                        <td className="px-6 py-4 text-neutral-600">
                            {p.proprietario}
                        </td>
                        <td className="px-6 py-4 text-neutral-600">
                            {p.cidadeUf}
                        </td>
                        <td className="px-6 py-4">
                            <ActionButtons />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function renderFornecedoresTable() {
    return (
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    <th className="px-6 py-3">Nome Fantasia</th>
                    <th className="px-6 py-3">CNPJ</th>
                    <th className="px-6 py-3">Categoria</th>
                    <th className="px-6 py-3">Telefone</th>
                    <th className="px-6 py-3 text-right">Ações</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
                {FORNECEDORES.map((f) => (
                    <tr
                        key={f.id}
                        className="transition-colors hover:bg-neutral-50"
                    >
                        <td className="px-6 py-4 font-semibold text-neutral-800">
                            {f.nomeFantasia}
                        </td>
                        <td className="px-6 py-4 text-neutral-600">
                            {f.cnpj}
                        </td>
                        <td className="px-6 py-4">
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                                {f.categoria}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-600">
                            {f.telefone}
                        </td>
                        <td className="px-6 py-4">
                            <ActionButtons />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

import {
    Users,
    TrendingUp,
    HeartHandshake,
    Baby,
    ChevronRight,
    Activity,
    Search,
    AlertCircle,
} from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface KPI {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    bg: string;
}

type StatusReprodutivo =
    | "vazia"
    | "acompanhamento"
    | "aguardando_dg"
    | "prenhe";

interface EguaFunil {
    id: number;
    nome: string;
    box: string;
    avatar: string;
    status: StatusReprodutivo;
    detalhe: string;
}

interface Alerta {
    id: number;
    cor: string;
    icon: React.ReactNode;
    titulo: string;
    descricao: string;
}

/* ─────────────────────── Dados mockados ─────────────────────── */

const KPIs: KPI[] = [
    {
        label: "Matrizes Ativas",
        value: 32,
        icon: <Users className="h-5 w-5 text-brand-blue" />,
        bg: "bg-brand-blue/10",
    },
    {
        label: "Taxa de Prenhez",
        value: "65%",
        icon: <TrendingUp className="h-5 w-5 text-brand-green" />,
        bg: "bg-brand-green/15",
    },
    {
        label: "Coberturas na Estação",
        value: 45,
        icon: <HeartHandshake className="h-5 w-5 text-purple-600" />,
        bg: "bg-purple-100",
    },
    {
        label: "Nascimentos Previstos",
        value: 12,
        icon: <Baby className="h-5 w-5 text-orange-600" />,
        bg: "bg-orange-100",
    },
];

const FUNIL_SECTIONS: {
    titulo: string;
    status: StatusReprodutivo;
    badge: string;
}[] = [
        {
            titulo: "Vazias (Aguardando Cio)",
            status: "vazia",
            badge: "bg-red-100 text-red-700",
        },
        {
            titulo: "Em Acompanhamento Folicular",
            status: "acompanhamento",
            badge: "bg-amber-100 text-amber-700",
        },
        {
            titulo: "Aguardando Diagnóstico (DGV)",
            status: "aguardando_dg",
            badge: "bg-blue-100 text-blue-700",
        },
        {
            titulo: "Prenhes",
            status: "prenhe",
            badge: "bg-brand-green/20 text-green-800",
        },
    ];

const EGUAS_FUNIL: EguaFunil[] = [
    {
        id: 1,
        nome: "Aurora",
        box: "Box 10",
        avatar: "AU",
        status: "vazia",
        detalhe: "Sem atividade folicular",
    },
    {
        id: 2,
        nome: "Safira",
        box: "Box 14",
        avatar: "SA",
        status: "vazia",
        detalhe: "Aguardando cio",
    },
    {
        id: 3,
        nome: "Princesa",
        box: "Box 12",
        avatar: "PR",
        status: "acompanhamento",
        detalhe: "Folículo 28mm",
    },
    {
        id: 4,
        nome: "Estrela Dalva",
        box: "Box 05",
        avatar: "ED",
        status: "acompanhamento",
        detalhe: "Folículo 35mm — Edema Grau 2",
    },
    {
        id: 5,
        nome: "Brisa",
        box: "Box 07",
        avatar: "BR",
        status: "acompanhamento",
        detalhe: "Folículo 30mm",
    },
    {
        id: 6,
        nome: "Lua Nova",
        box: "Box 03",
        avatar: "LN",
        status: "aguardando_dg",
        detalhe: "15 dias pós-cobertura",
    },
    {
        id: 7,
        nome: "Nina",
        box: "Box 18",
        avatar: "NI",
        status: "aguardando_dg",
        detalhe: "12 dias pós-cobertura",
    },
    {
        id: 8,
        nome: "Imperatriz",
        box: "Box 02",
        avatar: "IM",
        status: "prenhe",
        detalhe: "Gestação: 45 dias",
    },
    {
        id: 9,
        nome: "Ventania",
        box: "Box 08",
        avatar: "VE",
        status: "prenhe",
        detalhe: "Gestação: 335 dias",
    },
    {
        id: 10,
        nome: "Rainha",
        box: "Box 20",
        avatar: "RA",
        status: "prenhe",
        detalhe: "Gestação: 200 dias",
    },
    {
        id: 11,
        nome: "Flor do Campo",
        box: "Box 11",
        avatar: "FC",
        status: "prenhe",
        detalhe: "Gestação: 90 dias",
    },
];

const ALERTAS: Alerta[] = [
    {
        id: 1,
        cor: "border-l-orange-400",
        icon: <Activity className="h-5 w-5 text-orange-500" />,
        titulo: "Ultrassom Hoje",
        descricao: "Princesa (Box 12) — Verificação de ovulação.",
    },
    {
        id: 2,
        cor: "border-l-blue-400",
        icon: <Search className="h-5 w-5 text-blue-500" />,
        titulo: "Diagnóstico Pendente",
        descricao: "Lua Nova (Box 03) — DGV 15.",
    },
    {
        id: 3,
        cor: "border-l-red-400",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
        titulo: "Alerta de Parto",
        descricao: "Ventania (Box 08) — 335 dias de gestação.",
    },
];

/* ─────────────────────── Helpers visuais ─────────────────────── */

const AVATAR_COLORS = [
    "bg-brand-blue",
    "bg-amber-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-emerald-600",
    "bg-violet-500",
];

/* ─────────────────────── Componente ─────────────────────── */

export default function CentralReproducao() {
    return (
        <div className="space-y-8">
            {/* ── Cabeçalho ── */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-blue">
                        Central de Reprodução
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Visão geral da estação de monta e status do plantel de
                        matrizes.
                    </p>
                </div>
                <select className="rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20">
                    <option>Estação 2026/2027</option>
                    <option>Estação 2025/2026</option>
                </select>
            </div>

            {/* ── KPIs ── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {KPIs.map((kpi) => (
                    <div
                        key={kpi.label}
                        className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
                    >
                        <div
                            className={`flex h-11 w-11 items-center justify-center rounded-lg ${kpi.bg}`}
                        >
                            {kpi.icon}
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">
                                {kpi.label}
                            </p>
                            <p className="text-2xl font-bold text-neutral-900">
                                {kpi.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Conteúdo principal ── */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* ─ Funil Reprodutivo (2/3) ─ */}
                <div className="xl:col-span-2 rounded-xl border border-neutral-200 bg-white shadow-sm">
                    <div className="border-b border-neutral-100 px-6 py-4">
                        <h2 className="text-base font-bold text-neutral-800">
                            Status Reprodutivo Atual
                        </h2>
                    </div>

                    <div className="divide-y divide-neutral-100">
                        {FUNIL_SECTIONS.map((section) => {
                            const eguas = EGUAS_FUNIL.filter(
                                (e) => e.status === section.status
                            );

                            return (
                                <div key={section.status}>
                                    {/* Header da seção */}
                                    <div className="flex items-center gap-3 bg-neutral-50/60 px-6 py-3">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${section.badge}`}
                                        >
                                            {eguas.length}
                                        </span>
                                        <span className="text-sm font-semibold text-neutral-600">
                                            {section.titulo}
                                        </span>
                                    </div>

                                    {/* Éguas da seção */}
                                    {eguas.map((egua, idx) => (
                                        <div
                                            key={egua.id}
                                            className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-neutral-50"
                                        >
                                            <div
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white select-none ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
                                            >
                                                {egua.avatar}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-neutral-800">
                                                    {egua.nome}
                                                </p>
                                                <p className="text-xs text-neutral-400 truncate">
                                                    {egua.box} —{" "}
                                                    {egua.detalhe}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                aria-label="Ver perfil"
                                                className="rounded-lg p-1.5 text-neutral-300 transition-colors hover:bg-neutral-100 hover:text-brand-blue"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─ Alertas do Dia (1/3) ─ */}
                <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
                    <div className="border-b border-neutral-100 px-6 py-4">
                        <h2 className="text-base font-bold text-neutral-800">
                            Próximas Ações e Alertas
                        </h2>
                    </div>

                    <div className="divide-y divide-neutral-100">
                        {ALERTAS.map((alerta) => (
                            <div
                                key={alerta.id}
                                className={`flex items-start gap-4 border-l-4 px-6 py-4 ${alerta.cor}`}
                            >
                                <div className="mt-0.5 shrink-0">
                                    {alerta.icon}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-neutral-800">
                                        {alerta.titulo}
                                    </p>
                                    <p className="mt-0.5 text-xs text-neutral-500 leading-relaxed">
                                        {alerta.descricao}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

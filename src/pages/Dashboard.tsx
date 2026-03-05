import {
    Plus,
    Activity,
    AlertCircle,
    CheckCircle2,
    Hash,
    ChevronRight,
    ClipboardList,
    Syringe,
    PlusSquare,
    ClipboardCopy,
} from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface Exam {
    id: number;
    horse: string;
    box: string;
    avatar: string;
    temp: string;
    status: "Normal" | "Atenção" | "Crítico";
    time: string;
}

interface QuickAction {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

interface Reminder {
    color: string;
    text: string;
    time: string;
}

/* ─────────────────────── Dados mockados ─────────────────────── */

const STATS = [
    {
        label: "Exames Hoje",
        value: 12,
        icon: <Activity className="h-5 w-5 text-amber-600" />,
        bg: "bg-amber-100",
    },
    {
        label: "Em Observação",
        value: 3,
        icon: <AlertCircle className="h-5 w-5 text-orange-600" />,
        bg: "bg-orange-100",
    },
    {
        label: "Tratados Hoje",
        value: 8,
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
        bg: "bg-emerald-100",
    },
    {
        label: "Total de Equinos",
        value: 45,
        icon: <Hash className="h-5 w-5 text-brand-blue" />,
        bg: "bg-brand-green/20",
    },
];

const EXAMS: Exam[] = [
    {
        id: 1,
        horse: "Trovão Negro",
        box: "Box 12",
        avatar: "TN",
        temp: "37.8°C",
        status: "Normal",
        time: "08:30",
    },
    {
        id: 2,
        horse: "Estrela Dalva",
        box: "Box 05",
        avatar: "ED",
        temp: "38.9°C",
        status: "Atenção",
        time: "08:15",
    },
    {
        id: 3,
        horse: "Campeão",
        box: "Box 08",
        avatar: "CA",
        temp: "37.5°C",
        status: "Normal",
        time: "07:45",
    },
    {
        id: 4,
        horse: "Eclipse",
        box: "Box 22",
        avatar: "EC",
        temp: "39.2°C",
        status: "Crítico",
        time: "07:20",
    },
];

const QUICK_ACTIONS: QuickAction[] = [
    {
        icon: <ClipboardList className="h-5 w-5 text-brand-blue" />,
        title: "Lançar Exame Diário",
        subtitle: "Registrar sinais vitais de rotina",
    },
    {
        icon: <Syringe className="h-5 w-5 text-brand-blue" />,
        title: "Aplicar Medicação",
        subtitle: "Registrar tratamento em curso",
    },
    {
        icon: <PlusSquare className="h-5 w-5 text-brand-blue" />,
        title: "Cadastrar Equino",
        subtitle: "Adicionar novo animal no haras",
    },
];

const REMINDERS: Reminder[] = [
    {
        color: "bg-orange-400",
        text: "Retorno ultrassom - Estrela Dalva",
        time: "Hoje, 14:00",
    },
    {
        color: "bg-brand-green",
        text: "Vacinação - Lote B (12 equinos)",
        time: "Hoje, 16:30",
    },
    {
        color: "bg-amber-400",
        text: "Revisão de hemograma - Trovão Negro",
        time: "Amanhã, 09:00",
    },
];

/* ─────────────────────── Helpers de badge ─────────────────────── */

const STATUS_STYLES: Record<Exam["status"], string> = {
    Normal: "bg-emerald-100 text-emerald-700",
    Atenção: "bg-orange-100 text-orange-700",
    Crítico: "bg-red-100 text-red-700",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function Dashboard() {
    return (
        <div className="space-y-8">
            {/* ── Cabeçalho da página ── */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">
                        Bom dia, Dr. Carlos!
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Aqui está o resumo das atividades clínicas do haras hoje.
                    </p>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]"
                >
                    <Plus className="h-4 w-4" />
                    Novo Exame Diário
                </button>
            </div>

            {/* ── Cards de estatísticas ── */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STATS.map((s) => (
                    <div
                        key={s.label}
                        className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
                    >
                        <div
                            className={`flex h-11 w-11 items-center justify-center rounded-lg ${s.bg}`}
                        >
                            {s.icon}
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">{s.label}</p>
                            <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Conteúdo principal: tabela + cards laterais ── */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* Tabela (2/3) */}
                <div className="xl:col-span-2 rounded-xl border border-neutral-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
                        <h2 className="text-base font-bold text-neutral-800">
                            Últimos Exames Diários
                        </h2>
                        <button
                            type="button"
                            className="text-sm font-medium text-brand-blue hover:text-brand-blue/80 transition-colors"
                        >
                            Ver todos
                        </button>
                    </div>

                    {/* Cabeçalho da tabela */}
                    <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        <span>Cavalo</span>
                        <span>Temp.</span>
                        <span>Status</span>
                        <span>Horário</span>
                        <span className="w-8" />
                    </div>

                    {/* Linhas */}
                    {EXAMS.map((e) => (
                        <div
                            key={e.id}
                            className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] items-center gap-2 border-t border-neutral-100 px-6 py-4 hover:bg-neutral-50 transition-colors"
                        >
                            {/* Cavalo */}
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 shrink-0 rounded-full bg-brand-blue flex items-center justify-center text-xs font-bold text-white select-none">
                                    {e.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-neutral-800">
                                        {e.horse}
                                    </p>
                                    <p className="text-xs text-neutral-400">{e.box}</p>
                                </div>
                            </div>

                            {/* Temp */}
                            <p className="text-sm text-neutral-700">{e.temp}</p>

                            {/* Status badge */}
                            <span
                                className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[e.status]}`}
                            >
                                {e.status}
                            </span>

                            {/* Horário */}
                            <p className="text-sm text-neutral-500">{e.time}</p>

                            {/* Ação */}
                            <button
                                type="button"
                                aria-label="Ver prontuário"
                                className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                            >
                                <ClipboardCopy className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Coluna lateral (1/3) */}
                <div className="flex flex-col gap-6">
                    {/* Ações Rápidas */}
                    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <h2 className="border-b border-neutral-100 px-6 py-4 text-base font-bold text-neutral-800">
                            Ações Rápidas
                        </h2>
                        <div className="divide-y divide-neutral-100">
                            {QUICK_ACTIONS.map((a) => (
                                <button
                                    key={a.title}
                                    type="button"
                                    className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-neutral-50"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/20">
                                        {a.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-neutral-800">
                                            {a.title}
                                        </p>
                                        <p className="text-xs text-neutral-400">{a.subtitle}</p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 shrink-0 text-neutral-300" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lembretes */}
                    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
                        <h2 className="border-b border-neutral-100 px-6 py-4 text-base font-bold text-neutral-800">
                            Lembretes
                        </h2>
                        <div className="divide-y divide-neutral-100">
                            {REMINDERS.map((r) => (
                                <div
                                    key={r.text}
                                    className="flex items-start gap-3 px-6 py-4"
                                >
                                    <span
                                        className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${r.color}`}
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-neutral-700">
                                            {r.text}
                                        </p>
                                        <p className="text-xs text-neutral-400">{r.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

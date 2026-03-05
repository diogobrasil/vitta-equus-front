import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Edit,
    HeartPulse,
    Stethoscope,
    Baby,
    Tag,
    Users,
    Palette,
    MapPin,
    Plus,
    HeartHandshake,
} from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

type StatusAnimal = "ativo" | "vendido" | "óbito";
type EventType = "reprodutivo" | "clinico" | "parto";

interface AnimalProfile {
    id: number;
    nome: string;
    foto: string | null;
    status: StatusAnimal;
    identificacao: string;
    categoria: string;
    sexo: string;
    raca: string;
    pelagem: string;
    proprietario: string;
}

interface TimelineEvent {
    id: number;
    tipo: EventType;
    titulo: string;
    data: string;
    descricao: string;
    detalhes?: { label: string; valor: string }[];
}

/* ─────────────────────── Dados mockados ─────────────────────── */

const ANIMAL: AnimalProfile = {
    id: 2,
    nome: "Estrela Dalva",
    foto: null,
    status: "ativo",
    identificacao: "123456789",
    categoria: "Égua",
    sexo: "Fêmea",
    raca: "Quarto de Milha",
    pelagem: "Alazã",
    proprietario: "Fazenda Boa Esperança",
};

const TIMELINE_EVENTS: TimelineEvent[] = [
    {
        id: 1,
        tipo: "reprodutivo",
        titulo: "Monitoramento Folicular",
        data: "Hoje, 09:30",
        descricao: "",
        detalhes: [
            { label: "Diâmetro Folicular", valor: "35mm" },
            { label: "Edema", valor: "Grau 2" },
            { label: "Corpo Lúteo", valor: "Ausente" },
        ],
    },
    {
        id: 2,
        tipo: "clinico",
        titulo: "Atendimento Clínico Geral",
        data: "15 Fev 2026",
        descricao:
            "Queixa: Claudicação leve. Conduta: Repouso de 3 dias.",
    },
    {
        id: 3,
        tipo: "parto",
        titulo: "Parto Normal",
        data: "10 Jan 2025",
        descricao:
            "Produto: Potro macho, 45kg. Intercorrências: Nenhuma.",
    },
];

/* ─────────────────────── Helpers visuais ─────────────────────── */

const STATUS_BADGE: Record<StatusAnimal, string> = {
    ativo: "bg-brand-green/20 text-green-800",
    vendido: "bg-blue-100 text-blue-700",
    óbito: "bg-neutral-200 text-neutral-600",
};

const STATUS_LABEL: Record<StatusAnimal, string> = {
    ativo: "Ativo",
    vendido: "Vendido",
    óbito: "Óbito",
};

const EVENT_STYLE: Record<
    EventType,
    { dot: string; icon: React.ReactNode }
> = {
    reprodutivo: {
        dot: "bg-brand-blue",
        icon: <HeartPulse className="h-4 w-4 text-white" />,
    },
    clinico: {
        dot: "bg-brand-green",
        icon: <Stethoscope className="h-4 w-4 text-white" />,
    },
    parto: {
        dot: "bg-purple-500",
        icon: <Baby className="h-4 w-4 text-white" />,
    },
};

/* ─────────────────────── Componente ─────────────────────── */

export default function PerfilAnimal() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* ── Botão Voltar ── */}
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-blue"
            >
                <ArrowLeft className="h-4 w-4" />
                Voltar
            </button>

            {/* ── Grid principal ── */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* ─── Coluna Esquerda: Card do Animal (1/3) ─── */}
                <div className="md:col-span-1">
                    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
                        {/* Cabeçalho do card */}
                        <div className="flex flex-col items-center gap-3 border-b border-neutral-100 px-6 py-8">
                            {/* Placeholder da foto */}
                            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-blue text-3xl font-bold text-white select-none">
                                {ANIMAL.nome
                                    .split(" ")
                                    .map((w) => w[0])
                                    .join("")
                                    .slice(0, 2)}
                            </div>

                            <h1 className="text-xl font-bold text-brand-blue">
                                {ANIMAL.nome}
                            </h1>

                            <span
                                className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold ${STATUS_BADGE[ANIMAL.status]}`}
                            >
                                {STATUS_LABEL[ANIMAL.status]}
                            </span>
                        </div>

                        {/* Detalhes */}
                        <ul className="divide-y divide-neutral-100 px-6">
                            <DetailRow
                                icon={<Tag className="h-4 w-4" />}
                                label="Identificação"
                                value={ANIMAL.identificacao}
                            />
                            <DetailRow
                                icon={<Users className="h-4 w-4" />}
                                label="Categoria / Sexo"
                                value={`${ANIMAL.categoria} / ${ANIMAL.sexo}`}
                            />
                            <DetailRow
                                icon={<HeartPulse className="h-4 w-4" />}
                                label="Raça"
                                value={ANIMAL.raca}
                            />
                            <DetailRow
                                icon={<Palette className="h-4 w-4" />}
                                label="Pelagem"
                                value={ANIMAL.pelagem}
                            />
                            <DetailRow
                                icon={<MapPin className="h-4 w-4" />}
                                label="Proprietário / Haras"
                                value={ANIMAL.proprietario}
                            />
                        </ul>

                        {/* Botão Editar */}
                        <div className="p-6">
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-brand-blue px-4 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white active:scale-[0.98]"
                            >
                                <Edit className="h-4 w-4" />
                                Editar Dados
                            </button>
                        </div>
                    </div>
                </div>

                {/* ─── Coluna Direita: Timeline (2/3) ─── */}
                <div className="md:col-span-2 space-y-6">
                    {/* Ações Rápidas */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/reproducao/novo-exame')}
                            className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]"
                        >
                            <Plus className="h-4 w-4" />
                            Novo Exame Reprodutivo
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-green/90 active:scale-[0.98]"
                        >
                            <Plus className="h-4 w-4" />
                            Novo Prontuário
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/reproducao/nova-cobertura')}
                            className="inline-flex items-center gap-2 rounded-lg border border-brand-blue bg-white px-5 py-2.5 text-sm font-semibold text-brand-blue shadow-sm transition hover:bg-neutral-50 active:scale-[0.98]"
                        >
                            <HeartHandshake className="h-4 w-4" />
                            Registrar Cobertura
                        </button>
                    </div>

                    {/* Título */}
                    <h2 className="text-xl font-bold text-brand-blue">
                        Histórico de Eventos
                    </h2>

                    {/* Timeline */}
                    <div className="relative pl-8 before:absolute before:left-[15px] before:top-0 before:h-full before:w-0.5 before:bg-neutral-200">
                        {TIMELINE_EVENTS.map((evt, idx) => {
                            const style = EVENT_STYLE[evt.tipo];
                            const isLast =
                                idx === TIMELINE_EVENTS.length - 1;

                            return (
                                <div
                                    key={evt.id}
                                    className={`relative ${isLast ? "" : "pb-10"}`}
                                >
                                    {/* Bolinha */}
                                    <div
                                        className={`absolute -left-8 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white ${style.dot}`}
                                    >
                                        {style.icon}
                                    </div>

                                    {/* Conteúdo */}
                                    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <h3 className="text-sm font-bold text-neutral-800">
                                                {evt.titulo}
                                            </h3>
                                            <span className="text-xs font-medium text-neutral-400">
                                                {evt.data}
                                            </span>
                                        </div>

                                        {/* Descrição textual */}
                                        {evt.descricao && (
                                            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                                                {evt.descricao}
                                            </p>
                                        )}

                                        {/* Detalhes em mini-cards */}
                                        {evt.detalhes &&
                                            evt.detalhes.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {evt.detalhes.map(
                                                        (d) => (
                                                            <div
                                                                key={
                                                                    d.label
                                                                }
                                                                className="rounded-lg bg-neutral-50 border border-neutral-100 px-3 py-2"
                                                            >
                                                                <p className="text-[11px] font-medium text-neutral-400">
                                                                    {
                                                                        d.label
                                                                    }
                                                                </p>
                                                                <p className="text-sm font-semibold text-neutral-800">
                                                                    {
                                                                        d.valor
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────── Sub-componente ─────────────────────── */

function DetailRow({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <li className="flex items-center gap-3 py-3.5">
            <span className="text-brand-blue">{icon}</span>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-neutral-400">
                    {label}
                </p>
                <p className="text-sm font-semibold text-neutral-700 truncate">
                    {value}
                </p>
            </div>
        </li>
    );
}

import { useState } from "react";
import {
    Activity,
    AlertTriangle,
    Calendar,
    PieChart
} from "lucide-react";

// Ícone SVG personalizado de cavalo (ferradura simplificada / cavalo)
const HorseIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 19v-4a9 9 0 0 1 14 0v4"/>
        <path d="M9 19v-2"/>
        <path d="M15 19v-2"/>
        <path d="M12 5v2"/>
        <path d="M12 5c-1.5 0-3 1.5-3 4v2"/>
        <path d="M12 5c1.5 0 3 1.5 3 4v2"/>
    </svg>
);

/* ─────────────────────── Componente ─────────────────────── */

export default function Dashboard() {
    const [propriedadeFiltro, setPropriedadeFiltro] = useState("Todas");

    // Mocks calculados baseados na propriedade selecionada (simulação)
    const isTodas = propriedadeFiltro === "Todas";
    const isEsperanca = propriedadeFiltro === "Fazenda Esperança";
    // const isBoaVista = propriedadeFiltro === "Haras Boa Vista"; // Implícito

    // --- Métricas KPI Dinâmicas ---
    const plantelAtivo = isTodas ? 45 : (isEsperanca ? 28 : 17);
    const matrizesTotais = isTodas ? 30 : (isEsperanca ? 20 : 10);
    const prenhes = isTodas ? 22 : (isEsperanca ? 16 : 6);
    const taxaPrenhez = Math.round((prenhes / matrizesTotais) * 100);
    const alertasEstoque = isTodas ? 3 : (isEsperanca ? 1 : 2);

    // --- Mocks Lembretes Múltiplos ---
    const lembretes = [
        {
            tipo: "reproducao",
            iconeCor: "bg-brand-green",
            texto: "Ultrassom marcado para égua Estrela Dalva (Confirmação de Prenhez 15 dias).",
            dataStr: "Hoje as 14:00",
            propriedade: "Haras Boa VistaLTDA"
        },
        {
            tipo: "clinico",
            iconeCor: "bg-amber-400",
            texto: "Revacinação Antitetânica atrasada (2 animais).",
            dataStr: "Atrasado (2 dias)",
            propriedade: "Fazenda Esperança"
        },
        {
            tipo: "parto",
            iconeCor: "bg-brand-blue",
            texto: "Previsão de parto da égua Princesa para os próximos 7 dias.",
            dataStr: "Próxima Semana",
            propriedade: "Fazenda Esperança"
        }
    ];

    const lembretesFiltrados = lembretes.filter(
        l => isTodas || l.propriedade.includes(propriedadeFiltro) || l.propriedade === propriedadeFiltro
    );

    // --- Mocks Status Reprodutivo (Funil) ---
    const eguasVazias = isTodas ? 10 : (isEsperanca ? 6 : 4);
    const emAcompanhamento = isTodas ? 8 : (isEsperanca ? 5 : 3);
    const prenhezConfirmada = prenhes; // 22, 16, 6
    const totalReprodutivo = eguasVazias + emAcompanhamento + prenhezConfirmada;

    const percent = (val: number) => `${Math.round((val / totalReprodutivo) * 100)}%`;

    return (
        <div className="space-y-8">
            {/* ── Cabeçalho da página ── */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">
                        Olá, Dr(a). Carlos Silva!
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Acompanhamento geral de indicadores de performance e operações.
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
                        <option value="Haras Boa Vista">Haras Boa Vista</option>
                    </select>
                </div>
            </div>

            {/* ── Linha de Indicadores Principais (KPIs) ── */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Plantel Ativo */}
                <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-green/20 text-brand-green">
                        <HorseIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-neutral-500">Plantel Ativo</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-neutral-900">{plantelAtivo}</p>
                        </div>
                        <p className="mt-1 text-xs text-neutral-400">Animais na propriedade selecionada</p>
                    </div>
                </div>

                {/* Taxa de Prenhez */}
                <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${taxaPrenhez >= 70 ? 'bg-emerald-100 text-emerald-600' : 'bg-brand-blue/20 text-brand-blue'}`}>
                        <Activity className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-neutral-500">Taxa de Prenhez</p>
                        <div className="flex items-baseline gap-2">
                            <p className={`text-3xl font-bold ${taxaPrenhez >= 70 ? 'text-emerald-600' : 'text-neutral-900'}`}>
                                {taxaPrenhez}%
                            </p>
                        </div>
                        <p className="mt-1 text-xs text-neutral-400">
                            {prenhes} Éguas prenhes / {matrizesTotais} Total de matrizes
                        </p>
                    </div>
                </div>

                {/* Alertas de Estoque */}
                <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-500">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-neutral-500">Alertas de Estoque</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-bold text-neutral-900">{alertasEstoque}</p>
                        </div>
                        <p className="mt-1 text-xs text-neutral-400">Insumos com estoque baixo ou vencidos</p>
                    </div>
                </div>
            </div>

            {/* ── Área Operacional (2 Colunas) ── */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                
                {/* Coluna Esquerda: Agenda e Lembretes */}
                <div className="flex flex-col rounded-xl border border-neutral-200 bg-white shadow-sm">
                    <div className="flex items-center gap-2 border-b border-neutral-100 px-6 py-4">
                        <Calendar className="h-5 w-5 text-brand-blue" />
                        <h2 className="text-lg font-bold text-neutral-800">
                            Agenda e Lembretes
                        </h2>
                    </div>
                    <div className="flex-1 p-6">
                        {lembretesFiltrados.length === 0 ? (
                            <p className="text-center text-sm text-neutral-500 py-8">
                                Nenhum lembrete para a propriedade selecionada.
                            </p>
                        ) : (
                            <ul className="space-y-6">
                                {lembretesFiltrados.map((r, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <div className="relative pt-1">
                                            <span className={`block h-3 w-3 rounded-full ${r.iconeCor} ring-4 ring-white shadow-sm`} />
                                            {/* Linha conectora vertical para a lista (se não for o último item) */}
                                            {idx !== lembretesFiltrados.length - 1 && (
                                                <div className="absolute left-[5px] top-[18px] bottom-[-24px] w-[2px] bg-neutral-100" />
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-semibold text-neutral-800 leading-snug">
                                                {r.texto}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-neutral-500">
                                                <span className="font-medium text-brand-blue">{r.dataStr}</span>
                                                <span className="truncate max-w-[150px]">{r.propriedade}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Coluna Direita: Resumo do Funil Reprodutivo */}
                <div className="flex flex-col rounded-xl border border-neutral-200 bg-white shadow-sm">
                    <div className="flex items-center gap-2 border-b border-neutral-100 px-6 py-4">
                        <PieChart className="h-5 w-5 text-brand-blue" />
                        <h2 className="text-lg font-bold text-neutral-800">
                            Status Reprodutivo Atual
                        </h2>
                    </div>
                    <div className="flex-1 p-6 space-y-6">
                        {/* Barra 1: Éguas Vazias */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-semibold text-neutral-700">
                                <span>Éguas Vazias</span>
                                <span>{eguasVazias} matrizes ({percent(eguasVazias)})</span>
                            </div>
                            <div className="h-4 w-full overflow-hidden rounded-full bg-neutral-100">
                                <div 
                                    className="h-full bg-neutral-400 transition-all duration-500" 
                                    style={{ width: percent(eguasVazias) }}
                                />
                            </div>
                        </div>

                        {/* Barra 2: Em Acompanhamento */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-semibold text-neutral-700">
                                <span>Em Acompanhamento (Inseminadas)</span>
                                <span>{emAcompanhamento} matrizes ({percent(emAcompanhamento)})</span>
                            </div>
                            <div className="h-4 w-full overflow-hidden rounded-full bg-neutral-100">
                                <div 
                                    className="h-full bg-brand-blue transition-all duration-500" 
                                    style={{ width: percent(emAcompanhamento) }}
                                />
                            </div>
                        </div>

                        {/* Barra 3: Prenhez Confirmada */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-semibold text-neutral-700">
                                <span>Prenhez Confirmada</span>
                                <span>{prenhezConfirmada} matrizes ({percent(prenhezConfirmada)})</span>
                            </div>
                            <div className="h-4 w-full overflow-hidden rounded-full bg-neutral-100">
                                <div 
                                    className="h-full bg-brand-green transition-all duration-500" 
                                    style={{ width: percent(prenhezConfirmada) }}
                                />
                            </div>
                        </div>
                        
                        {/* Rodapé Resumo */}
                        <div className="pt-4 mt-6 border-t border-neutral-100">
                            <p className="text-center text-sm font-medium text-neutral-500">
                                Total Monitorado: <span className="font-bold text-neutral-800">{totalReprodutivo}</span> Receptores/Matrizes
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

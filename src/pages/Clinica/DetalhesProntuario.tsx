import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Syringe, Printer } from "lucide-react";

/* ─────────────────────── Mock Data ─────────────────────── */

const MOCK_PRONTUARIO = {
    id: 1,
    dataHora: "05/03/2026 10:30",
    animalNome: "Campeão",
    animalBox: "Box 08",
    propriedade: "Fazenda Esperança",
    veterinario: "Dr. Carlos Silva",
    tipoAtendimento: "Clínico Geral",
    queixa: "Animal apresentou claudicação severa no membro anterior direito após o treino matinal. Proprietário relatou que o animal estava relutante em apoiar o peso na pata.",
    diagnostico: "Suspeita de tendinite no tendão flexor digital superficial (TFDS). Radiografias descartaram fraturas. Espessamento palpável na região.",
    conduta: "Repouso absoluto em baia por 15 dias. Ducha fria no local por 20 min, 2x ao dia. Bandagem compressiva. Reavaliação ultrassonográfica em 7 dias.",
    medicacoes: [
        {
            id: "m1",
            insumo: "Fenilbutazona 20%",
            dose: "20 ml",
            viaAdministracao: "Intravenosa (IV)",
            observacao: "Aplicação lenta. Repetir a cada 24h por 3 dias"
        },
        {
            id: "m2",
            insumo: "Dexametasona",
            dose: "10 ml",
            viaAdministracao: "Intramuscular (IM)",
            observacao: "Dose única"
        }
    ]
};

/* ─────────────────────── Componente ─────────────────────── */

export default function DetalhesProntuario() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Na prática, buscaria o prontuário pelo ID usando useEffect
    // console.log("Buscando dados para o ID:", id);
    if (!id) console.log("Nenhum ID fornecido, usando mock.");
    const prontuario = MOCK_PRONTUARIO;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6">
            {/* ── Botão Voltar ── */}
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-brand-blue print:hidden"
            >
                <ArrowLeft className="h-4 w-4" />
                Voltar
            </button>

            {/* ── Cabeçalho ── */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-blue">
                        Detalhes do Prontuário Clínico
                    </h1>
                    <p className="mt-1 text-sm font-medium text-neutral-500">
                        Atendimento em <span className="font-semibold text-neutral-700">{prontuario.dataHora}</span>
                    </p>
                </div>
                <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-blue px-4 py-2 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue/5 print:hidden"
                >
                    <Printer className="h-4 w-4" />
                    Imprimir Prontuário
                </button>
            </div>

            {/* ── Card Principal ── */}
            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm print:shadow-none print:border-none">
                
                {/* ─── Seção 1: Informações Gerais ─── */}
                <div className="border-b border-neutral-200 p-6 md:p-8">
                    <h2 className="mb-6 text-lg font-semibold text-brand-blue">
                        Informações Gerais
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                Paciente (Animal)
                            </span>
                            <p className="text-base font-medium text-neutral-900">
                                {prontuario.animalNome} <span className="text-neutral-500 text-sm font-normal">({prontuario.animalBox})</span>
                            </p>
                        </div>

                        <div className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                Propriedade
                            </span>
                            <p className="text-base font-medium text-neutral-900">
                                {prontuario.propriedade}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                Veterinário Responsável
                            </span>
                            <p className="text-base font-medium text-neutral-900">
                                {prontuario.veterinario}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                                Tipo de Atendimento
                            </span>
                            <p className="text-base font-medium text-neutral-900">
                                {prontuario.tipoAtendimento}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 2: Avaliação Clínica ─── */}
                <div className="border-b border-neutral-200 p-6 md:p-8 space-y-8">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Avaliação Clínica
                    </h2>

                    <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            Queixa Principal / Histórico
                        </span>
                        <div className="rounded-lg bg-neutral-50 p-4 leading-relaxed text-neutral-700">
                            <p>{prontuario.queixa}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            Diagnóstico Presuntivo / Definitivo
                        </span>
                        <div className="rounded-lg bg-neutral-50 p-4 leading-relaxed text-neutral-700">
                            <p>{prontuario.diagnostico}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                            Conduta e Recomendações
                        </span>
                        <div className="rounded-lg bg-neutral-50 p-4 leading-relaxed text-neutral-700">
                            <p>{prontuario.conduta}</p>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 3: Medicações Administradas ─── */}
                <div className="p-6 md:p-8">
                    <div className="mb-6 flex items-center gap-2">
                        <Syringe className="h-5 w-5 text-brand-blue" />
                        <h2 className="text-lg font-semibold text-brand-blue">
                            Medicações Administradas
                        </h2>
                    </div>

                    {prontuario.medicacoes.length === 0 ? (
                        <p className="text-sm text-neutral-500 italic">
                            Nenhuma medicação registrada neste atendimento.
                        </p>
                    ) : (
                        <div className="grid gap-4">
                            {prontuario.medicacoes.map((med) => (
                                <div key={med.id} className="rounded-lg border border-neutral-200 p-4 transition hover:border-brand-blue/30">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                        <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                                            <span className="block text-xs font-semibold text-neutral-500">Insumo</span>
                                            <p className="font-medium text-neutral-900">{med.insumo}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="block text-xs font-semibold text-neutral-500">Dose</span>
                                            <p className="font-medium text-neutral-900">{med.dose}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="block text-xs font-semibold text-neutral-500">Via de Admin.</span>
                                            <p className="font-medium text-neutral-900">{med.viaAdministracao}</p>
                                        </div>
                                        <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                                            <span className="block text-xs font-semibold text-neutral-500">Observações</span>
                                            <p className="font-medium text-neutral-900">{med.observacao || "-"}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

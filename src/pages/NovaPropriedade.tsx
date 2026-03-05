import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface PropriedadeForm {
    nome: string;
    proprietario: string;
    cidadeUf: string;
    inscricao: string;
    foco: string;
}

const INITIAL: PropriedadeForm = {
    nome: "",
    proprietario: "",
    cidadeUf: "",
    inscricao: "",
    foco: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function NovaPropriedade() {
    const navigate = useNavigate();
    const [form, setForm] = useState<PropriedadeForm>(INITIAL);

    const update = (field: keyof PropriedadeForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("📤 Nova Propriedade:", JSON.stringify(form, null, 2));
        alert("Propriedade cadastrada! (verifique o console)");
    };

    const inputClass =
        "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";

    return (
        <div className="space-y-6">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-brand-blue"
            >
                <ArrowLeft className="h-4 w-4" />
                Voltar
            </button>

            <div>
                <h1 className="text-2xl font-bold text-brand-blue">
                    Cadastrar Propriedade (Haras/Fazenda)
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Registre a propriedade rural e vincule ao responsável.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-3xl rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* Seção 1: Identificação */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Identificação
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label htmlFor="nome" className="block text-sm font-semibold text-neutral-700">
                                Nome da Propriedade
                            </label>
                            <input id="nome" type="text" value={form.nome} onChange={(e) => update("nome", e.target.value)} placeholder="Ex: Fazenda Esperança" className={inputClass} />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="proprietario" className="block text-sm font-semibold text-neutral-700">
                                Proprietário Responsável
                            </label>
                            <select id="proprietario" value={form.proprietario} onChange={(e) => update("proprietario", e.target.value)} className={inputClass}>
                                <option value="">Selecione…</option>
                                <option value="1">João da Silva</option>
                                <option value="2">Haras Boa Vista LTDA</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Seção 2: Localização */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Localização
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label htmlFor="cidadeUf" className="block text-sm font-semibold text-neutral-700">
                                Cidade / UF
                            </label>
                            <input id="cidadeUf" type="text" value={form.cidadeUf} onChange={(e) => update("cidadeUf", e.target.value)} placeholder="Ex: Belo Horizonte / MG" className={inputClass} />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="inscricao" className="block text-sm font-semibold text-neutral-700">
                                Inscrição Estadual / NIRF
                            </label>
                            <input id="inscricao" type="text" value={form.inscricao} onChange={(e) => update("inscricao", e.target.value)} placeholder="Opcional" className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Seção 3: Detalhes */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Detalhes
                    </h2>
                    <div className="max-w-sm space-y-1.5">
                        <label htmlFor="foco" className="block text-sm font-semibold text-neutral-700">
                            Foco Principal
                        </label>
                        <select id="foco" value={form.foco} onChange={(e) => update("foco", e.target.value)} className={inputClass}>
                            <option value="">Selecione…</option>
                            <option>Reprodução</option>
                            <option>Treinamento</option>
                            <option>Criação</option>
                            <option>Misto</option>
                        </select>
                    </div>
                </div>

                {/* Rodapé */}
                <div className="flex items-center justify-end gap-4 bg-neutral-50 px-6 py-4 rounded-b-xl">
                    <button type="button" onClick={() => navigate(-1)} className="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100">
                        Cancelar
                    </button>
                    <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]">
                        <Save className="h-4 w-4" />
                        Salvar Propriedade
                    </button>
                </div>
            </form>
        </div>
    );
}

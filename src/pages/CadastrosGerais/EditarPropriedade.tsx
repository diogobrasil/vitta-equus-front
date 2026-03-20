import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface PropriedadeForm {
    nome: string;
    tipo_propriedade: string;
    endereco: string;
    cidade: string;
    estado: string;
    celular: string;
    email: string;
}

const INITIAL: PropriedadeForm = {
    nome: "",
    tipo_propriedade: "",
    endereco: "",
    cidade: "",
    estado: "",
    celular: "",
    email: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function EditarPropriedade() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState<PropriedadeForm>(INITIAL);

    useEffect(() => {
        // Simulação de carregamento de dados pelo ID
        if (id) {
            setForm({
                nome: "Fazenda Esperança",
                tipo_propriedade: "Fazenda",
                endereco: "Rodovia MG-10, Km 42",
                cidade: "Belo Horizonte",
                estado: "MG",
                celular: "(31) 99876-5432",
                email: "contato@fazenda.com",
            });
        }
    }, [id]);

    const update = (field: keyof PropriedadeForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("📤 Editar Propriedade:", JSON.stringify(form, null, 2));
        alert("Propriedade atualizada! (verifique o console)");
    };

    const handleDelete = () => {
        if(window.confirm("Deseja realmente excluir/inativar esta propriedade?")) {
            console.log("🗑️ Propriedade excluída:", id);
            alert("Propriedade excluída!");
            navigate(-1);
        }
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
                    Editar Propriedade
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Edite os dados da propriedade rural.
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
                            <label htmlFor="tipo_propriedade" className="block text-sm font-semibold text-neutral-700">
                                Tipo de Propriedade
                            </label>
                            <select id="tipo_propriedade" value={form.tipo_propriedade} onChange={(e) => update("tipo_propriedade", e.target.value)} className={inputClass}>
                                <option value="">Selecione…</option>
                                <option>Haras</option>
                                <option>Centro de Reprodução</option>
                                <option>Fazenda</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Seção 2: Localização */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Localização
                    </h2>
                    <div className="space-y-1.5">
                        <label htmlFor="endereco" className="block text-sm font-semibold text-neutral-700">
                            Endereço
                        </label>
                        <input id="endereco" type="text" value={form.endereco} onChange={(e) => update("endereco", e.target.value)} placeholder="Ex: Rodovia MG-10, Km 42" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label htmlFor="cidade" className="block text-sm font-semibold text-neutral-700">
                                Cidade
                            </label>
                            <input id="cidade" type="text" value={form.cidade} onChange={(e) => update("cidade", e.target.value)} placeholder="Ex: Belo Horizonte" className={inputClass} />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="estado" className="block text-sm font-semibold text-neutral-700">
                                Estado (UF)
                            </label>
                            <input id="estado" type="text" value={form.estado} onChange={(e) => update("estado", e.target.value)} placeholder="Ex: MG" className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Seção 3: Contato */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Contato
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label htmlFor="celular" className="block text-sm font-semibold text-neutral-700">
                                Celular / WhatsApp
                            </label>
                            <input id="celular" type="text" value={form.celular} onChange={(e) => update("celular", e.target.value)} placeholder="Ex: (31) 99876-5432" className={inputClass} />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-sm font-semibold text-neutral-700">
                                E-mail
                            </label>
                            <input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Ex: contato@fazenda.com" className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Rodapé */}
                <div className="flex items-center justify-between gap-4 bg-neutral-50 px-6 py-4 rounded-b-xl">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 hover:border-red-300"
                    >
                        <Trash2 className="h-4 w-4" />
                        Excluir/Inativar
                    </button>
                    
                    <div className="flex items-center gap-4">
                        <button type="button" onClick={() => navigate(-1)} className="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100">
                            Cancelar
                        </button>
                        <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]">
                            <Save className="h-4 w-4" />
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

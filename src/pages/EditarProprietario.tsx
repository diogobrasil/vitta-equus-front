import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface ProprietarioForm {
    nome: string;
    tipo_documento: string;
    nrdocumento: string;
    telefone: string;
    email: string;
}

const INITIAL: ProprietarioForm = {
    nome: "",
    tipo_documento: "",
    nrdocumento: "",
    telefone: "",
    email: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function EditarProprietario() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState<ProprietarioForm>(INITIAL);

    useEffect(() => {
        // Simulação de carregamento de dados pelo ID
        if (id) {
            setForm({
                nome: "João da Silva",
                tipo_documento: "CPF",
                nrdocumento: "123.456.789-00",
                telefone: "(31) 99876-5432",
                email: "contato@email.com",
            });
        }
    }, [id]);

    const update = (field: keyof ProprietarioForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("📤 Editar Proprietário:", JSON.stringify(form, null, 2));
        alert("Proprietário atualizado! (verifique o console)");
    };

    const handleDelete = () => {
        if(window.confirm("Deseja realmente excluir/inativar este proprietário?")) {
            console.log("🗑️ Proprietário excluído:", id);
            alert("Proprietário excluído!");
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
                    Editar Proprietário
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Edite os dados do proprietário ou responsável legal.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-3xl rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* Seção 1: Dados Principais */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Dados Principais
                    </h2>
                    <div className="space-y-1.5">
                        <label htmlFor="nome" className="block text-sm font-semibold text-neutral-700">
                            Nome Completo / Razão Social
                        </label>
                        <input id="nome" type="text" value={form.nome} onChange={(e) => update("nome", e.target.value)} placeholder="Ex: João da Silva" className={inputClass} />
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label htmlFor="tipo_documento" className="block text-sm font-semibold text-neutral-700">
                                Tipo de Documento
                            </label>
                            <select id="tipo_documento" value={form.tipo_documento} onChange={(e) => update("tipo_documento", e.target.value)} className={inputClass}>
                                <option value="">Selecione…</option>
                                <option>CPF</option>
                                <option>CNPJ</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="nrdocumento" className="block text-sm font-semibold text-neutral-700">
                                Número do Documento
                            </label>
                            <input id="nrdocumento" type="text" value={form.nrdocumento} onChange={(e) => update("nrdocumento", e.target.value)} placeholder="Ex: 123.456.789-00" className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Seção 2: Contato */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Contato
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label htmlFor="telefone" className="block text-sm font-semibold text-neutral-700">
                                Telefone / WhatsApp
                            </label>
                            <input id="telefone" type="text" value={form.telefone} onChange={(e) => update("telefone", e.target.value)} placeholder="(31) 99876-5432" className={inputClass} />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-sm font-semibold text-neutral-700">
                                E-mail
                            </label>
                            <input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="contato@email.com" className={inputClass} />
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface FornecedorForm {
    nomeFantasia: string;
    cnpj: string;
    categoria: string;
    vendedor: string;
    telefone: string;
    email: string;
}

const INITIAL: FornecedorForm = {
    nomeFantasia: "",
    cnpj: "",
    categoria: "",
    vendedor: "",
    telefone: "",
    email: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function NovoFornecedor() {
    const navigate = useNavigate();
    const [form, setForm] = useState<FornecedorForm>(INITIAL);

    const update = (field: keyof FornecedorForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("📤 Novo Fornecedor:", JSON.stringify(form, null, 2));
        alert("Fornecedor cadastrado! (verifique o console)");
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
                    Cadastrar Fornecedor
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Registre os dados do fornecedor parceiro do haras.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-3xl rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* Seção 1: Dados da Empresa */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Dados da Empresa
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label htmlFor="nomeFantasia" className="block text-sm font-semibold text-neutral-700">
                                Nome Fantasia
                            </label>
                            <input id="nomeFantasia" type="text" value={form.nomeFantasia} onChange={(e) => update("nomeFantasia", e.target.value)} placeholder="Ex: VetPharma S/A" className={inputClass} />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="cnpj" className="block text-sm font-semibold text-neutral-700">
                                CNPJ
                            </label>
                            <input id="cnpj" type="text" value={form.cnpj} onChange={(e) => update("cnpj", e.target.value)} placeholder="Ex: 12.345.678/0001-99" className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Seção 2: Categoria e Contato */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Categoria e Contato
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label htmlFor="categoria" className="block text-sm font-semibold text-neutral-700">
                                Categoria Principal
                            </label>
                            <select id="categoria" value={form.categoria} onChange={(e) => update("categoria", e.target.value)} className={inputClass}>
                                <option value="">Selecione…</option>
                                <option>Medicamentos e Farmácia</option>
                                <option>Ração e Nutrição</option>
                                <option>Materiais de Consumo</option>
                                <option>Sêmen e Genética</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="vendedor" className="block text-sm font-semibold text-neutral-700">
                                Vendedor / Representante
                            </label>
                            <input id="vendedor" type="text" value={form.vendedor} onChange={(e) => update("vendedor", e.target.value)} placeholder="Nome do contato" className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Seção 3: Comunicação */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Comunicação
                    </h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label htmlFor="telefone" className="block text-sm font-semibold text-neutral-700">
                                Telefone / WhatsApp
                            </label>
                            <input id="telefone" type="text" value={form.telefone} onChange={(e) => update("telefone", e.target.value)} placeholder="(11) 4002-8922" className={inputClass} />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-sm font-semibold text-neutral-700">
                                E-mail Comercial
                            </label>
                            <input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="vendas@empresa.com" className={inputClass} />
                        </div>
                    </div>
                </div>

                {/* Rodapé */}
                <div className="flex items-center justify-end gap-4 bg-neutral-50 px-6 py-4 rounded-b-xl">
                    <button type="button" onClick={() => navigate(-1)} className="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100">
                        Cancelar
                    </button>
                    <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]">
                        <Save className="h-4 w-4" />
                        Salvar Fornecedor
                    </button>
                </div>
            </form>
        </div>
    );
}

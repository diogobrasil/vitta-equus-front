import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Camera } from "lucide-react";

/* ─────────────────────── Tipos ─────────────────────── */

interface AnimalForm {
    nome: string;
    chip: string;
    dataNascimento: string;
    sexoCategoria: string;
    raca: string;
    pelagem: string;
    proprietario: string;
    propriedade: string;
    cuidador: string;
    idProdutor: string;
    idDoadora: string;
    status: string;
    observacoes: string;
}

const INITIAL_STATE: AnimalForm = {
    nome: "",
    chip: "",
    dataNascimento: "",
    sexoCategoria: "",
    raca: "",
    pelagem: "",
    proprietario: "",
    propriedade: "",
    cuidador: "",
    idProdutor: "",
    idDoadora: "",
    status: "Ativo",
    observacoes: "",
};

/* ─────────────────────── Componente ─────────────────────── */

export default function NovoAnimal() {
    const navigate = useNavigate();
    const [form, setForm] = useState<AnimalForm>(INITIAL_STATE);
    const [fotoPreview, setFotoPreview] = useState<string | null>(null);

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFotoPreview(URL.createObjectURL(file));
        }
    };

    const update = (field: keyof AnimalForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(
            "📤 Dados do Novo Animal:",
            JSON.stringify(form, null, 2)
        );
        alert("Animal cadastrado com sucesso! (verifique o console)");
    };

    const inputClass =
        "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";

    return (
        <div className="space-y-6">
            {/* ── Botão Voltar ── */}
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-brand-blue"
            >
                <ArrowLeft className="h-4 w-4" />
                Voltar
            </button>

            {/* ── Cabeçalho ── */}
            <div>
                <h1 className="text-2xl font-bold text-brand-blue">
                    Cadastrar Novo Equino
                </h1>
                <p className="mt-1 text-sm text-neutral-500">
                    Insira os dados de identificação, características e
                    propriedade do animal.
                </p>
            </div>

            {/* ── Avatar / Foto ── */}
            <div className="flex flex-col items-center mb-8">
                <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative overflow-hidden">
                    {fotoPreview ? (
                        <img src={fotoPreview} alt="Foto do animal" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <Camera className="w-8 h-8 text-gray-400" />
                            <span className="text-sm text-gray-500 mt-2">Adicionar Foto</span>
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
            </div>

            {/* ── Card do Formulário ── */}
            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-4xl rounded-xl border border-neutral-200 bg-white shadow-sm"
            >
                {/* ─── Seção 1: Identificação Básica ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Identificação Básica
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {/* Nome */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="nome"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Nome do Animal{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="nome"
                                type="text"
                                required
                                placeholder="Ex: Estrela Dalva"
                                value={form.nome}
                                onChange={(e) => update("nome", e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        {/* Chip */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="chip"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Nº do Chip / SISBOV
                            </label>
                            <input
                                id="chip"
                                type="text"
                                placeholder="Ex: 076 000123456789"
                                value={form.chip}
                                onChange={(e) => update("chip", e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        {/* Data de Nascimento */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="dataNascimento"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Data de Nascimento
                            </label>
                            <input
                                id="dataNascimento"
                                type="date"
                                value={form.dataNascimento}
                                onChange={(e) =>
                                    update("dataNascimento", e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Seção 2: Características Físicas ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Características Físicas
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {/* Sexo / Categoria */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="sexoCategoria"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Sexo / Categoria
                            </label>
                            <select
                                id="sexoCategoria"
                                value={form.sexoCategoria}
                                onChange={(e) =>
                                    update("sexoCategoria", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Fêmea (Égua/Doadora)</option>
                                <option>Fêmea (Receptora)</option>
                                <option>Macho (Garanhão/Produtor)</option>
                                <option>Macho (Castrado)</option>
                                <option>Potro/Potranca</option>
                            </select>
                        </div>

                        {/* Raça */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="raca"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Raça
                            </label>
                            <select
                                id="raca"
                                value={form.raca}
                                onChange={(e) => update("raca", e.target.value)}
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Quarto de Milha</option>
                                <option>Mangalarga Marchador</option>
                                <option>Crioulo</option>
                                <option>Puro Sangue Inglês (PSI)</option>
                                <option>Sem Raça Definida (SRD)</option>
                            </select>
                        </div>

                        {/* Pelagem */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="pelagem"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Pelagem
                            </label>
                            <select
                                id="pelagem"
                                value={form.pelagem}
                                onChange={(e) =>
                                    update("pelagem", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Alazã</option>
                                <option>Castanha</option>
                                <option>Tordilha</option>
                                <option>Zaina</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 3: Propriedade e Localização ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Propriedade e Localização
                    </h2>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        {/* Proprietário */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="proprietario"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Proprietário
                            </label>
                            <select
                                id="proprietario"
                                value={form.proprietario}
                                onChange={(e) =>
                                    update("proprietario", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option value="1">
                                    Haras Boa Vista LTDA
                                </option>
                                <option value="2">João da Silva</option>
                            </select>
                        </div>

                        {/* Propriedade */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="propriedade"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Propriedade / Localização Atual
                            </label>
                            <select
                                id="propriedade"
                                value={form.propriedade}
                                onChange={(e) =>
                                    update("propriedade", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option value="1">Fazenda Esperança</option>
                                <option value="2">
                                    Centro Reprodutivo Sul
                                </option>
                            </select>
                        </div>

                        {/* Cuidador Responsável */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="cuidador"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Cuidador Responsável
                            </label>
                            <select
                                id="cuidador"
                                value={form.cuidador}
                                onChange={(e) =>
                                    update("cuidador", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Carlos Silva</option>
                                <option>José Pereira</option>
                                <option>Sem cuidador vinculado</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 4: Genealogia (Pedigree) ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Genealogia (Pedigree)
                    </h2>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Pai (Produtor) */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="idProdutor"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Pai (Produtor)
                            </label>
                            <select
                                id="idProdutor"
                                value={form.idProdutor}
                                onChange={(e) =>
                                    update("idProdutor", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Trovão Negro</option>
                                <option>Campeão</option>
                                <option>Desconhecido</option>
                            </select>
                        </div>

                        {/* Mãe (Doadora/Receptora) */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="idDoadora"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Mãe (Doadora / Receptora)
                            </label>
                            <select
                                id="idDoadora"
                                value={form.idDoadora}
                                onChange={(e) =>
                                    update("idDoadora", e.target.value)
                                }
                                className={inputClass}
                            >
                                <option value="">Selecione…</option>
                                <option>Estrela Dalva</option>
                                <option>Princesa</option>
                                <option>Desconhecida</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ─── Seção 5: Status Inicial ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Status do Animal
                    </h2>

                    <div className="max-w-sm space-y-1.5">
                        <label
                            htmlFor="status"
                            className="block text-sm font-semibold text-neutral-700"
                        >
                            Status Inicial
                        </label>
                        <select
                            id="status"
                            value={form.status}
                            onChange={(e) => update("status", e.target.value)}
                            className={inputClass}
                        >
                            <option>Ativo</option>
                            <option>Inativo</option>
                            <option>Vendido</option>
                            <option>Óbito</option>
                        </select>
                    </div>
                </div>

                {/* ─── Seção 6: Observações ─── */}
                <div className="border-b border-neutral-100 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-brand-blue">
                        Observações
                    </h2>

                    <div className="space-y-1.5">
                        <label
                            htmlFor="observacoes"
                            className="block text-sm font-semibold text-neutral-700"
                        >
                            Observações Gerais
                        </label>
                        <textarea
                            id="observacoes"
                            rows={3}
                            placeholder="Marcas particulares, cicatrizes, temperamento…"
                            value={form.observacoes}
                            onChange={(e) =>
                                update("observacoes", e.target.value)
                            }
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition resize-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                        />
                    </div>
                </div>

                {/* ─── Rodapé: Ações ─── */}
                <div className="flex items-center justify-end gap-4 bg-neutral-50 px-6 py-4 rounded-b-xl">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-blue/90 active:scale-[0.98]"
                    >
                        <Save className="h-4 w-4" />
                        Salvar Animal
                    </button>
                </div>
            </form>
        </div>
    );
}

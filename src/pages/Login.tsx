import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartPulse, Eye, EyeOff } from "lucide-react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    /** Simula autenticação e redireciona para o Dashboard */
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/");
    };

    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
            {/* ─── Coluna Esquerda: Formulário ─── */}
            <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-12 lg:px-20">
                <div className="w-full max-w-md space-y-8">
                    {/* Branding */}
                    <div className="flex items-center gap-2">
                        <HeartPulse className="h-8 w-8 text-teal-600" strokeWidth={2.2} />
                        <span className="text-xl font-bold text-neutral-800 tracking-tight">
                            Vitta Equus
                        </span>
                    </div>

                    {/* Títulos */}
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
                            Acesse sua conta
                        </h1>
                        <p className="text-sm text-neutral-500">
                            Insira suas credenciais para gerenciar o haras.
                        </p>
                    </div>

                    {/* Formulário */}
                    <form className="space-y-5" onSubmit={handleLogin}>
                        {/* E-mail */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                autoComplete="email"
                                className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
                            />
                        </div>

                        {/* Senha */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-neutral-700"
                            >
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 pr-11 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30"
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Lembrar + Esqueceu */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-neutral-300 text-teal-600 focus:ring-teal-500 accent-teal-600"
                                />
                                <span className="text-neutral-600">Lembrar de mim</span>
                            </label>
                            <a
                                href="#"
                                className="font-medium text-teal-600 hover:text-teal-700 transition-colors"
                            >
                                Esqueceu a senha?
                            </a>
                        </div>

                        {/* Botão */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 active:scale-[0.98]"
                        >
                            Entrar no sistema
                        </button>
                    </form>

                    {/* Rodapé */}
                    <p className="text-center text-sm text-neutral-500">
                        Não tem uma conta?{" "}
                        <a
                            href="#"
                            className="font-medium text-teal-600 hover:text-teal-700 transition-colors"
                        >
                            Fale com o administrador
                        </a>
                    </p>
                </div>
            </div>

            {/* ─── Coluna Direita: Imagem + Citação ─── */}
            <div
                className="relative hidden md:flex md:flex-col md:justify-end bg-neutral-800 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1600&q=80')",
                }}
            >
                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                {/* Citação */}
                <div className="relative z-10 p-10 lg:p-14">
                    <blockquote className="space-y-3">
                        <p className="text-xl font-bold leading-snug text-white lg:text-2xl">
                            "A excelência no cuidado equino começa com a precisão dos dados
                            diários."
                        </p>
                        <footer className="text-sm text-white/80">
                            — Dr. Carlos, Diretor Veterinário
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}

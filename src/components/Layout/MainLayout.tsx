import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
    HeartPulse,
    LayoutGrid,
    List,
    Stethoscope,
    Package,
    Search,
    Bell,
    Database,
} from "lucide-react";

/* ─── Itens do menu lateral ─── */
interface NavItem {
    to: string;
    label: string;
    icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
    { to: "/", label: "Visão Geral", icon: <LayoutGrid className="h-5 w-5" /> },
    { to: "/plantel", label: "Plantel", icon: <List className="h-5 w-5" /> },
    {
        to: "/reproducao",
        label: "Reprodução",
        icon: <HeartPulse className="h-5 w-5" />,
    },
    {
        to: "/clinico",
        label: "Clínico",
        icon: <Stethoscope className="h-5 w-5" />,
    },
    {
        to: "/farmacia",
        label: "Estoque Farmácia",
        icon: <Package className="h-5 w-5" />,
    },
    {
        to: "/cadastros",
        label: "Cadastros",
        icon: <Database className="h-5 w-5" />,
    },
];

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-neutral-50">
            {/* ─── Overlay mobile ─── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ─── Sidebar ─── */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-40 flex w-sidebar flex-col
          bg-brand-blue transition-transform duration-200
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto
        `}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5 px-6 py-5">
                    <HeartPulse className="h-7 w-7 text-brand-green" strokeWidth={2.4} />
                    <span className="text-lg font-bold tracking-tight text-white">
                        Vitta Equus
                    </span>
                </div>

                {/* Nav links */}
                <nav className="mt-2 flex-1 space-y-1 px-3">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === "/"}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive
                                    ? "bg-brand-green text-brand-blue shadow-sm font-bold"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                                }`
                            }
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* ─── Conteúdo (Header + Main) ─── */}
            <div className="flex flex-1 flex-col min-w-0">
                {/* Header */}
                <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-neutral-200 bg-white px-4 py-3 md:px-8">
                    {/* Hamburger mobile */}
                    <button
                        type="button"
                        aria-label="Abrir menu"
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 md:hidden"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    {/* Barra de busca */}
                    <div className="relative flex-1 max-w-lg">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Buscar cavalo, prontuário..."
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-10 pr-4 text-sm text-neutral-700 placeholder:text-neutral-400 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
                        />
                    </div>

                    {/* Direita: notificações + perfil */}
                    <div className="flex items-center gap-5">
                        <button
                            type="button"
                            aria-label="Notificações"
                            className="relative rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 transition-colors"
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                2
                            </span>
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-brand-blue flex items-center justify-center text-sm font-bold text-white select-none">
                                DC
                            </div>
                            <div className="hidden sm:block leading-tight">
                                <p className="text-sm font-semibold text-neutral-800">
                                    Dr. Carlos
                                </p>
                                <p className="text-xs text-neutral-500">Diretor Veterinário</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

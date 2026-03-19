import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut, Edit2, Check, X, Bell, User, Lock, Camera } from 'lucide-react';

export default function PerfilUsuario() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Mock states
    const [isEditingBasic, setIsEditingBasic] = useState(false);
    const [isEditingSecurity, setIsEditingSecurity] = useState(false);

    // Basic Info State
    const [basicInfo, setBasicInfo] = useState({
        nome: "Dr. Carlos",
        fotoUrl: "",
        crmv: "CRMV-SP 12345",
        telefone: "(11) 99999-9999",
        especialidade: "Reprodução Equina"
    });

    const [tempBasicInfo, setTempBasicInfo] = useState(basicInfo);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setTempBasicInfo(prev => ({ ...prev, fotoUrl: previewUrl }));
        }
    };

    // Security State
    const [securityInfo, setSecurityInfo] = useState({
        email: "carlos@vitaequus.com.br",
        senhaAtual: "********",
        novaSenha: "",
        confirmarSenha: ""
    });

    const [tempSecurityInfo, setTempSecurityInfo] = useState(securityInfo);

    const inputClass = "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20";

    const handleSaveBasic = () => {
        setBasicInfo(tempBasicInfo);
        setIsEditingBasic(false);
        alert("Dados pessoais atualizados com sucesso!");
    };

    const handleCancelBasic = () => {
        setTempBasicInfo(basicInfo);
        setIsEditingBasic(false);
    };

    const handleSaveSecurity = () => {
        if (tempSecurityInfo.novaSenha && tempSecurityInfo.novaSenha !== tempSecurityInfo.confirmarSenha) {
            alert("As novas senhas não conferem.");
            return;
        }
        setSecurityInfo({ ...tempSecurityInfo, novaSenha: "", confirmarSenha: "" });
        setIsEditingSecurity(false);
        alert("Dados de segurança atualizados com sucesso!");
    };

    const handleCancelSecurity = () => {
        setTempSecurityInfo({ ...securityInfo, novaSenha: "", confirmarSenha: "" });
        setIsEditingSecurity(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header Fixo */}
            <header className="sticky top-0 z-20 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-blue transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar para o Sistema
                </button>
                <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 text-sm font-semibold text-red-500 border border-red-500 rounded-lg px-4 py-2 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sair da Conta
                </button>
            </header>

            {/* Conteúdo Central */}
            <div className="flex-1 w-full max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-brand-blue">Perfil do Usuário</h1>
                    <p className="text-neutral-500 mt-1">Gerencie suas informações pessoais e credenciais de acesso.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Coluna Esquerda/Central (2 espaços) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Card 1: Informações Pessoais */}
                        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3 text-brand-blue">
                                    <div className="p-2 bg-brand-blue/10 rounded-lg">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-xl font-bold">Dados Pessoais</h2>
                                </div>
                                {!isEditingBasic ? (
                                    <button
                                        onClick={() => setIsEditingBasic(true)}
                                        className="p-2 text-gray-400 hover:bg-gray-50 hover:text-brand-blue rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <Edit2 className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCancelBasic}
                                            className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors flex items-center gap-1 text-sm font-semibold"
                                        >
                                            <X className="w-4 h-4" /> Cancelar
                                        </button>
                                        <button
                                            onClick={handleSaveBasic}
                                            className="p-2 text-brand-green hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors flex items-center gap-1 text-sm font-semibold"
                                        >
                                            <Check className="w-4 h-4" /> Salvar
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Foto do Perfil (Avatar) */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative">
                                    {(isEditingBasic ? tempBasicInfo.fotoUrl : basicInfo.fotoUrl) ? (
                                        <img 
                                            src={isEditingBasic ? tempBasicInfo.fotoUrl : basicInfo.fotoUrl} 
                                            alt="Avatar" 
                                            className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-sm object-cover" 
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-100 shadow-md flex items-center justify-center">
                                            <User className="text-gray-400 w-16 h-16" />
                                        </div>
                                    )}

                                    {isEditingBasic && (
                                        <>
                                            <button 
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-full text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                                                title="Alterar Foto"
                                            >
                                                <Camera className="w-8 h-8 mb-1" />
                                                <span className="text-xs font-semibold">Alterar</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute bottom-0 right-0 p-2.5 bg-brand-blue text-white rounded-full shadow-lg border-2 border-white hover:bg-brand-blue/90 transition-colors sm:hidden"
                                            >
                                                <Camera className="w-4 h-4" />
                                            </button>

                                            <input 
                                                type="file" 
                                                ref={fileInputRef} 
                                                className="hidden" 
                                                accept="image/*" 
                                                onChange={handlePhotoChange}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Nome */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-neutral-700">Nome Completo</label>
                                    {isEditingBasic ? (
                                        <input
                                            type="text"
                                            value={tempBasicInfo.nome}
                                            onChange={(e) => setTempBasicInfo({ ...tempBasicInfo, nome: e.target.value })}
                                            className={inputClass}
                                        />
                                    ) : (
                                        <p className="text-neutral-900 font-medium py-2.5">{basicInfo.nome}</p>
                                    )}
                                </div>
                                {/* CRMV */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-neutral-700">CRMV</label>
                                    {isEditingBasic ? (
                                        <input
                                            type="text"
                                            value={tempBasicInfo.crmv}
                                            onChange={(e) => setTempBasicInfo({ ...tempBasicInfo, crmv: e.target.value })}
                                            className={inputClass}
                                        />
                                    ) : (
                                        <p className="text-neutral-900 font-medium py-2.5">{basicInfo.crmv}</p>
                                    )}
                                </div>
                                {/* Telefone */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-neutral-700">Telefone Celular</label>
                                    {isEditingBasic ? (
                                        <input
                                            type="text"
                                            value={tempBasicInfo.telefone}
                                            onChange={(e) => setTempBasicInfo({ ...tempBasicInfo, telefone: e.target.value })}
                                            className={inputClass}
                                        />
                                    ) : (
                                        <p className="text-neutral-900 font-medium py-2.5">{basicInfo.telefone}</p>
                                    )}
                                </div>
                                {/* Especialidade */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-neutral-700">Especialidade Principal</label>
                                    {isEditingBasic ? (
                                        <input
                                            type="text"
                                            value={tempBasicInfo.especialidade}
                                            onChange={(e) => setTempBasicInfo({ ...tempBasicInfo, especialidade: e.target.value })}
                                            className={inputClass}
                                        />
                                    ) : (
                                        <p className="text-neutral-900 font-medium py-2.5">{basicInfo.especialidade}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Segurança */}
                        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3 text-brand-blue">
                                    <div className="p-2 bg-brand-blue/10 rounded-lg">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-xl font-bold">Segurança e Acesso</h2>
                                </div>
                                {!isEditingSecurity ? (
                                    <button
                                        onClick={() => setIsEditingSecurity(true)}
                                        className="text-sm font-semibold text-brand-blue hover:text-brand-blue/80 transition-colors"
                                    >
                                        Alterar Senha
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCancelSecurity}
                                            className="p-2 text-red-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors flex items-center gap-1 text-sm font-semibold"
                                        >
                                            <X className="w-4 h-4" /> Cancelar
                                        </button>
                                        <button
                                            onClick={handleSaveSecurity}
                                            className="p-2 text-brand-green hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors flex items-center gap-1 text-sm font-semibold"
                                        >
                                            <Check className="w-4 h-4" /> Salvar
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-neutral-700">Email de Acesso</label>
                                    {isEditingSecurity ? (
                                        <input
                                            type="email"
                                            value={tempSecurityInfo.email}
                                            onChange={(e) => setTempSecurityInfo({ ...tempSecurityInfo, email: e.target.value })}
                                            className={inputClass}
                                        />
                                    ) : (
                                        <p className="text-neutral-900 font-medium py-2.5">{securityInfo.email}</p>
                                    )}
                                </div>

                                {!isEditingSecurity ? (
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-semibold text-neutral-700">Senha Atual</label>
                                        <p className="text-neutral-900 font-medium py-2.5">{securityInfo.senhaAtual}</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-neutral-700">Nova Senha</label>
                                            <input
                                                type="password"
                                                value={tempSecurityInfo.novaSenha}
                                                onChange={(e) => setTempSecurityInfo({ ...tempSecurityInfo, novaSenha: e.target.value })}
                                                placeholder="Digite a nova senha"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-neutral-700">Confirmar Nova Senha</label>
                                            <input
                                                type="password"
                                                value={tempSecurityInfo.confirmarSenha}
                                                onChange={(e) => setTempSecurityInfo({ ...tempSecurityInfo, confirmarSenha: e.target.value })}
                                                placeholder="Repita a nova senha"
                                                className={inputClass}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Coluna Direita (1 espaço) */}
                    <div className="lg:col-span-1">
                        {/* Card 3: Notificações */}
                        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm sticky top-24">
                            <div className="flex items-center gap-3 text-brand-blue mb-6">
                                <div className="p-2 bg-brand-blue/10 rounded-lg">
                                    <Bell className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold">Notificações Recentes</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex gap-3">
                                    <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                                    <div>
                                        <p className="text-sm text-neutral-800 font-medium">Exame de prenhez agendado</p>
                                        <p className="text-xs text-neutral-500 mt-1">Estrela Dalva (amanhã, 08:00)</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                                    <div>
                                        <p className="text-sm text-neutral-800 font-medium">Estoque baixo</p>
                                        <p className="text-xs text-neutral-500 mt-1">Fenilbutazona (restam 2 unidades)</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex gap-3">
                                    <div className="w-2 h-2 rounded-full bg-gray-400 mt-2 shrink-0" />
                                    <div>
                                        <p className="text-sm text-neutral-800 font-medium">Relatório mensal gerado</p>
                                        <p className="text-xs text-neutral-500 mt-1">Verifique os indicadores (há 2 dias)</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2.5 text-sm font-semibold text-brand-blue hover:bg-brand-blue/5 rounded-lg transition-colors">
                                Marcar todas como lidas
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// src/pages/SettingsPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  User,
  Bell,
  Trash2,
  Key,
  Shield,
  Download,
  Eye,
  EyeOff,
  Save,
  X,
  AlertTriangle,
} from "lucide-react";
import ConfirmationModal from "../components/Modal/ConfirmationModal";

// Dados do usuário (substitua pelo seu auth/context depois)
const user = {
  name: "CiberNinja",
  email: "admin@ciberninja.com.br",
  avatar: null,
  twoFactorEnabled: false,
  lastLogin: "Hoje às 14:30",
  accountCreated: "15 Jan 2023",
};

export default function SettingsPage() {
  const navigate = useNavigate();

  // Estados
  const [notifications, setNotifications] = useState({
    email: true,
    insights: true,
    alerts: true,
    push: false,
    weeklyReport: true,
    securityAlerts: true,
  });

  const [theme] = useState("dark");
  const [language] = useState("pt");
  const [privacy] = useState({
    profileVisibility: "public",
    analyticsSharing: true,
    dataCollection: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);

  // Monitorar mudanças
  useEffect(() => {
    const hasUnsavedChanges =
      passwordData.currentPassword !== "" ||
      passwordData.newPassword !== "" ||
      passwordData.confirmPassword !== "";

    setHasChanges(hasUnsavedChanges);
  }, [passwordData, notifications, theme, language, privacy]);

  const handleSave = () => {
    setIsSaveModalOpen(true);
    setTimeout(() => {
      setIsSaveModalOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setHasChanges(false);
    }, 2000);
  };

  const handleDeleteAccount = () => setIsDeleteModalOpen(true);

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsDeletedModalOpen(true);
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000);
  };

  const handleExportData = () => {
    setIsExportModalOpen(true);
    // Simular exportação
    setTimeout(() => setIsExportModalOpen(false), 1500);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const sections = [
    { id: "general", label: "Geral", icon: User },
    { id: "notifications", label: "Notificações", icon: Bell },
    { id: "security", label: "Segurança", icon: Shield },
    { id: "danger", label: "Zona de Risco", icon: AlertTriangle },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-cyan-400" />
                Informações da Conta
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Nome
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700/50">
                  <h4 className="text-lg font-bold text-white mb-4">
                    Informações da Conta
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-700/30 rounded-xl">
                      <p className="text-gray-400 text-sm">Conta criada</p>
                      <p className="text-white font-medium">
                        {user.accountCreated}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-700/30 rounded-xl">
                      <p className="text-gray-400 text-sm">Último acesso</p>
                      <p className="text-white font-medium">{user.lastLogin}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Download className="w-6 h-6 text-emerald-400" />
                Exportar Dados
              </h3>
              <p className="text-gray-400 mb-6">
                Faça o download de todos os seus dados em formato JSON ou CSV.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleExportData}
                  className="px-6 py-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400 font-medium hover:bg-emerald-500/30 hover:border-emerald-400 transition-all"
                >
                  Exportar como JSON
                </button>
                <button
                  onClick={handleExportData}
                  className="px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 rounded-xl text-cyan-400 font-medium hover:bg-cyan-500/30 hover:border-cyan-400 transition-all"
                >
                  Exportar como CSV
                </button>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Bell className="w-6 h-6 text-yellow-400" />
              Preferências de Notificação
            </h3>
            <div className="space-y-6">
              {[
                {
                  label: "Notificações por e-mail",
                  key: "email",
                  desc: "Receba atualizações importantes por e-mail",
                },
                {
                  label: "Novos insights da IA",
                  key: "insights",
                  desc: "Alertas sobre novas análises disponíveis",
                },
                {
                  label: "Alertas críticos de desempenho",
                  key: "alerts",
                  desc: "Notificações sobre problemas críticos",
                },

                {
                  label: "Alertas de segurança",
                  key: "securityAlerts",
                  desc: "Notificações sobre atividades suspeitas",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl border border-gray-600/50 hover:border-gray-500/50 transition-all"
                >
                  <div>
                    <p className="text-white font-medium">{item.label}</p>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        [item.key]: !notifications[item.key],
                      })
                    }
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      notifications[item.key]
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                        notifications[item.key] ? "translate-x-6" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Key className="w-6 h-6 text-purple-400" />
                Alterar Senha
              </h3>
              <div className="space-y-6">
                {[
                  {
                    label: "Senha Atual",
                    key: "current",
                    value: passwordData.currentPassword,
                    placeholder: "Digite sua senha atual",
                  },
                  {
                    label: "Nova Senha",
                    key: "new",
                    value: passwordData.newPassword,
                    placeholder: "Digite sua nova senha",
                  },
                  {
                    label: "Confirmar Nova Senha",
                    key: "confirm",
                    value: passwordData.confirmPassword,
                    placeholder: "Confirme sua nova senha",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-gray-400 text-sm mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords[field.key] ? "text" : "password"}
                        value={field.value}
                        onChange={(e) =>
                          setPasswordData((prev) => ({
                            ...prev,
                            [field.key === "current"
                              ? "currentPassword"
                              : field.key === "new"
                              ? "newPassword"
                              : "confirmPassword"]: e.target.value,
                          }))
                        }
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-all pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(field.key)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPasswords[field.key] ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-6 border-t border-gray-700/50">
                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    disabled={
                      !passwordData.currentPassword ||
                      !passwordData.newPassword ||
                      !passwordData.confirmPassword
                    }
                    className="px-6 py-3 bg-purple-500/20 border border-purple-500/50 rounded-xl text-purple-400 font-medium hover:bg-purple-500/30 hover:border-purple-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Alterar Senha
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "danger":
        return (
          <div className="bg-gray-800/50 backdrop-blur-lg border border-red-500/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              Zona de Risco
            </h3>
            <div className="space-y-8">
              <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Eliminar Conta Permanentemente
                </h4>
                <p className="text-gray-300 mb-6">
                  Ao eliminar a conta, todos os seus dados, conexões, histórico
                  de análises e configurações serão permanentemente apagados.
                  Esta ação não pode ser desfeita.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 font-medium hover:bg-red-500/30 hover:border-red-400 transition-all"
                  >
                    Eliminar Conta
                  </button>
                  <button
                    onClick={handleExportData}
                    className="px-6 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-gray-300 font-medium hover:border-gray-500 transition-all"
                  >
                    Exportar Dados Primeiro
                  </button>
                </div>
              </div>

              <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <h4 className="text-lg font-bold text-white mb-4">
                  Desativar Conta Temporariamente
                </h4>
                <p className="text-gray-300 mb-6">
                  Sua conta será ocultada mas seus dados serão preservados por
                  30 dias. Após este período, os dados serão eliminados
                  permanentemente.
                </p>
                <button className="px-6 py-3 bg-amber-500/20 border border-amber-500/50 rounded-xl text-amber-400 font-medium hover:bg-amber-500/30 hover:border-amber-400 transition-all">
                  Desativar Conta
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4 animate-gradient">
              Configurações
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Gerencie sua conta, preferências e segurança no CiberNinja
              Analytics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar de Navegação */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 sticky top-6">
                <h3 className="text-lg font-bold text-white mb-6">
                  Configurações
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/50 text-cyan-400"
                            : "text-gray-400 hover:text-white hover:bg-gray-700/30"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{section.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Info do usuário */}
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="lg:col-span-3">
              {renderSection()}

              {/* Botões de ação */}
              {hasChanges && (
                <div className="mt-8 flex justify-end gap-4 animate-slide-up">
                  <button
                    onClick={() => {
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setHasChanges(false);
                    }}
                    className="px-6 py-3 border border-gray-600 rounded-xl text-gray-300 font-medium hover:border-gray-500 hover:bg-gray-700/50 transition-all flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Descartar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-white font-semibold hover:shadow-cyber transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Salvar Alterações
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modais */}
      <ConfirmationModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        title="Configurações Salvas!"
        message="Suas configurações foram atualizadas com sucesso."
        type="success"
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirmar Eliminação da Conta"
        message="Esta ação é irreversível. Todos os seus dados serão permanentemente eliminados. Tem certeza?"
        confirmText="Sim, Eliminar Conta"
        type="error"
      />

      <ConfirmationModal
        isOpen={isDeletedModalOpen}
        onClose={() => navigate("/login", { replace: true })}
        title="Conta Eliminada"
        message="Sua conta foi removida permanentemente. Redirecionando para o login..."
        type="success"
      />

      <ConfirmationModal
        isOpen={isTwoFactorModalOpen}
        onClose={() => setIsTwoFactorModalOpen(false)}
        title={user.twoFactorEnabled ? "2FA Desativado" : "2FA Ativado"}
        message={
          user.twoFactorEnabled
            ? "Autenticação de dois fatores foi desativada com sucesso."
            : "Autenticação de dois fatores foi ativada com sucesso. Configure seu aplicativo autenticador."
        }
        type="success"
      />

      <ConfirmationModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Senha Alterada"
        message="Sua senha foi atualizada com sucesso. Você será desconectado em todos os dispositivos."
        type="success"
      />

      <ConfirmationModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Exportação Iniciada"
        message="Seus dados estão sendo preparados para download. Você receberá um e-mail quando estiver pronto."
        type="info"
      />
    </DashboardLayout>
  );
}

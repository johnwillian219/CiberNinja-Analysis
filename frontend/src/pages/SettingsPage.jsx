// src/pages/SettingsPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { Link, useNavigate } from "react-router-dom"; // ← adicionado useNavigate
import { useState } from "react";
import { User, Bell, Trash2, Key } from "lucide-react";
import ConfirmationModal from "../components/Modal/ConfirmationModal";

// Função para gerar cor consistente a partir do e-mail
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

// Dados do usuário (substitua pelo seu auth/context depois)
const user = {
  name: "CiberNinja",
  email: "admin@ciberninja.com.br",
  avatar: null,
};

export default function SettingsPage() {
  const navigate = useNavigate(); // ← para redirecionar

  const [notifications, setNotifications] = useState({
    email: true,
    insights: true,
    alerts: true,
    push: false,
  });

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);

  const firstLetter = user.email.charAt(0).toUpperCase();
  const avatarBg = stringToColor(user.email);

  const handleSave = () => {
    setIsSaveModalOpen(true);
    setTimeout(() => setIsSaveModalOpen(false), 2000);
  };

  const handleDeleteAccount = () => setIsDeleteModalOpen(true);

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);

    // Simula eliminação da conta
    // Aqui você faria a chamada real à API para deletar a conta
    localStorage.removeItem("token"); // exemplo de limpeza
    localStorage.removeItem("user");

    // Mostra modal de sucesso
    setIsDeletedModalOpen(true);

    // Redireciona para login após 3 segundos
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Configurações
          </h1>
          <p className="text-gray-400 text-lg">
            Gerencie sua conta e preferências no CiberNinja Analytics
          </p>
        </div>

        {/* Perfil */}
        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <User className="w-7 h-7 text-cyan-400" />
            Perfil
          </h2>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-8">
            <div className="relative flex-shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Perfil"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-2xl"
                  style={{ backgroundColor: avatarBg }}
                >
                  {firstLetter}
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 p-[4px] -z-10">
                <div className="w-full h-full rounded-full bg-gray-900"></div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold text-white">{user.name}</h3>
              <p className="text-gray-400 text-lg">{user.email}</p>
              <Link
                to="/profile"
                className="inline-block mt-6 px-8 py-4 bg-cyan-500/20 border border-cyan-500/50 rounded-xl text-cyan-400 font-medium hover:bg-cyan-500/30 hover:border-cyan-400 transition-all"
              >
                Editar perfil
              </Link>
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Bell className="w-7 h-7 text-yellow-400" />
            Notificações
          </h2>
          <div className="space-y-6">
            {[
              { label: "Notificações por e-mail", key: "email" },
              { label: "Novos insights da IA", key: "insights" },
              { label: "Alertas críticos de desempenho", key: "alerts" },
              { label: "Notificações push no navegador", key: "push" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <p className="text-white font-medium">{item.label}</p>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      [item.key]: !notifications[item.key],
                    })
                  }
                  className={`relative w-14 h-8 rounded-full transition-all ${
                    notifications[item.key] ? "bg-emerald-500" : "bg-gray-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all ${
                      notifications[item.key] ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Segurança - Alterar senha */}
        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Key className="w-7 h-7 text-purple-400" />
            Segurança
          </h2>
          <p className="text-gray-400 mb-6">
            Mantenha a sua conta segura alterando a senha regularmente.
          </p>
          <Link
            to="/forgot-password"
            className="inline-block px-8 py-4 bg-purple-500/20 border border-purple-500/50 rounded-xl text-purple-400 font-medium hover:bg-purple-500/30 hover:border-purple-400 transition-all"
          >
            Alterar senha
          </Link>
        </div>

        {/* Eliminar conta */}
        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Trash2 className="w-7 h-7 text-red-400" />
            Eliminar conta
          </h2>
          <p className="text-gray-400 mb-8">
            Ao eliminar a conta, todos os seus dados, conexões e histórico serão
            permanentemente apagados. Esta ação não pode ser desfeita.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-8 py-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 font-medium hover:bg-red-500/30 hover:border-red-400 transition-all"
          >
            Eliminar conta permanentemente
          </button>
        </div>

        {/* Botões finais - centralizados */}
        <div className="flex justify-center gap-6">
          <button className="px-10 py-4 border border-gray-600 rounded-xl text-gray-300 font-medium hover:border-gray-500 transition-all">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            Salvar alterações
          </button>
        </div>
      </div>

      {/* Modais */}
      <ConfirmationModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        title="Alterações salvas!"
        message="As suas configurações foram atualizadas com sucesso."
        type="success"
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Tem certeza?"
        message="Esta ação é irreversível. Todos os seus dados serão permanentemente eliminados."
        confirmText="Sim, eliminar conta"
        type="danger"
      />

      <ConfirmationModal
        isOpen={isDeletedModalOpen}
        onClose={() => navigate("/login", { replace: true })}
        title="Conta eliminada"
        message="A sua conta foi permanentemente removida. Você será redirecionado para o login em alguns segundos..."
        type="success"
        autoCloseDuration={15000}
      />
    </DashboardLayout>
  );
}

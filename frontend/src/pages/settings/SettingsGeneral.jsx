// src/pages/settings/SettingsGeneral.jsx
import { User } from "lucide-react";

export default function SettingsGeneral({ user }) {
  // Proteção contra user null (nunca deve acontecer graças ao loading no SettingsPage, mas por segurança)
  if (!user) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl md:rounded-2xl p-8 text-center">
        <p className="text-gray-400 text-base">Carregando informações...</p>
      </div>
    );
  }

  // Nome exibido com prioridade correta
  const displayName = user.fullName || user.displayName || "Ciber Ninja";

  // Data de criação da conta
  const joinDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Data desconhecida";

  // Último acesso — agora real, vindo do backend
  const lastLoginFormatted = user.lastLogin
    ? new Date(user.lastLogin).toLocaleString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Nunca acessou";

  return (
    <div className="space-y-6 md:space-y-8 pb-16">
      <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl md:rounded-2xl p-4 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
          <User className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
          Informações da Conta
        </h3>

        <div className="space-y-4 md:space-y-6">
          {/* Nome e E-mail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-gray-400 text-xs md:text-sm mb-1 md:mb-2">
                Nome
              </label>
              <div className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/30 rounded-lg md:rounded-xl text-white text-sm md:text-base">
                {displayName}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs md:text-sm mb-1 md:mb-2">
                E-mail
              </label>
              <div className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/30 rounded-lg md:rounded-xl text-white text-sm md:text-base">
                {user.email || "não definido"}
              </div>
            </div>
          </div>

          {/* Datas da conta */}
          <div className="pt-4 pb-14 md:pt-6 border-t border-gray-700/50">
            <h4 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4">
              Informações da Conta
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Conta criada */}
              <div className="p-3 md:p-4 bg-gray-700/30 rounded-lg md:rounded-xl">
                <p className="text-gray-400 text-xs md:text-sm">Conta criada</p>
                <p className="text-white font-medium text-sm md:text-base">
                  {joinDate}
                </p>
              </div>

              {/* Último acesso - agora real! */}
              <div className="p-3 md:p-4 bg-gray-700/30 rounded-lg md:rounded-xl">
                <p className="text-gray-400 text-xs md:text-sm">
                  Último acesso
                </p>
                <p className="text-white font-medium text-sm md:text-base">
                  {lastLoginFormatted}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

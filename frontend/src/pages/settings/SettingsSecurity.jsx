// src/pages/settings/SettingsSecurity.jsx
import { useState } from "react";
import { Key, Eye, EyeOff } from "lucide-react";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

export default function SettingsSecurity() {
  const { logout } = useAuth();
  const navigate = useNavigate();

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

  const [isChanging, setIsChanging] = useState(false);
  const [error, setError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChangePassword = async () => {
    setError("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("As novas senhas não coincidem");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres");
      return;
    }

    setIsChanging(true);

    try {
      await api.request("/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      setIsSuccessModalOpen(true);

      // Limpa campos e faz logout após 3 segundos
      setTimeout(() => {
        logout();
        navigate("/login", { replace: true });
      }, 3000);
    } catch (err) {
      setError("Senha atual incorreta ou erro ao alterar.");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-xl md:rounded-2xl p-4 md:p-8">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
          <Key className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
          Alterar Senha
        </h3>
        <div className="space-y-4 md:space-y-6">
          {[
            {
              label: "Senha Atual",
              key: "current",
              placeholder: "Digite sua senha atual",
            },
            {
              label: "Nova Senha",
              key: "new",
              placeholder: "Digite sua nova senha",
            },
            {
              label: "Confirmar Nova Senha",
              key: "confirm",
              placeholder: "Confirme sua nova senha",
            },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-gray-400 text-xs md:text-sm mb-1 md:mb-2">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={showPasswords[field.key] ? "text" : "password"}
                  value={
                    passwordData[
                      field.key === "current"
                        ? "currentPassword"
                        : field.key === "new"
                        ? "newPassword"
                        : "confirmPassword"
                    ]
                  }
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
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg md:rounded-xl text-white focus:border-cyan-500 focus:outline-none transition-all pr-10 md:pr-12 text-sm md:text-base"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(field.key)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPasswords[field.key] ? (
                    <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </button>
              </div>
            </div>
          ))}

          {error && (
            <div className="p-3 md:p-4 bg-red-500/10 border border-red-500/30 rounded-lg md:rounded-xl">
              <p className="text-red-400 text-sm md:text-base">{error}</p>
            </div>
          )}

          <div className="pt-4 md:pt-6 border-t border-gray-700/50">
            <button
              onClick={handleChangePassword}
              disabled={
                isChanging ||
                !passwordData.currentPassword ||
                !passwordData.newPassword ||
                !passwordData.confirmPassword ||
                passwordData.newPassword !== passwordData.confirmPassword ||
                passwordData.newPassword.length < 6
              }
              className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg md:rounded-xl text-white font-semibold hover:shadow-cyber transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
            >
              {isChanging ? "Alterando senha..." : "Alterar Senha"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de sucesso */}
      <ConfirmationModal
        isOpen={isSuccessModalOpen}
        onClose={() => {}}
        title="Senha Alterada!"
        message="A tua senha foi atualizada. Redirecionando para login..."
        type="success"
      />
    </div>
  );
}

// src/pages/settings/SettingsDanger.jsx
import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

export default function SettingsDanger() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      // Chama o backend para eliminar a conta (DELETE /auth/me)
      await api.request("/auth/me", { method: "DELETE" });

      // Limpa tudo localmente
      localStorage.clear();
      logout();

      setIsDeleteModalOpen(false);
      setIsDeletedModalOpen(true);

      // Redireciona para login após 3 segundos
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } catch (err) {
      setError("Erro ao eliminar conta. Tenta novamente.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-red-500/30 rounded-xl md:rounded-2xl p-4 md:p-8">
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
        <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
        Zona de Risco
      </h3>
      <div className="space-y-6 md:space-y-8">
        <div className="p-4 md:p-6 bg-red-500/10 border border-red-500/30 rounded-lg md:rounded-xl">
          <h4 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
            <Trash2 className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
            Eliminar Conta
          </h4>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
            Ao eliminar a conta, <strong>todos os teus dados</strong> serão{" "}
            <strong>permanentemente apagados</strong>. Esta ação{" "}
            <strong>não pode ser desfeita</strong>.
          </p>

          {error && (
            <p className="text-red-400 text-sm md:text-base mb-4">{error}</p>
          )}

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-5 py-2.5 md:px-7 md:py-3.5 bg-red-500/20 border border-red-500/50 rounded-lg md:rounded-xl text-red-400 font-semibold hover:bg-red-500/30 hover:border-red-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
            {isDeleting ? "A eliminar..." : "Eliminar Conta"}
          </button>
        </div>
      </div>

      {/* Modal de confirmação */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Conta?"
        message="Esta ação é irreversível. Todos os teus dados serão apagados para sempre."
        confirmText={isDeleting ? "A eliminar..." : "Eliminar"}
        cancelText="Cancelar"
        type="error"
        disabled={isDeleting}
      />

      {/* Modal de sucesso */}
      <ConfirmationModal
        isOpen={isDeletedModalOpen}
        onClose={() => {}}
        title="Conta Eliminada"
        message="A tua conta foi removida com sucesso. Redirecionando para o login..."
        type="success"
      />
    </div>
  );
}

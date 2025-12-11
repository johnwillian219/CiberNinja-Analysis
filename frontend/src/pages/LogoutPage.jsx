// src/pages/LogoutPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";

export default function LogoutPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true); // abre automaticamente

  const handleLogout = () => {
    // Aqui você faz o logout real
    // Exemplo:
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // ou useAuth().logout();

    // Redireciona para login
    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    // Volta para onde estava (dashboard ou última página)
    navigate(-1);
  };

  // Se o usuário tentar acessar diretamente /logout, abre o modal
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mx-auto w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center mb-8">
            <LogOut className="w-16 h-16 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Terminar sessão?
          </h1>
          <p className="text-gray-400 text-lg max-w-md">
            Tem certeza que deseja sair da sua conta? Pode voltar a entrar a
            qualquer momento.
          </p>
        </div>

        {/* Modal de confirmação */}
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCancel}
          onConfirm={handleLogout}
          title="Confirmar saída"
          message="Ao sair, será redirecionado para a página de login."
          confirmText="Sim, sair"
          cancelText="Cancelar"
          type="danger"
        />
      </div>
    </DashboardLayout>
  );
}

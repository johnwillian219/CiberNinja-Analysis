// src/components/WelcomeModal.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomeModal({ isOpen, userEmail = "Usuário" }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        navigate("/dashboard"); // Redireciona após 5 segundos
      }, 5000);

      return () => clearTimeout(timer); // Limpa o timer se o modal fechar antes
    }
  }, [isOpen, navigate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="relative bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700 text-center animate-in fade-in zoom-in duration-300">
        {/* Ícone de boas-vindas */}
        <div className="mx-auto mb-6 w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center">
          <svg
            className="w-14 h-14 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Bem-vindo de volta, CiberNinja! 🗡️
        </h2>
        <p className="text-gray-300 mb-2">
          {userEmail && `Olá, ${userEmail.split("@")[0]}!`}
        </p>
        <p className="text-gray-400 text-sm">
          Redirecionando para o dashboard em 5 segundos...
        </p>

        {/* Barra de progresso opcional (visual) */}
        <div className="mt-8 w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-full w-0 animate-pulse"
            style={{ animation: "progress 5s linear forwards" }}
          ></div>
        </div>

        <style jsx>{`
          @keyframes progress {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

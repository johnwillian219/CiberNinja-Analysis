// frontend/src/components/auth/YouTubeLoginButton.jsx

import { Youtube } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function YouTubeLoginButton({
  size = "default",
  variant = "primary",
}) {
  const { loginYouTube, youtubeLoading } = useAuth();

  const handleClick = async () => {
    try {
      await loginYouTube();
    } catch (error) {
      // Erro já tratado no AuthContext (podes adicionar toast aqui se quiseres)
      console.error("Falha ao iniciar login YouTube:", error);
    }
  };

  // Variantes de estilo
  const baseClasses =
    "inline-flex items-center justify-center gap-3 font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/30 disabled:opacity-70 disabled:cursor-not-allowed";

  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-red-500/25 hover:scale-105",
    outline:
      "bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
    ghost: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
  };

  return (
    <button
      onClick={handleClick}
      disabled={youtubeLoading}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
    >
      {youtubeLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          <span>Conectando...</span>
        </>
      ) : (
        <>
          <Youtube className="w-5 h-5" />
          <span>Conectar com YouTube</span>
        </>
      )}
    </button>
  );
}

// frontend/src/components/auth/ProtectedRoute.jsx

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redireciona para login, mantendo a página que tentou acessar
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

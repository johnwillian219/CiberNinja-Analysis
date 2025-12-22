// frontend/src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Novo: estado específico do YouTube
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [youtubeLoading, setYoutubeLoading] = useState(true);

  // Carrega usuário do sistema (se já tiver token)
  const loadUser = async () => {
    try {
      const data = await api.request("/auth/me"); // ajuste se tua rota for diferente
      setUser(data.user || data);
    } catch (error) {
      console.log("Usuário não autenticado");
      api.removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Novo: verifica status da conexão com YouTube
  const checkYouTubeStatus = async () => {
    if (!user) {
      setYoutubeConnected(false);
      setYoutubeLoading(false);
      return;
    }

    setYoutubeLoading(true);
    try {
      const response = await api.getYouTubeStatus();
      setYoutubeConnected(response.connected === true);
    } catch (error) {
      console.warn("Erro ao verificar conexão YouTube:", error.message);
      setYoutubeConnected(false);
    } finally {
      setYoutubeLoading(false);
    }
  };

  // Login normal do teu sistema
  const login = async (email, password) => {
    const data = await api.login({ email, password });
    setUser(data.user || data);
    return data;
  };

  // Logout do teu sistema
  const logout = () => {
    api.logout();
    setUser(null);
    setYoutubeConnected(false);
  };

  // Novo: inicia login com YouTube (abre janela do Google via backend)
  const loginYouTube = async () => {
    try {
      const response = await api.startYouTubeLogin();
      // Redireciona para a URL gerada pelo backend
      window.location.href = response.authUrl;
    } catch (error) {
      console.error("Erro ao iniciar login YouTube:", error);
      throw error;
    }
  };

  // Novo: desconecta do YouTube
  const disconnectYouTube = async () => {
    try {
      await api.disconnectYouTube();
      setYoutubeConnected(false);
    } catch (error) {
      console.error("Erro ao desconectar YouTube:", error);
      throw error;
    }
  };

  // Efeito inicial: carrega usuário e status do YouTube
  useEffect(() => {
    loadUser();
  }, []);

  // Quando o usuário logar, verifica o status do YouTube
  useEffect(() => {
    if (user) {
      checkYouTubeStatus();
    }
  }, [user]);

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,

    // YouTube
    youtubeConnected,
    youtubeLoading,
    loginYouTube,
    disconnectYouTube,
    refreshYouTubeStatus: checkYouTubeStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

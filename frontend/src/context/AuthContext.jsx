// frontend/src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado específico do YouTube
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [youtubeLoading, setYoutubeLoading] = useState(true);

  // Carrega usuário a partir do token salvo (ao abrir ou recarregar a página)
  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await api.getUserProfile(); // usa o método dedicado do api.js
      setUser(data); // a rota /auth/me retorna diretamente o objeto do usuário
    } catch (error) {
      console.warn("Token inválido ou expirado. Removendo...");
      api.removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Verifica status da conexão com o YouTube
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

  // Login normal (email + senha)
  const login = async (email, password) => {
    try {
      const data = await api.login({ email, password });

      // IMPORTANTE: atualiza o estado do usuário imediatamente após o login
      // O backend retorna algo como { token, user, message }
      setUser(data.user || data);

      return data;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    api.logout(); // remove token do localStorage
    setUser(null);
    setYoutubeConnected(false);
  };

  // Inicia login com YouTube (abre popup do Google via backend)
  const loginYouTube = async () => {
    try {
      const response = await api.startYouTubeLogin();
      window.location.href = response.authUrl;
    } catch (error) {
      console.error("Erro ao iniciar login YouTube:", error);
      throw error;
    }
  };

  // Desconecta do YouTube
  const disconnectYouTube = async () => {
    try {
      await api.disconnectYouTube();
      setYoutubeConnected(false);
    } catch (error) {
      console.error("Erro ao desconectar YouTube:", error);
      throw error;
    }
  };

  // Carrega usuário ao montar o app
  useEffect(() => {
    loadUser();
  }, []);

  // Quando o usuário for autenticado, verifica o status do YouTube
  useEffect(() => {
    if (user) {
      checkYouTubeStatus();
    } else {
      setYoutubeConnected(false);
      setYoutubeLoading(false);
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

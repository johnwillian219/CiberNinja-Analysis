// src/pages/ProfilePage.jsx
import { useState, useRef, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import ResetConfirmationModal from "../components/Modal/ResetConfirmationModal";
import {
  Camera,
  X,
  Calendar,
  Activity,
  TrendingUp,
  Shield,
  RotateCcw,
  Save,
  Edit3,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";

// Configurações da API do YouTube
const YOUTUBE_API_KEY =
  import.meta.env.VITE_YOUTUBE_API_KEY ||
  "AIzaSyCtTFbHQ8BXdmGghYUH2_qu_3EsUi1f0SY";
const CHANNEL_ID =
  import.meta.env.VITE_YOUTUBE_CHANNEL_ID || "UC0tkO3jaK3afLwV0lSEgwFQ";

// Utilitário para gerar cor consistente a partir do email
const stringToColor = (str) => {
  if (!str) return "#a78bfa";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

// Função para buscar dados do canal
const fetchYouTubeStats = async () => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const stats = data.items[0].statistics;
      return {
        contents: parseInt(stats.videoCount) || 0,
        views: parseInt(stats.viewCount) || 0,
      };
    }
    return { contents: 0, views: 0 };
  } catch (error) {
    console.error("Erro ao buscar dados do YouTube:", error);
    return { contents: 0, views: 0 };
  }
};

export default function ProfilePage() {
  const { user: loggedUser, loading: authLoading, loadUser } = useAuth();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileStats, setShowMobileStats] = useState(false);
  const [error, setError] = useState("");
  const [youtubeStats, setYoutubeStats] = useState({ contents: 0, views: 0 });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (loggedUser) {
      setUser(loggedUser);
      setEditedUser(loggedUser);
      setPreviewAvatar(loggedUser.profilePhoto || null);
    }
  }, [loggedUser]);

  // Buscar estatísticas do YouTube
  useEffect(() => {
    const loadYouTubeStats = async () => {
      const stats = await fetchYouTubeStats();
      setYoutubeStats(stats);
    };
    loadYouTubeStats();
  }, []);

  const avatarBg = stringToColor(user?.email || "admin@ciberninja.com.br");

  // Estatísticas do perfil com dados reais
  const profileStats = [
    {
      label: "Conteúdos",
      value: youtubeStats.contents.toString(),
      icon: Activity,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Visualizações",
      value:
        youtubeStats.views >= 1000000
          ? `${(youtubeStats.views / 1000000).toFixed(1)}M`
          : youtubeStats.views >= 1000
          ? `${(youtubeStats.views / 1000).toFixed(1)}K`
          : youtubeStats.views.toString(),
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
  ];

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("A imagem deve ter no máximo 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTriggerAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError("");

    try {
      const updatedUser = await api.request("/auth/me", {
        method: "PUT",
        body: JSON.stringify({
          fullName: editedUser.fullName || null,
          displayName: editedUser.displayName || null,
          username: editedUser.username || null,
          profession: editedUser.profession || null,
          website: editedUser.website || null,
          location: editedUser.location || null,
          bio: editedUser.bio || null,
          profilePhoto: previewAvatar || null,
        }),
      });

      setUser(updatedUser);
      loadUser();
      setPreviewAvatar(updatedUser.profilePhoto || null);
      setIsEditing(false);
      setIsSaveModalOpen(true);
    } catch (err) {
      setError(err.message || "Erro ao salvar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedUser(user || {});
    setPreviewAvatar(user?.profilePhoto || null);
    setIsEditing(false);
    setError("");
  };

  const handleReset = async () => {
    setIsLoading(true);
    setError("");

    try {
      const resetData = {
        fullName: null,
        displayName: null,
        username: null,
        profession: null,
        website: null,
        location: null,
        bio: null,
        profilePhoto: null,
      };

      const updatedUser = await api.request("/auth/me", {
        method: "PUT",
        body: JSON.stringify(resetData),
      });

      setUser(updatedUser);
      setEditedUser(updatedUser);
      setPreviewAvatar(null);
      loadUser();
      setIsResetModalOpen(false);
      setIsEditing(false);
      setIsSaveModalOpen(true);
    } catch (err) {
      setError(err.message || "Erro ao resetar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const openResetModal = () => {
    setIsResetModalOpen(true);
  };

  const joinDate = user?.createdAt
    ? new Date(user.createdAt)
        .toLocaleDateString("pt-BR", {
          month: "short",
          year: "numeric",
        })
        .replace(".", "")
        .replace(" de ", " ")
    : "Jan 2025";

  if (authLoading || !user) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black flex items-center justify-center">
          <p className="text-white text-xl">Carregando perfil...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black p-3 md:p-6 lg:p-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 md:mb-12 animate-slide-up">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2 md:mb-4 animate-gradient">
              Meu Perfil
            </h1>
            <p className="text-gray-400 text-sm md:text-lg md:text-xl max-w-2xl mx-auto hidden md:block">
              Gerencie sua identidade e informações no CiberNinja Analytics
            </p>
            <p className="text-gray-400 text-xs md:hidden">
              Gerencie suas informações
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            <div className="lg:col-span-1 space-y-4 lg:space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl lg:rounded-3xl p-4 lg:p-8 text-center shadow-xl hover:shadow-cyber transition-all duration-400 animate-slide-up">
                <div className="relative group mx-auto w-28 h-28 md:w-48 md:h-48 mb-4 lg:mb-6">
                  <div className="absolute inset-0 rounded-full p-0.5 md:p-1 animate-spin-slow">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500" />
                  </div>

                  <div className="relative w-full h-full rounded-full overflow-hidden ring-2 md:ring-4 ring-gray-800 group-hover:ring-cyan-500/50 transition-all duration-300">
                    {previewAvatar || user.profilePhoto ? (
                      <img
                        src={previewAvatar || user.profilePhoto}
                        alt="Perfil"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-4xl md:text-7xl font-bold text-white"
                        style={{ backgroundColor: avatarBg }}
                      >
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Overlay só em modo edição */}
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-2 md:gap-3">
                          <button
                            onClick={handleTriggerAvatarUpload}
                            className="p-2 md:p-3 bg-cyan-500 rounded-full hover:bg-cyan-400 shadow-lg hover:shadow-cyan-500/50 transition-all"
                          >
                            <Camera className="w-4 h-4 md:w-6 md:h-6 text-white" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>

                <h2 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2 truncate px-2">
                  {user.displayName ||
                    user.fullName ||
                    user.username ||
                    "Ciber Ninja"}
                </h2>
                <p className="text-sm md:text-xl text-cyan-400 mb-1 md:mb-2 truncate px-2">
                  @{user.username || user.email.split("@")[0]}
                </p>
                <p className="text-xs md:text-base text-gray-400 mb-3 md:mb-4 truncate px-2">
                  {user.profession || "Creator"}
                </p>

                <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-3 md:py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs md:text-sm text-emerald-400">
                    Online
                  </span>
                </div>
              </div>

              {/* Botão mobile para stats */}
              <button
                onClick={() => setShowMobileStats(!showMobileStats)}
                className="lg:hidden w-full bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-3 flex items-center justify-between text-white hover:border-cyan-500/50 transition-all"
              >
                <span className="font-medium">Estatísticas do Perfil</span>
                {showMobileStats ? (
                  <ChevronUp className="w-5 h-5 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-cyan-400" />
                )}
              </button>

              {/* Stats mobile */}
              <div
                className={`lg:hidden bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 shadow-xl transition-all duration-300 ${
                  showMobileStats
                    ? "block opacity-100 max-h-96"
                    : "hidden opacity-0 max-h-0"
                }`}
              >
                <div className="grid grid-cols-2 gap-3">
                  {profileStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="p-3 bg-gray-700/30 rounded-xl border border-gray-600/50 hover:border-cyan-500/50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`p-2 rounded-lg ${stat.bg}`}>
                            <Icon className={`w-4 h-4 ${stat.color}`} />
                          </div>
                          <span className="text-lg font-bold text-white">
                            {stat.value}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats desktop */}
              <div className="hidden lg:block bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-6 shadow-xl hover:shadow-cyber transition-all duration-400 animate-slide-up">
                <h3 className="text-xl font-bold text-white mb-6">
                  Estatísticas do Perfil
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {profileStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="p-4 bg-gray-700/30 rounded-2xl border border-gray-600/50 hover:border-cyan-500/50 transition-all duration-300 group hover:scale-102"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                            <Icon className={`w-5 h-5 ${stat.color}`} />
                          </div>
                          <span className="text-sm font-bold text-white">
                            {stat.value}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card de Informações Básicas */}
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-xl hover:shadow-cyber transition-all duration-400 animate-slide-up">
                <h3 className="text-base lg:text-xl font-bold text-white mb-4 lg:mb-6">
                  Informações
                </h3>
                <div className="space-y-3 lg:space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />
                      <span className="text-xs lg:text-base text-gray-400">
                        Membro desde
                      </span>
                    </div>
                    <span className="text-white text-sm lg:text-base font-medium">
                      {joinDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna direita - Formulário */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl lg:rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden relative animate-slide-up">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent" />
                <div className="absolute inset-0 bg-grid-pattern bg-grid-50 opacity-[0.02]" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-700/50">
                    <div className="mb-3 md:mb-0">
                      <h2 className="text-lg md:text-2xl font-bold text-white">
                        Detalhes do Perfil
                      </h2>
                      <p className="text-gray-400 text-xs md:text-base mt-1">
                        {isEditing
                          ? "Atualize suas informações abaixo"
                          : "Visualize suas informações"}
                      </p>
                    </div>
                    {!isEditing && (
                      <div className="flex items-center gap-2 md:gap-3">
                        <span className="px-2 py-1 md:px-3 md:py-1.5 bg-cyan-500/20 text-cyan-400 rounded-full text-xs md:text-sm font-medium flex items-center gap-1 md:gap-2">
                          <Shield className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="hidden md:inline">
                            Conta Verificada
                          </span>
                          <span className="md:hidden">Verificada</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {[
                        "fullName",
                        "displayName",
                        "username",
                        "profession",
                        "website",
                        "location",
                      ].map((field) => (
                        <div key={field} className="space-y-1.5 md:space-y-2">
                          <label className="text-gray-400 text-xs md:text-sm font-medium capitalize">
                            {field.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedUser[field] || ""}
                              onChange={(e) =>
                                setEditedUser((prev) => ({
                                  ...prev,
                                  [field]: e.target.value,
                                }))
                              }
                              className="w-full px-4 py-3 md:px-5 md:py-4 bg-gray-700/50 border border-gray-600 rounded-xl md:rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all placeholder-gray-500 text-sm md:text-base"
                              placeholder={`Digite seu ${field
                                .replace(/([A-Z])/g, " $1")
                                .toLowerCase()
                                .trim()}`}
                            />
                          ) : (
                            <div className="text-sm md:text-lg text-white px-3 md:px-4 py-2 md:py-3 bg-gray-700/30 rounded-xl md:rounded-2xl min-h-[48px] md:min-h-[56px] flex items-center">
                              {field === "username"
                                ? `@${user[field] || "não definido"}`
                                : user[field] || "não definido"}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-gray-400 text-xs md:text-sm font-medium">
                        Biografia
                      </label>
                      {isEditing ? (
                        <textarea
                          rows={3}
                          value={editedUser.bio || ""}
                          onChange={(e) =>
                            setEditedUser((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 md:px-5 md:py-4 bg-gray-700/50 border border-gray-600 rounded-xl md:rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all resize-none placeholder-gray-500 text-sm md:text-base"
                          placeholder="Conte um pouco sobre você..."
                        />
                      ) : (
                        <div className="text-white leading-relaxed text-sm md:text-lg px-3 md:px-4 py-2 md:py-3 bg-gray-700/30 rounded-xl md:rounded-2xl min-h-[80px] md:min-h-[120px]">
                          {user.bio || "Sem biografia"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700/50">
                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="px-6 py-3 md:px-8 md:py-4 border border-gray-600 rounded-xl md:rounded-2xl text-gray-300 font-medium hover:border-gray-500 hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
                          >
                            <X className="w-4 h-4 md:w-5 md:h-5" />
                            Cancelar
                          </button>

                          <button
                            onClick={openResetModal}
                            disabled={isLoading}
                            className="px-6 py-3 md:px-8 md:py-4 border border-gray-600 rounded-xl md:rounded-2xl text-amber-300 font-medium hover:border-amber-500 hover:bg-amber-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
                          >
                            <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                            Resetar
                          </button>

                          <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl md:rounded-2xl text-white font-semibold hover:shadow-cyber transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:gap-3 relative overflow-hidden group text-sm md:text-base"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Save className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
                            <span className="relative z-10">
                              {isLoading ? "Salvando..." : "Salvar Alterações"}
                            </span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/50 rounded-xl md:rounded-2xl text-cyan-400 font-semibold hover:from-cyan-500/30 hover:to-emerald-500/30 hover:border-cyan-400 hover:shadow-cyber transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 group relative overflow-hidden text-sm md:text-base"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                          <Edit3 className="w-4 h-4 md:w-6 md:h-6 relative z-10" />
                          <span className="relative z-10">Editar Perfil</span>
                        </button>
                      )}
                    </div>

                    {isEditing && (
                      <p className="text-center text-gray-500 text-xs md:text-sm mt-3 md:mt-4">
                        Alterações refletem após salvar
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-6 text-center text-gray-500 text-xs md:text-sm">
                <p>
                  Última atualização:{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de sucesso geral */}
      <ConfirmationModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        title="Alterações salvas!"
        message="O teu perfil foi atualizado com sucesso."
        type="success"
        duration={2500}
      />

      {/* Modal de reset */}
      <ResetConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Resetar todo o perfil?"
        message="Esta ação vai limpar nome, username, bio, profissão, foto e tudo mais. Não pode ser desfeita."
      />
    </DashboardLayout>
  );
}

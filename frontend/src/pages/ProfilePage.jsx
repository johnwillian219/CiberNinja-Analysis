// src/pages/ProfilePage.jsx
import { useState, useRef } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import ResetConfirmationModal from "../components/Modal/ResetConfirmationModal";
import {
  Mail,
  Camera,
  X,
  Calendar,
  MapPin,
  Activity,
  TrendingUp,
  Users,
  Award,
  Shield,
  RotateCcw,
  Save,
  Edit3,
} from "lucide-react";

// Utilitário para gerar cores a partir de strings
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

// Dados iniciais do usuário
const initialUser = {
  fullName: "Ciber Ninja",
  displayName: "CiberNinja",
  username: "ciberninja",
  bio: "Hacker ético | Criador de conteúdo | Especialista em segurança digital e análise de redes sociais. Apaixonado por tecnologia e inovação.",
  profession: "Cybersecurity Analyst & Content Creator",
  email: "admin@ciberninja.com.br",
  website: "https://ciberninja.com.br",
  location: "São Paulo, Brasil",
  joinDate: "Jan 2023",
  avatar: null,
};

// Estatísticas do perfil
const profileStats = [
  {
    label: "Conteúdos",
    value: "428",
    icon: Activity,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    label: "Visualizações",
    value: "8.5M",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(initialUser);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const avatarBg = stringToColor(user.email);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 5MB");
        return;
      }

      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setPreviewAvatar(null);
    setEditedUser((prev) => ({ ...prev, avatar: null }));
  };

  const handleTriggerAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    setIsLoading(true);

    // Simulação de requisição API
    await new Promise((resolve) => setTimeout(resolve, 800));

    setUser({
      ...editedUser,
      avatar: previewAvatar || user.avatar,
    });

    setIsEditing(false);
    setIsSaveModalOpen(true);
    setIsLoading(false);

    setTimeout(() => setIsSaveModalOpen(false), 2500);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setPreviewAvatar(user.avatar);
    setIsEditing(false);
  };

  const handleReset = () => {
    setEditedUser(initialUser);
    setPreviewAvatar(null);
    setIsResetModalOpen(false);
  };

  const openResetModal = () => {
    setIsResetModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black p-4 md:p-6 lg:p-8 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho da página */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4 animate-gradient">
              Meu Perfil
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Gerencie sua identidade e informações no CiberNinja Analytics
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Coluna esquerda - Avatar e Stats */}
            <div className="lg:col-span-1 space-y-6 lg:space-y-8">
              {/* Card do Avatar */}
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-8 text-center shadow-xl hover:shadow-cyber transition-all duration-400 animate-slide-up">
                <div className="relative group mx-auto w-40 h-40 md:w-48 md:h-48 mb-6">
                  {/* Borda gradiente animada */}
                  <div className="absolute inset-0 rounded-full p-1 animate-spin-slow">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500" />
                  </div>

                  {/* Container da imagem */}
                  <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-gray-800 group-hover:ring-cyan-500/50 transition-all duration-300">
                    {previewAvatar || user.avatar ? (
                      <img
                        src={previewAvatar || user.avatar}
                        alt="Perfil"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-6xl md:text-7xl font-bold text-white"
                        style={{ backgroundColor: avatarBg }}
                      >
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Overlay no hover para edição */}
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-3">
                          <button
                            onClick={handleTriggerAvatarUpload}
                            className="p-3 bg-cyan-500 rounded-full hover:bg-cyan-400 shadow-lg hover:shadow-cyan-500/50 transition-all"
                          >
                            <Camera className="w-6 h-6 text-white" />
                          </button>
                          {(previewAvatar || user.avatar) && (
                            <button
                              onClick={handleRemoveAvatar}
                              className="p-3 bg-red-500 rounded-full hover:bg-red-400 shadow-lg hover:shadow-red-500/50 transition-all"
                            >
                              <X className="w-6 h-6 text-white" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input de arquivo escondido */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  {user.displayName}
                </h2>
                <p className="text-xl text-cyan-400 mb-2">@{user.username}</p>
                <p className="text-gray-400 mb-4">{user.profession}</p>

                {/* Status online */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 text-sm">Online agora</span>
                </div>
              </div>

              {/* Card de Estatísticas */}
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-6 shadow-xl hover:shadow-cyber transition-all duration-400 animate-slide-up">
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
                          <span className="text-1xl font-bold text-white">
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
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-6 shadow-xl hover:shadow-cyber transition-all duration-400 animate-slide-up">
                <h3 className="text-xl font-bold text-white mb-6">
                  Informações
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-400">Membro desde</span>
                    </div>
                    <span className="text-white font-medium">
                      {user.joinDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna direita - Formulário */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden relative animate-slide-up">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern bg-grid-50 opacity-[0.02]" />

                <div className="relative z-10">
                  {/* Header do formulário */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-700/50">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Detalhes do Perfil
                      </h2>
                      <p className="text-gray-400 mt-1">
                        {isEditing
                          ? "Atualize suas informações abaixo"
                          : "Visualize suas informações de perfil"}
                      </p>
                    </div>
                    {!isEditing && (
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Conta Verificada
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Formulário */}
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        "fullName",
                        "displayName",
                        "username",
                        "profession",
                        "website",
                        "location",
                      ].map((field) => (
                        <div key={field} className="space-y-2">
                          <label className="text-gray-400 text-sm font-medium capitalize">
                            {field.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editedUser[field]}
                              onChange={(e) =>
                                setEditedUser((prev) => ({
                                  ...prev,
                                  [field]:
                                    field === "username"
                                      ? e.target.value
                                          .replace(/[^a-z0-9_]/gi, "")
                                          .toLowerCase()
                                      : e.target.value,
                                }))
                              }
                              className="w-full px-5 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all placeholder-gray-500"
                              placeholder={`Digite seu ${field
                                .replace(/([A-Z])/g, " $1")
                                .toLowerCase()
                                .trim()}`}
                            />
                          ) : (
                            <div className="text-lg text-white px-4 py-3 bg-gray-700/30 rounded-2xl min-h-[56px] flex items-center">
                              {field === "username" ? (
                                `@${user[field]}`
                              ) : field === "website" ? (
                                <a
                                  href={user[field]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 hover:underline truncate"
                                >
                                  {user[field].replace(/^https?:\/\//, "")}
                                </a>
                              ) : (
                                user[field]
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <label className="text-gray-400 text-sm font-medium">
                        Biografia
                      </label>
                      {isEditing ? (
                        <textarea
                          rows={4}
                          value={editedUser.bio}
                          onChange={(e) =>
                            setEditedUser((prev) => ({
                              ...prev,
                              bio: e.target.value,
                            }))
                          }
                          className="w-full px-5 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all resize-none placeholder-gray-500"
                          placeholder="Conte um pouco sobre você, suas habilidades e interesses..."
                        />
                      ) : (
                        <div className="text-white leading-relaxed text-lg px-4 py-3 bg-gray-700/30 rounded-2xl min-h-[120px]">
                          {user.bio}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="mt-12 pt-8 border-t border-gray-700/50">
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="px-8 py-4 border border-gray-600 rounded-2xl text-gray-300 font-medium hover:border-gray-500 hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                          >
                            <X className="w-5 h-5" />
                            Cancelar
                          </button>

                          <button
                            onClick={openResetModal}
                            disabled={isLoading}
                            className="px-8 py-4 border border-gray-600 rounded-2xl text-amber-300 font-medium hover:border-amber-500 hover:bg-amber-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                          >
                            <RotateCcw className="w-5 h-5" />
                            Resetar
                          </button>

                          <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl text-white font-semibold hover:shadow-cyber transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Save className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">
                              {isLoading ? "Salvando..." : "Salvar Alterações"}
                            </span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-10 py-5 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/50 rounded-2xl text-cyan-400 font-semibold hover:from-cyan-500/30 hover:to-emerald-500/30 hover:border-cyan-400 hover:shadow-cyber transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                          <Edit3 className="w-6 h-6 relative z-10" />
                          <span className="relative z-10">Editar Perfil</span>
                        </button>
                      )}
                    </div>

                    {isEditing && (
                      <p className="text-center text-gray-500 text-sm mt-4">
                        Todas as alterações serão refletidas imediatamente após
                        salvar
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Informação de atualização */}
              <div className="mt-6 text-center text-gray-500 text-sm">
                <p>
                  Última atualização: Hoje às{" "}
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

      {/* Modal de confirmação de salvamento */}
      <ConfirmationModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        title="Perfil atualizado com sucesso!"
        message="Suas informações foram salvas e estão visíveis para a comunidade."
        type="success"
        duration={2500}
      />

      {/* Modal de confirmação de reset */}
      <ResetConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleReset}
        title="Resetar alterações?"
        message="Todas as alterações não salvas serão perdidas. Esta ação não pode ser desfeita."
      />
    </DashboardLayout>
  );
}

// src/pages/ProfilePage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  User,
  Mail,
  Link2,
  Briefcase,
  Edit3,
  Camera,
  X,
  Check,
  Save,
} from "lucide-react";
import ConfirmationModal from "../components/Modal/ConfirmationModal";

// Cor consistente a partir do e-mail
const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

const initialUser = {
  fullName: "Ciber Ninja",
  displayName: "CiberNinja",
  username: "ciberninja",
  bio: "Hacker ético | Criador de conteúdo | Especialista em segurança digital e análise de redes sociais.",
  profession: "Cybersecurity Analyst & Content Creator",
  email: "admin@ciberninja.com.br",
  website: "https://ciberninja.com.br",
  avatar: null,
};

export default function ProfilePage() {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(initialUser);
  const [previewAvatar, setPreviewAvatar] = useState(user.avatar);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const firstLetter = user.email.charAt(0).toUpperCase();
  const avatarBg = stringToColor(user.email);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setPreviewAvatar(null);
    setEditedUser({ ...editedUser, avatar: null });
  };

  const handleSave = () => {
    setUser({ ...editedUser, avatar: previewAvatar });
    setIsEditing(false);
    setIsSaveModalOpen(true);
    setTimeout(() => setIsSaveModalOpen(false), 2500);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setPreviewAvatar(user.avatar);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Meu Perfil
          </h1>
          <p className="text-gray-400 text-lg">
            Atualize sua identidade no CiberNinja Analytics
          </p>
        </div>

        {/* Card principal */}
        <div className="relative bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-10 lg:p-16 shadow-2xl overflow-hidden">
          {/* Glow de fundo */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-emerald-500/5 to-transparent opacity-50" />

          <div className="relative z-10">
            {/* Foto de perfil + infos básicas */}
            <div className="flex flex-col items-center mb-16">
              <div className="relative group mb-8">
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl ring-4 ring-gray-800 transition-all group-hover:ring-cyan-500/50">
                  {previewAvatar || user.avatar ? (
                    <img
                      src={previewAvatar || user.avatar}
                      alt="Perfil"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-7xl font-bold text-white"
                      style={{ backgroundColor: avatarBg }}
                    >
                      {firstLetter}
                    </div>
                  )}
                </div>

                {/* Borda neon */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 p-[4px] -z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-full h-full rounded-full bg-gray-800"></div>
                </div>

                {/* Botões flutuantes no edit */}
                {isEditing && (
                  <div className="absolute -bottom-2 -right-2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <label className="p-4 bg-cyan-500 rounded-full cursor-pointer hover:bg-cyan-400 shadow-xl hover:shadow-cyan-500/50 transition-all">
                      <Camera className="w-6 h-6 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                    {(previewAvatar || user.avatar) && (
                      <button
                        onClick={handleRemoveAvatar}
                        className="p-4 bg-red-500 rounded-full hover:bg-red-400 shadow-xl hover:shadow-red-500/50 transition-all"
                      >
                        <X className="w-6 h-6 text-white" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">
                {user.displayName}
              </h2>
              <p className="text-xl text-cyan-400">@{user.username}</p>
              <p className="text-gray-400 mt-2">{user.profession}</p>
            </div>

            {/* Formulário */}
            <div className="space-y-10 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-gray-400 text-sm font-medium">
                    Nome completo
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.fullName}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          fullName: e.target.value,
                        })
                      }
                      className="mt-2 w-full px-5 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all"
                    />
                  ) : (
                    <p className="mt-2 text-lg text-white">{user.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium">
                    Nome de exibição
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.displayName}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          displayName: e.target.value,
                        })
                      }
                      className="mt-2 w-full px-5 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all"
                    />
                  ) : (
                    <p className="mt-2 text-lg text-white">
                      {user.displayName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium">
                    Username
                  </label>
                  {isEditing ? (
                    <div className="mt-2 flex items-center">
                      <span className="text-gray-500 pr-3 text-lg">@</span>
                      <input
                        type="text"
                        value={editedUser.username}
                        onChange={(e) =>
                          setEditedUser({
                            ...editedUser,
                            username: e.target.value
                              .replace(/[^a-z0-9_]/gi, "")
                              .toLowerCase(),
                          })
                        }
                        className="w-full px-5 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all"
                      />
                    </div>
                  ) : (
                    <p className="mt-2 text-lg text-white">@{user.username}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={editedUser.website}
                      onChange={(e) =>
                        setEditedUser({
                          ...editedUser,
                          website: e.target.value,
                        })
                      }
                      placeholder="https://"
                      className="mt-2 w-full px-5 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all"
                    />
                  ) : user.website ? (
                    <a
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-lg text-cyan-400 hover:underline flex items-center gap-2"
                    >
                      <Link2 className="w-5 h-5" />
                      {user.website.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    <p className="mt-2 text-gray-500 italic">Não definido</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="text-gray-400 text-sm font-medium">Bio</label>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={editedUser.bio}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, bio: e.target.value })
                    }
                    className="mt-2 w-full px-5 py-4 bg-gray-700/50 border border-gray-600 rounded-2xl text-white focus:border-cyan-500 focus:outline-none transition-all resize-none"
                  />
                ) : (
                  <p className="mt-2 text-white leading-relaxed text-lg">
                    {user.bio}
                  </p>
                )}
              </div>

              {/* Contato */}
              <div className="pt-8 border-t border-gray-700/50">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  Contato
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-white">{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="mt-16 flex justify-center gap-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-10 py-4 border border-gray-600 rounded-2xl text-gray-300 font-medium hover:border-gray-500 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/40 transition-all flex items-center gap-3"
                  >
                    <Save className="w-5 h-5" />
                    Salvar alterações
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/50 rounded-2xl text-cyan-400 font-semibold hover:from-cyan-500/30 hover:to-emerald-500/30 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/30 transition-all"
                >
                  <Edit3 className="w-6 h-6" />
                  Editar perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de sucesso */}
      <ConfirmationModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        title="Perfil atualizado!"
        message="As suas informações foram salvas com sucesso."
        type="success"
      />
    </DashboardLayout>
  );
}

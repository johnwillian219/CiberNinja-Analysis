import { Camera, X, Loader2 } from "lucide-react";

export default function ProfileAvatar({
  user,
  previewAvatar,
  avatarBg,
  isEditing,
  isLoading,
  fileInputRef,
  onAvatarChange,
  onRemoveAvatar,
  onTriggerUpload,
}) {
  const firstLetter = user.email.charAt(0).toUpperCase();

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
      <div className="relative group mx-auto w-48 h-48 mb-6">
        {/* Borda gradiente animada */}
        <div className="absolute inset-0 rounded-full p-1 animate-spin-slow">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 opacity-80" />
        </div>

        {/* Container da imagem */}
        <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-gray-800 group-hover:ring-cyan-500/50 transition-all">
          {previewAvatar || user.avatar ? (
            <img
              src={previewAvatar || user.avatar}
              alt="Perfil"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-7xl font-bold text-white"
              style={{ backgroundColor: avatarBg }}
            >
              {firstLetter}
            </div>
          )}

          {/* Overlay no hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            ) : isEditing ? (
              <div className="flex gap-3">
                <button
                  onClick={onTriggerUpload}
                  className="p-3 bg-cyan-500 rounded-full hover:bg-cyan-400 shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
                {(previewAvatar || user.avatar) && (
                  <button
                    onClick={onRemoveAvatar}
                    className="p-3 bg-red-500 rounded-full hover:bg-red-400 shadow-lg hover:shadow-red-500/50 transition-all"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>
            ) : (
              <Camera className="w-12 h-12 text-white/80" />
            )}
          </div>
        </div>

        {/* Input de arquivo escondido */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={onAvatarChange}
          className="hidden"
        />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">{user.displayName}</h2>
      <p className="text-xl text-cyan-400 mb-2">@{user.username}</p>
      <p className="text-gray-400">{user.profession}</p>
    </div>
  );
}

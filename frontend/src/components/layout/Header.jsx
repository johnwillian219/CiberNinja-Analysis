// src/components/layout/Header.jsx
import { RefreshCw, Menu, Bell, Search, Zap, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext"; // caminho com alias @

// Função para gerar cor consistente a partir do email (fallback)
function stringToColor(str) {
  if (!str) return "#a78bfa";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 45%)`;
}

const notifications = [
  {
    id: 1,
    text: "YouTube Shorts viral: +215% views",
    time: "há 2 min",
    read: false,
    platform: "youtube",
  },
  {
    id: 2,
    text: "Alerta Instagram: Reels com engajamento baixo",
    time: "há 15 min",
    read: false,
    platform: "instagram",
  },
  {
    id: 3,
    text: "Facebook: Live com alta interação detectada",
    time: "há 30 min",
    read: true,
    platform: "facebook",
  },
  {
    id: 4,
    text: "TikTok: Vídeo entrando em trending",
    time: "há 45 min",
    read: true,
    platform: "tiktok",
  },
];

export default function Header({ onMenuClick }) {
  const { user, loading } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("há 5 min");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const times = [
        "há 1 min",
        "há 2 min",
        "há 3 min",
        "há 5 min",
        "há 7 min",
      ];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      setLastUpdate(randomTime);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate("agora mesmo");
    }, 1500);
  };

  // Dados do usuário
  const displayName =
    user?.fullName ||
    user?.displayName ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "CiberNinja";
  const userRole = user?.profession || "Creator";
  const firstLetter = user?.email ? user.email.charAt(0).toUpperCase() : "C";
  const avatarBgColor = stringToColor(user?.email || "admin@ciberninja.com.br");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getPlatformColor = (platform) => {
    switch (platform) {
      case "youtube":
        return "bg-red-500/20 text-red-400";
      case "instagram":
        return "bg-purple-500/20 text-purple-400";
      case "facebook":
        return "bg-blue-500/20 text-blue-400";
      case "tiktok":
        return "bg-pink-500/20 text-pink-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (loading) {
    return (
      <header className="hidden lg:flex bg-gray-900 border-b border-gray-800 px-6 py-4 items-center justify-between">
        <div className="text-gray-400">Carregando perfil...</div>
      </header>
    );
  }

  return (
    <>
      {/* Header Mobile */}
      <header className="lg:hidden bg-gray-900 border-b border-gray-800 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Abrir menu"
            >
              <Menu size={22} className="text-gray-300" />
            </button>

            <div>
              <h1 className="text-lg font-bold text-white">CiberNinja</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">{lastUpdate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Atualizar"
            >
              <RefreshCw
                size={20}
                className={`text-gray-300 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
            </button>

            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors relative"
                aria-label="Notificações"
              >
                <Bell size={20} className="text-gray-300" />
                {unreadCount > 0 && (
                  <>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {unreadCount}
                      </span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75"></div>
                  </>
                )}
              </button>

              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-white">Notificações</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-emerald-400">
                          IA Ativa
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-lg ${
                            notif.read ? "bg-gray-800/40" : "bg-blue-500/10"
                          } border ${
                            notif.read
                              ? "border-gray-700"
                              : "border-blue-500/30"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`p-1.5 rounded-lg ${getPlatformColor(
                                notif.platform
                              )}`}
                            >
                              <Zap className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-white">{notif.text}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notif.time}
                              </p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-white transition-colors border-t border-gray-800 pt-3">
                      Ver todas as notificações
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Mobile - com foto real */}
            <button
              onClick={() =>
                (window.location.href = "/CiberNinja-Analysis/#/profile")
              }
              className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-gray-700 hover:ring-cyan-500 transition-all"
              aria-label="Ver perfil"
            >
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: avatarBgColor }}
                >
                  {firstLetter}
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Header Desktop */}
      <header className="hidden lg:flex bg-gray-900 border-b border-gray-800 px-6 py-4 items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Dashboard CiberNinja
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">
                  Atualizado {lastUpdate}
                </span>
              </div>
              <div className="h-3 w-px bg-gray-700"></div>
              <span className="text-sm text-emerald-400 font-medium">
                IA Ativa
              </span>
            </div>
          </div>

          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar métricas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-56 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-300">Analisando</span>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <span className="text-xs text-emerald-400 font-medium">92%</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
              aria-label="Atualizar dados"
            >
              <RefreshCw
                size={18}
                className={`text-gray-300 transition-transform duration-500 ${
                  isRefreshing ? "animate-spin" : "group-hover:rotate-180"
                }`}
              />
              <span className="text-sm font-medium text-gray-100">
                Atualizar
              </span>
            </button>

            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Notificações"
              >
                <Bell size={20} className="text-gray-300" />
                {unreadCount > 0 && (
                  <>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs font-bold text-white">
                        {unreadCount}
                      </span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75"></div>
                  </>
                )}
              </button>

              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-white text-lg">
                        Notificações IA
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-emerald-400 font-medium">
                          Em tempo real
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-xl ${
                            notif.read
                              ? "bg-gray-800/40"
                              : "bg-gradient-to-r from-blue-500/10 to-cyan-500/10"
                          } border ${
                            notif.read
                              ? "border-gray-700"
                              : "border-blue-500/30"
                          } hover:border-blue-500/50 transition-all cursor-pointer`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-lg ${getPlatformColor(
                                notif.platform
                              )}`}
                            >
                              <Zap className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-white">
                                  {notif.text}
                                </p>
                                {!notif.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 mt-1">
                                {notif.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 py-2.5 text-sm text-gray-400 hover:text-white transition-colors border-t border-gray-800 pt-3">
                      Ver todas as notificações
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar + Nome Desktop - com foto real */}
            <button
              onClick={() =>
                (window.location.href = "/CiberNinja-Analysis/#/profile")
              }
              className="flex items-center gap-3 pl-1 pr-3 py-1 hover:bg-gray-800 rounded-lg transition-colors group"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-700 group-hover:ring-cyan-500 transition-all">
                  {user?.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt="Perfil"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white font-bold shadow-lg"
                      style={{ backgroundColor: avatarBgColor }}
                    >
                      {firstLetter}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="text-left hidden xl:block">
                <p className="text-sm font-medium text-white">{displayName}</p>
                <p className="text-xs text-gray-400">{userRole}</p>
              </div>
              <User className="w-4 h-4 text-gray-500 group-hover:text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Barra de Pesquisa Mobile */}
      <div className="lg:hidden px-4 py-2 bg-gray-900/80 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar métricas, plataformas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
          />
        </div>
      </div>
    </>
  );
}

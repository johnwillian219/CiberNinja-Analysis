// src/components/layout/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@icons/DashboardIcon";
import YoutubeIcon from "@icons/YoutubeIcon";
import TiktokIcon from "@icons/TiktokIcon";
import InstagramIcon from "@icons/InstagramIcon";
import FacebookIcon from "@icons/FacebookIcon";
import AIIcon from "@icons/AIIcon";
import LibraryIcon from "@icons/LibraryIcon";
import CompareIcon from "@icons/CompareIcon";
import SettingsIcon from "@icons/SettingsIcon";
import ProfileIcon from "@icons/ProfileIcon";
import LogoutIcon from "@icons/LogoutIcon";

const menuItems = [
  {
    Icon: DashboardIcon,
    label: "Dashboard Geral",
    path: "/dashboard",
    color: "text-cyan-400",
    hoverColor: "group-hover:text-cyan-400",
    activeBg: "bg-cyan-900/30",
  },
  {
    Icon: YoutubeIcon,
    label: "YouTube",
    path: "/youtube",
    color: "text-red-500",
    hoverColor: "group-hover:text-red-500",
    activeBg: "bg-red-900/30",
  },
  {
    Icon: TiktokIcon,
    label: "TikTok",
    path: "/tiktok",
    color: "text-pink-500",
    hoverColor: "group-hover:text-pink-500",
    activeBg: "bg-pink-900/30",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    path: "/instagram",
    color: "text-pink-400",
    hoverColor: "group-hover:text-pink-400",
    activeBg: "bg-pink-900/30",
  },
  {
    Icon: FacebookIcon,
    label: "Facebook",
    path: "/facebook",
    color: "text-blue-500",
    hoverColor: "group-hover:text-blue-500",
    activeBg: "bg-blue-900/30",
  },
  {
    Icon: AIIcon,
    label: "Alertas IA",
    path: "/ai-insights",
    color: "text-emerald-400",
    hoverColor: "group-hover:text-emerald-400",
    activeBg: "bg-emerald-900/30",
  },
  {
    Icon: LibraryIcon,
    label: "Biblioteca de Vídeos",
    path: "/videos",
    color: "text-yellow-400",
    hoverColor: "group-hover:text-yellow-400",
    activeBg: "bg-yellow-900/30",
  },
  {
    Icon: CompareIcon,
    label: "Comparação",
    path: "/compare",
    color: "text-purple-400",
    hoverColor: "group-hover:text-purple-400",
    activeBg: "bg-purple-900/30",
  },
];

const bottomItems = [
  {
    Icon: SettingsIcon,
    label: "Configurações",
    path: "/settings",
    color: "text-gray-300",
    hoverColor: "group-hover:text-gray-300",
  },
  {
    Icon: ProfileIcon,
    label: "Perfil",
    path: "/profile",
    color: "text-gray-300",
    hoverColor: "group-hover:text-gray-300",
  },
  {
    Icon: LogoutIcon,
    label: "Logout",
    path: "/logout",
    color: "text-red-500",
    hoverColor: "group-hover:text-red-500",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="src/assets/avatar.png"
              alt="CiberNinja"
              className="w-11 h-11 rounded-full object-cover z-10"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 p-[2px] -z-10">
              <div className="w-full h-full rounded-full bg-gray-900"></div>
            </div>
            <div className="absolute inset-0 rounded-full blur-xl bg-emerald-500/30 -z-20"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CiberNinja</h1>
            <p className="text-xs text-gray-400 leading-none">Analytics</p>
          </div>
        </div>
      </div>

      {/* Menu Principal */}
      <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
        {menuItems.map(({ Icon, label, path, color, hoverColor, activeBg }) => {
          const isActive = location.pathname.startsWith(path);

          return (
            <Link
              key={path}
              to={path}
              className={`
                group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? `${activeBg} shadow-lg ring-1 ring-white/10`
                    : "hover:bg-gray-800/70"
                }
              `}
            >
              {/* Ícone: cor certa quando ativo ou hover */}
              <Icon
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? color : `text-gray-500 ${hoverColor}`
                }`}
              />

              {/* Texto: cor certa quando ativo ou hover */}
              <span
                className={`transition-colors duration-300 ${
                  isActive ? color : hoverColor
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Menu Inferior */}
      <div className="p-4 border-t border-gray-800 space-y-1">
        {bottomItems.map(({ Icon, label, path, color, hoverColor }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-gray-800/70 shadow-lg ring-1 ring-white/10"
                    : "hover:bg-gray-800/70"
                }
              `}
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? color : `text-gray-500 ${hoverColor}`
                }`}
              />
              <span
                className={`transition-colors duration-300 ${
                  isActive ? color : hoverColor
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

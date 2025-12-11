// src/components/layout/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

// Imports dos seus ícones reais
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
  },
  {
    Icon: YoutubeIcon,
    label: "YouTube",
    path: "/youtube",
    color: "text-red-500",
  },
  {
    Icon: TiktokIcon,
    label: "TikTok",
    path: "/tiktok",
    color: "text-pink-500",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    path: "/instagram",
    color: "text-pink-400",
  },
  {
    Icon: FacebookIcon,
    label: "Facebook",
    path: "/facebook",
    color: "text-blue-500",
  },
  {
    Icon: AIIcon,
    label: "Alertas IA",
    path: "/ai-insights",
    color: "text-emerald-400",
  },
  {
    Icon: LibraryIcon,
    label: "Biblioteca de Vídeos",
    path: "/videos",
    color: "text-yellow-400",
  },
  {
    Icon: CompareIcon,
    label: "Comparação",
    path: "/compare",
    color: "text-purple-400",
  },
];

const bottomItems = [
  {
    Icon: SettingsIcon,
    label: "Configurações",
    path: "/settings",
    color: "text-gray-300",
  },
  {
    Icon: ProfileIcon,
    label: "Perfil",
    path: "/profile",
    color: "text-gray-300",
  },
  {
    Icon: LogoutIcon,
    label: "Logout",
    path: "/logout",
    color: "text-red-500",
    danger: true,
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl font-bold shadow-lg">
            🗡️
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CiberNinja</h1>
            <p className="text-xs text-gray-400 leading-none">Analytics</p>
          </div>
        </div>
      </div>

      {/* Menu Principal */}
      <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
        {menuItems.map(({ Icon, label, path, color }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-gray-800 text-white shadow-md border border-gray-700"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {/* Ícone com cor personalizada no hover e ativo */}
              <Icon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isActive ? color : `group-hover:${color}`
                }`}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Menu Inferior */}
      <div className="p-4 border-t border-gray-800 space-y-1">
        {bottomItems.map(({ Icon, label, path, color, danger }) => (
          <Link
            key={path}
            to={path}
            className="group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            {/* Ícone com cor no hover (e vermelho extra no logout) */}
            <Icon
              className={`w-5 h-5 transition-colors duration-200 group-hover:${color} ${
                danger ? "group-hover:text-red-500" : ""
              }`}
            />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}

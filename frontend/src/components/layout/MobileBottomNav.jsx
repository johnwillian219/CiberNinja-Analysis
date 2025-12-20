// src/components/layout/MobileBottomNav.jsx
import { Link, useLocation } from "react-router-dom";
import YoutubeIcon from "@icons/YoutubeIcon";
import TiktokIcon from "@icons/TiktokIcon";
import InstagramIcon from "@icons/InstagramIcon";
import FacebookIcon from "@icons/FacebookIcon";

const navItems = [
  {
    Icon: YoutubeIcon,
    label: "YouTube",
    path: "/youtube",
    color: "text-red-500",
    activeColor: "text-red-400",
  },
  {
    Icon: TiktokIcon,
    label: "TikTok",
    path: "/tiktok",
    color: "text-pink-500",
    activeColor: "text-pink-400",
  },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    path: "/instagram",
    color: "text-pink-400",
    activeColor: "text-pink-300",
  },
  {
    Icon: FacebookIcon,
    label: "Facebook",
    path: "/facebook",
    color: "text-blue-500",
    activeColor: "text-blue-400",
  },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-30">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map(({ Icon, label, path, color, activeColor }) => {
          const isActive = location.pathname.startsWith(path);

          return (
            <Link
              key={path}
              to={path}
              className={`
                flex flex-col items-center justify-center w-16 h-full
                transition-all duration-200
                ${isActive ? activeColor : "text-gray-500"}
                hover:text-white
              `}
            >
              <div
                className={`
                p-2 rounded-lg transition-all duration-200
                ${isActive ? "bg-gray-800/50" : "hover:bg-gray-800/30"}
              `}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

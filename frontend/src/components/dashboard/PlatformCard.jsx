// src/components/dashboard/PlatformCard.jsx
import { Link } from "react-router-dom";

export default function PlatformCard({
  platform,
  Icon,
  followers = "—",
  growth = "— este mês",
}) {
  return (
    <Link
      to={platform.path}
      className="bg-gray-800 p-6 rounded-xl shadow hover:bg-gray-700 transition group block"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{platform.name}</h2>
        <Icon className="w-10 h-10 group-hover:scale-110 transition" />
      </div>

      <p className="text-gray-400 text-sm">
        Total de {platform.followersLabel}
      </p>
      <p className="text-3xl font-bold mb-2">{followers}</p>

      <div className="flex items-center gap-2 text-green-400 text-sm">
        <span>↑</span>
        <span>{growth}</span>
      </div>

      {/* Mini sparkline placeholder */}
      <div className="mt-4 h-16 bg-gray-700/50 rounded-lg"></div>

      <div className="mt-4 text-right">
        <span className="text-sm text-cyan-400 hover:underline">
          Ver mais →
        </span>
      </div>
    </Link>
  );
}

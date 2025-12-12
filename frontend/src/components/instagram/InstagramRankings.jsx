// src/components/instagram/InstagramRankings.jsx
import {
  TrendingUp,
  TrendingDown,
  Flame,
  Trophy,
  AlertTriangle,
} from "lucide-react";

const top5 = [
  {
    rank: 1,
    title: "Aesthetic cyberpunk que você pediu",
    reach: "456K",
    change: "+89%",
  },
  {
    rank: 2,
    title: "Tutorial rápido: phishing em 60s",
    reach: "378K",
    change: "+124%",
  },
  {
    rank: 3,
    title: "Quando o algoritmo te ama",
    reach: "285K",
    change: "+67%",
  },
  { rank: 4, title: "Story highlight do dia", reach: "185K", change: "+41%" },
  {
    rank: 5,
    title: "Carrossel de dicas de segurança",
    reach: "128K",
    change: "+28%",
  },
];

const risingFast = [
  { title: "Tutorial rápido: phishing em 60s", growth: "+124%" },
  { title: "Aesthetic cyberpunk que você pediu", growth: "+89%" },
  { title: "Quando o algoritmo te ama", growth: "+67%" },
];

const needsAttention = [
  { title: "Post antigo sem stories", drop: "-72%" },
  { title: "Carrossel sem CTA", drop: "-58%" },
  { title: "Reel sem música trending", drop: "-49%" },
];

export default function InstagramRankings() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
      {/* TOP 5 */}
      <div className="bg-gradient-to-br from-pink-900/30 via-gray-900 to-gray-900 border border-pink-500/40 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Trophy className="w-9 h-9 text-pink-400" />
          <h3 className="text-2xl font-bold text-pink-400">Top 5 Semanal</h3>
        </div>
        <div className="space-y-5">
          {top5.map((video) => (
            <div key={video.rank} className="flex items-center gap-4 group">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all group-hover:scale-110 shadow-lg ${
                  video.rank === 1
                    ? "bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-yellow-500/40"
                    : video.rank === 2
                    ? "bg-gradient-to-br from-gray-400 to-gray-600 text-white"
                    : video.rank === 3
                    ? "bg-gradient-to-br from-orange-600 to-red-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                #{video.rank}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-base line-clamp-2 group-hover:text-pink-300 transition-colors">
                  {video.title}
                </p>
                <div className="flex items-center gap-4 mt-1 text-sm">
                  <span className="text-gray-400">{video.reach} alcance</span>
                  <span className="text-emerald-400 font-semibold">
                    {video.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBINDO RÁPIDO */}
      <div className="bg-gradient-to-br from-emerald-900/30 via-gray-900 to-gray-900 border border-emerald-500/40 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Flame className="w-9 h-9 text-emerald-400 animate-pulse" />
          <h3 className="text-2xl font-bold text-emerald-400">
            Subindo Rápido
          </h3>
        </div>
        <div className="space-y-5">
          {risingFast.map((video, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium line-clamp-2 group-hover:text-emerald-300 transition-colors">
                  {video.title}
                </p>
                <p className="text-emerald-400 font-bold text-lg mt-1">
                  {video.growth}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRECISA DE ATENÇÃO */}
      <div className="bg-gradient-to-br from-yellow-900/30 via-gray-900 to-gray-900 border border-yellow-500/40 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-3 mb-10">
          <AlertTriangle className="w-9 h-9 text-yellow-400" />
          <h3 className="text-2xl font-bold text-yellow-400">
            Precisa Atenção
          </h3>
        </div>
        <div className="space-y-5">
          {needsAttention.map((video, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full bg-yellow-500/20 border-2 border-yellow-500/60 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium line-clamp-2 group-hover:text-yellow-300 transition-colors">
                  {video.title}
                </p>
                <p className="text-red-400 font-bold text-lg mt-1">
                  {video.drop}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

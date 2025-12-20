// src/components/dashboard/TopVideosSection.jsx
import { useState } from "react";
import YoutubeIcon from "@icons/YoutubeIcon";
import {
  ExternalLink,
  PlayCircle,
  Film,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const longVideos = [
  {
    id: 1,
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    thumbnail: "https://img.youtube.com/vi/Y-I2sNGEOR4/maxresdefault.jpg",
    title:
      "Como Instalar o Kali Linux na VirtualBox | Aula 01 Laboratório Hacker",
    views: 125400,
    engagement: "9.8%",
    url: "https://youtu.be/Y-I2sNGEOR4",
  },
  {
    id: 2,
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    thumbnail: "https://img.youtube.com/vi/tHkUfI27H-g/maxresdefault.jpg",
    title: "Quebrar Senha ZIP no Kali Linux — Força Bruta Prática",
    views: 98700,
    engagement: "11.3%",
    url: "https://youtu.be/tHkUfI27H-g",
  },
  {
    id: 3,
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    thumbnail: "https://img.youtube.com/vi/AMMjxk7l_3Q/maxresdefault.jpg",
    title:
      "Como Instalar Ubuntu Server no VirtualBox | Aula 01 – Ubuntu Server",
    views: 456789,
    engagement: "15.6%",
    url: "https://youtu.be/AMMjxk7l_3Q",
  },
  {
    id: 4,
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    thumbnail: "https://img.youtube.com/vi/dXdfuyf5SZI/maxresdefault.jpg",
    title: "Hackers Mais Perigosos da História — Ataques Que Chocaram o Mundo",
    views: 178000,
    engagement: "19.1%",
    url: "https://youtu.be/dXdfuyf5SZI",
  },
];

const shortsReels = [
  {
    id: 5,
    platform: "YouTube Shorts",
    Icon: YoutubeIcon,
    color: "text-red-500",
    thumbnail: "https://img.youtube.com/vi/M-g-ZSNbVNc/maxresdefault.jpg",
    title: "Livros Proibidos de Hacking ⚔️",
    views: 2100000,
    engagement: "24.7%",
    url: "https://www.youtube.com/shorts/M-g-ZSNbVNc",
  },
  {
    id: 6,
    platform: "YouTube Shorts",
    Icon: YoutubeIcon,
    color: "text-red-500",
    thumbnail: "https://img.youtube.com/vi/kvjmMb_IQL4/maxresdefault.jpg",
    title: "Dark Web 🌐 5 Mitos Que Você Acredita!",
    views: 3200000,
    engagement: "31.2%",
    url: "https://www.youtube.com/shorts/kvjmMb_IQL4",
  },
  {
    id: 7,
    platform: "YouTube Shorts",
    Icon: YoutubeIcon,
    color: "text-red-500",
    thumbnail: "https://img.youtube.com/vi/yU7eieda398/maxresdefault.jpg",
    title: "🧪 Monte Seu Laboratório Hacker em Casa! 💻",
    views: 890000,
    engagement: "28.9%",
    url: "https://www.youtube.com/shorts/yU7eieda398",
  },
  {
    id: 8,
    platform: "YouTube Shorts",
    Icon: YoutubeIcon,
    color: "text-red-500",
    thumbnail: "https://img.youtube.com/vi/BTXxJtqwdMo/maxresdefault.jpg",
    title: "Projetos Python Sombrio 🐍",
    views: 4500000,
    engagement: "35.1%",
    url: "https://www.youtube.com/shorts/BTXxJtqwdMo",
  },
];

const VideoCard = ({ video }) => (
  <div
    className="group relative bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl overflow-hidden
                hover:border-cyan-500/50 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500
                hover:-translate-y-1 sm:hover:-translate-y-2"
  >
    <div className="relative aspect-video overflow-hidden">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <PlayCircle className="w-10 h-10 sm:w-16 sm:h-16 text-white/90 drop-shadow-2xl" />
      </div>

      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 p-1.5 sm:p-2 bg-black/70 backdrop-blur-sm rounded-lg">
        <video.Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${video.color}`} />
      </div>

      {video.platform.includes("Shorts") && (
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/80 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold text-emerald-400 border border-emerald-500/50">
          SHORT
        </div>
      )}
    </div>

    <div className="p-3 sm:p-5">
      <h4 className="font-semibold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors text-sm sm:text-base leading-tight">
        {video.title}
      </h4>

      <div className="flex items-center justify-between mt-3 sm:mt-4 text-sm">
        <div>
          <p className="text-gray-400 text-xs sm:text-sm">Views</p>
          <p className="text-lg sm:text-xl font-bold text-white">
            {video.views > 1000000
              ? (video.views / 1000000).toFixed(1) + "M"
              : (video.views / 1000).toFixed(1) + "K"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-xs sm:text-sm">Engajamento</p>
          <p className="text-lg sm:text-xl font-bold text-emerald-400">
            {video.engagement}
          </p>
        </div>
      </div>

      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 sm:mt-5 w-full inline-flex items-center justify-center gap-2 py-2 sm:py-3 px-3 sm:px-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg sm:rounded-xl text-cyan-400 font-medium text-sm sm:text-base transition-all group-hover:border-cyan-400"
      >
        Ver vídeo <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
      </a>
    </div>
  </div>
);

export default function TopVideosSection() {
  const [activeTab, setActiveTab] = useState("long");

  return (
    <section className="mt-10 sm:mt-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
            Top 8 Vídeos Mais Vistos
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Últimos 30 dias
          </p>
        </div>

        {/* Tabs - Stacked em mobile, inline em desktop */}
        <div className="flex gap-2 bg-gray-800/50 backdrop-blur-sm p-1 rounded-lg sm:rounded-xl border border-gray-700/50 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("long")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all ${
              activeTab === "long"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Film className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Vídeos Longos</span>
            <span className="xs:hidden">Longos</span>
          </button>
          <button
            onClick={() => setActiveTab("short")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base transition-all ${
              activeTab === "short"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Shorts & Reels</span>
            <span className="xs:hidden">Shorts</span>
          </button>
        </div>
      </div>

      {/* Grid - Scroll horizontal em mobile, grid em desktop */}
      <div className="relative">
        {/* Grid para desktop */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {(activeTab === "long" ? longVideos : shortsReels).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Scroll horizontal para mobile */}
        <div className="sm:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 min-w-max">
            {(activeTab === "long" ? longVideos : shortsReels).map((video) => (
              <div key={video.id} className="w-64 flex-shrink-0">
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de scroll para mobile */}
        <div className="sm:hidden flex justify-center gap-2 mt-4">
          <div className="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-600"></div>
        </div>
      </div>
    </section>
  );
}

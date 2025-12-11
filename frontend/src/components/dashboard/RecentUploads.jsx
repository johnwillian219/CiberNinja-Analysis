// src/components/dashboard/RecentUploads.jsx
import YoutubeIcon from "@icons/YoutubeIcon";
import TiktokIcon from "@icons/TiktokIcon";
import InstagramIcon from "@icons/InstagramIcon";
import { Calendar, Eye, Zap } from "lucide-react";

const recentUploads = [
  {
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    date: "2025-12-10",
    title: "Hackers Mais Perigosos da História — Ataques Que Chocaram o Mundo",
    initialViews: 45600,
    status: "forte",
  },
  {
    platform: "TikTok",
    Icon: TiktokIcon,
    color: "text-pink-500",
    date: "2025-12-09",
    title: "POV: Você entra no servidor errado",
    initialViews: 89000,
    status: "forte",
  },
  {
    platform: "Instagram",
    Icon: InstagramIcon,
    color: "text-pink-400",
    date: "2025-12-09",
    title: "Quando o firewall falha e vira meme",
    initialViews: 34000,
    status: "médio",
  },
  {
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    date: "2025-12-08",
    title: "Como Instalar Kali Linux na VirtualBox — Aula Completa",
    initialViews: 67800,
    status: "forte",
  },
  {
    platform: "TikTok",
    Icon: TiktokIcon,
    color: "text-pink-500",
    date: "2025-12-07",
    title: "Hackeando o algoritmo em 15 segundos",
    initialViews: 120000,
    status: "forte",
  },
  {
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    date: "2025-12-06",
    title: "Quebrar Senha ZIP no Kali — Força Bruta Prática",
    initialViews: 29000,
    status: "médio",
  },
  {
    platform: "Instagram",
    Icon: InstagramIcon,
    color: "text-pink-400",
    date: "2025-12-05",
    title: "Aesthetic cyberpunk que você pediu",
    initialViews: 18000,
    status: "fraco",
  },
  {
    platform: "TikTok",
    Icon: TiktokIcon,
    color: "text-pink-500",
    date: "2025-12-04",
    title: "Quando o beat dropa e você entra na Matrix",
    initialViews: 67000,
    status: "médio",
  },
  {
    platform: "YouTube",
    Icon: YoutubeIcon,
    color: "text-red-500",
    date: "2025-12-03",
    title: "Live: Invadindo a Deep Web ao vivo (não entre)",
    initialViews: 98000,
    status: "forte",
  },
  {
    platform: "Instagram",
    Icon: InstagramIcon,
    color: "text-pink-400",
    date: "2025-12-02",
    title: "Tutorial rápido: phishing em 60 segundos",
    initialViews: 12000,
    status: "fraco",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "forte":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
    case "médio":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    case "fraco":
      return "bg-red-500/20 text-red-400 border-red-500/50";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/50";
  }
};

export default function RecentUploads() {
  return (
    <section className="mt-16">
      {/* Título */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold text-white">
            Últimos Uploads
          </h3>
          <p className="text-gray-400 mt-1">
            Os 10 vídeos mais recentes • Análise inicial da IA
          </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400">
          <Zap className="w-5 h-5 animate-pulse" />
          <span className="text-sm font-medium">Monitoramento ativo</span>
        </div>
      </div>

      {/* Lista */}
      <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
        <div className="divide-y divide-gray-700/50">
          {recentUploads.map((video, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 p-5 hover:bg-gray-800/50 transition-all duration-300"
            >
              {/* Plataforma */}
              <div className={`p-3 rounded-xl bg-gray-900/70 ${video.color}`}>
                <video.Icon className="w-6 h-6" />
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 text-sm text-gray-400 mb-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(video.date).toLocaleDateString("pt-BR")}
                  </div>
                  <span>•</span>
                  <span>{video.platform}</span>
                </div>
                <h4 className="font-medium text-white truncate group-hover:text-cyan-300 transition-colors">
                  {video.title}
                </h4>
              </div>

              {/* Views iniciais */}
              <div className="text-right">
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-1">
                  <Eye className="w-4 h-4" />
                  Views iniciais
                </div>
                <p className="text-xl font-bold text-white">
                  {video.initialViews > 1000
                    ? (video.initialViews / 1000).toFixed(1) + "K"
                    : video.initialViews.toLocaleString("pt-BR")}
                </p>
              </div>

              {/* Status IA */}
              <div className="ml-6">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusStyle(
                    video.status
                  )}`}
                >
                  {video.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

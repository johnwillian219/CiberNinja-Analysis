// src/components/instagram/InstagramVideosTable.jsx
import { PlayCircle, Filter } from "lucide-react";

const videos = [
  {
    title: "Aesthetic cyberpunk que você pediu",
    views: 456000,
    likes: 89200,
    comments: 4200,
    engagement: "18.9%",
    date: "10/12",
    status: "VIRAL",
    type: "Reel",
  },
  {
    title: "Tutorial rápido: phishing em 60s",
    views: 378000,
    likes: 67800,
    comments: 3200,
    engagement: "16.2%",
    date: "09/12",
    status: "FORTE",
    type: "Reel",
  },
  {
    title: "Quando o algoritmo te ama",
    views: 285000,
    likes: 51200,
    comments: 2800,
    engagement: "14.1%",
    date: "08/12",
    status: "FORTE",
    type: "Post",
  },
  {
    title: "Story highlight do dia",
    views: 185000,
    likes: 32500,
    comments: 1800,
    engagement: "11.8%",
    date: "05/12",
    status: "MÉDIO",
    type: "Story",
  },
  {
    title: "Carrossel de dicas de segurança",
    views: 128000,
    likes: 19800,
    comments: 1200,
    engagement: "9.2%",
    date: "03/12",
    status: "MÉDIO",
    type: "Carrossel",
  },
];

export default function InstagramVideosTable() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 mb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Conteúdos Recentes
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Últimos 30 dias • Ordenado por alcance
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-6 py-3.5 bg-gray-700/80 rounded-2xl text-gray-300 hover:bg-gray-600 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
          <select className="px-6 py-3.5 bg-gray-700/80 rounded-2xl text-white outline-none cursor-pointer hover:bg-gray-600 transition-all">
            <option>Últimos 30 dias</option>
            <option>Últimos 7 dias</option>
            <option>Todos os tempos</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm font-medium border-b border-gray-700 pb-6">
              <th className="pb-6 pr-8">Conteúdo</th>
              <th className="pb-6 pr-8 text-center">Alcance</th>
              <th className="pb-6 pr-8 text-center">Likes</th>
              <th className="pb-6 pr-8 text-center">Comentários</th>
              <th className="pb-6 pr-8 text-center">Engajamento</th>
              <th className="pb-6 pr-8 text-center">Data</th>
              <th className="pb-6 text-center">Status IA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {videos.map((video, i) => (
              <tr
                key={i}
                className="hover:bg-gray-700/30 transition-all duration-200 group"
              >
                <td className="py-7 pr-8">
                  <div className="flex items-center gap-5">
                    <div className="w-24 h-15 bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                      <PlayCircle className="w-14 h-14 text-gray-500" />
                    </div>
                    <div className="max-w-xs">
                      <p className="text-white font-medium text-base leading-tight line-clamp-2 group-hover:text-pink-300 transition-colors">
                        {video.title}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">{video.type}</p>
                    </div>
                  </div>
                </td>
                <td className="py-7 text-center text-white font-bold text-lg">
                  {(video.views / 1000).toFixed(0)}K
                </td>
                <td className="py-7 text-center text-white font-medium">
                  {(video.likes / 1000).toFixed(0)}K
                </td>
                <td className="py-7 text-center text-white font-medium">
                  {(video.comments / 1000).toFixed(1)}K
                </td>
                <td className="py-7 text-center text-emerald-400 font-bold text-lg">
                  {video.engagement}
                </td>
                <td className="py-7 text-center text-gray-400">{video.date}</td>
                <td className="py-7 text-center">
                  <span
                    className={`inline-block px-5 py-2.5 rounded-full text-sm font-bold border ${
                      video.status === "VIRAL"
                        ? "bg-pink-500/20 text-pink-400 border-pink-500/60"
                        : video.status === "FORTE"
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/60"
                        : video.status === "MÉDIO"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/60"
                        : "bg-gray-500/20 text-gray-400 border-gray-500/60"
                    }`}
                  >
                    {video.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// src/components/youtube/YouTubeVideosTable.jsx
import { PlayCircle, Filter, Calendar } from "lucide-react";

const videos = [
  {
    title: "Hackeando o Algoritmo do YouTube em 2025",
    views: 215000,
    likes: 12800,
    comments: 890,
    engagement: "9.8%",
    date: "10/12",
    status: "VIRAL",
    type: "Vídeo",
  },
  {
    title: "POV: Você é o admin do servidor",
    views: 178000,
    likes: 15200,
    comments: 2100,
    engagement: "12.4%",
    date: "09/12",
    status: "FORTE",
    type: "Short",
  },
  {
    title: "Como Instalar Kali Linux 2025",
    views: 148000,
    likes: 9800,
    comments: 670,
    engagement: "8.1%",
    date: "08/12",
    status: "FORTE",
    type: "Vídeo",
  },
  {
    title: "Quando o firewall falha",
    views: 82000,
    likes: 5600,
    comments: 420,
    engagement: "6.9%",
    date: "05/12",
    status: "MÉDIO",
    type: "Short",
  },
  {
    title: "Live: Invadindo a Deep Web",
    views: 52000,
    likes: 3200,
    comments: 180,
    engagement: "4.2%",
    date: "03/12",
    status: "FRACO",
    type: "Vídeo",
  },
];

export default function YouTubeVideosTable() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 mb-12">
      {/* Cabeçalho */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Vídeos Recentes
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Últimos 30 dias • Ordenado por visualizações
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-3 px-6 py-3.5 bg-gray-700/80 backdrop-blur-sm rounded-2xl text-gray-300 hover:bg-gray-600 hover:text-white transition-all">
            <Filter className="w-5 h-5" />
            Filtros
          </button>
          <select className="px-6 py-3.5 bg-gray-700/80 backdrop-blur-sm rounded-2xl text-white outline-none cursor-pointer hover:bg-gray-600 transition-all">
            <option>Últimos 30 dias</option>
            <option>Últimos 7 dias</option>
            <option>Todos os tempos</option>
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm font-medium border-b border-gray-700 pb-6">
              <th className="pb-6 pr-8">Vídeo</th>
              <th className="pb-6 pr-8 text-center">Views</th>
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
                {/* Vídeo + Thumbnail */}
                <td className="py-7 pr-8">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="w-24 h-14 bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                        <PlayCircle className="w-12 h-12 text-gray-500" />
                      </div>
                      {video.type === "Short" && (
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                          SHORT
                        </span>
                      )}
                    </div>
                    <div className="max-w-xs">
                      <p className="text-white font-medium text-base leading-tight line-clamp-2 group-hover:text-cyan-300 transition-colors">
                        {video.title}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">{video.type}</p>
                    </div>
                  </div>
                </td>

                {/* Views */}
                <td className="py-7 text-center">
                  <p className="text-white font-bold text-lg">
                    {video.views.toLocaleString("pt-BR")}
                  </p>
                </td>

                {/* Likes */}
                <td className="py-7 text-center">
                  <p className="text-white font-medium">
                    {video.likes.toLocaleString("pt-BR")}
                  </p>
                </td>

                {/* Comentários */}
                <td className="py-7 text-center">
                  <p className="text-white font-medium">{video.comments}</p>
                </td>

                {/* Engajamento */}
                <td className="py-7 text-center">
                  <p className="text-emerald-400 font-bold text-lg">
                    {video.engagement}
                  </p>
                </td>

                {/* Data */}
                <td className="py-7 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{video.date}</span>
                  </div>
                </td>

                {/* Status IA */}
                <td className="py-7 text-center">
                  <span
                    className={`inline-block px-5 py-2.5 rounded-full text-sm font-bold border ${
                      video.status === "VIRAL"
                        ? "bg-red-500/20 text-red-400 border-red-500/60"
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

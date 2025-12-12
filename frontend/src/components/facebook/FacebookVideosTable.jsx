// src/components/facebook/FacebookVideosTable.jsx
import { PlayCircle, Filter } from "lucide-react";

const videos = [
  {
    title: "Dicas de segurança para iniciantes",
    views: 215000,
    reactions: 45600,
    comments: 3200,
    engagement: "12.8%",
    date: "10/12",
    status: "FORTE",
    type: "Vídeo",
  },
  {
    title: "Live: Respondendo dúvidas de cibersegurança",
    views: 178000,
    reactions: 38900,
    comments: 2800,
    engagement: "11.2%",
    date: "09/12",
    status: "FORTE",
    type: "Live",
  },
  {
    title: "Carrossel: 10 ferramentas essenciais",
    views: 148000,
    reactions: 31200,
    comments: 2100,
    engagement: "9.8%",
    date: "08/12",
    status: "MÉDIO",
    type: "Carrossel",
  },
  {
    title: "Meme do dia sobre hackers",
    views: 82000,
    reactions: 18500,
    comments: 1500,
    engagement: "8.1%",
    date: "05/12",
    status: "MÉDIO",
    type: "Imagem",
  },
  {
    title: "Anúncio de novo curso",
    views: 52000,
    reactions: 9800,
    comments: 890,
    engagement: "6.4%",
    date: "03/12",
    status: "FRACO",
    type: "Anúncio",
  },
];

export default function FacebookVideosTable() {
  return (
    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 mb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Publicações Recentes
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
              <th className="pb-6 pr-8">Publicação</th>
              <th className="pb-6 pr-8 text-center">Alcance</th>
              <th className="pb-6 pr-8 text-center">Reações</th>
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
                    <div className="w-24 h-16 bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                      <PlayCircle className="w-14 h-14 text-gray-500" />
                    </div>
                    <div className="max-w-xs">
                      <p className="text-white font-medium text-base leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors">
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
                  {(video.reactions / 1000).toFixed(1)}K
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
                      video.status === "FORTE"
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

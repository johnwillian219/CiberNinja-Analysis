// src/pages/monetization/YouTubeMonetizationPage.jsx
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  Youtube,
  CheckCircle,
  XCircle,
  Euro,
  Calendar,
  Filter,
} from "lucide-react";
import { useState } from "react";

const monetizationRequirements = [
  { label: "1.000 inscritos", achieved: true, current: 17420 },
  {
    label: "4.000 horas de exibição nos últimos 12 meses",
    achieved: true,
    current: 124500,
  },
  { label: "Sem strikes ativos", achieved: true },
  { label: "Conta AdSense vinculada", achieved: true },
];

const monthlyRevenue = [
  { month: "Dezembro 2025", revenue: 320 },
  { month: "Novembro 2025", revenue: 285 },
  { month: "Outubro 2025", revenue: 310 },
  { month: "Setembro 2025", revenue: 268 },
  { month: "Agosto 2025", revenue: 295 },
  { month: "Julho 2025", revenue: 278 },
];

const topRevenueVideos = [
  {
    title: "Hackeando o Algoritmo do YouTube em 2025",
    views: "215K",
    revenue: 98,
  },
  { title: "Live: Invadindo a Deep Web", views: "148K", revenue: 72 },
  { title: "Como Instalar Kali Linux 2025", views: "98K", revenue: 55 },
  { title: "POV: Você é o admin do servidor", views: "82K", revenue: 48 },
  { title: "Quando o firewall falha", views: "52K", revenue: 32 },
  { title: "Top 5 ferramentas de hacking em 2025", views: "45K", revenue: 15 },
];

export default function YouTubeMonetizationPage() {
  const [selectedYear, setSelectedYear] = useState("2025");

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        {/* Cabeçalho */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Youtube className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">YouTube</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-emerald-400 rounded-full" />
                  <span className="text-emerald-400 font-bold text-xl">
                    Monetizado
                  </span>
                </div>
                <span className="text-gray-400 text-lg">
                  • Partner Program ativo
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-xl">
            Ganhos, requisitos e vídeos mais rentáveis
          </p>
        </div>

        {/* Requisitos de monetização */}
        <div className="mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
            Requisitos do Partner Program
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monetizationRequirements.map((req, i) => (
              <div
                key={i}
                className={`bg-gray-800/70 backdrop-blur-sm border ${
                  req.achieved ? "border-emerald-500/50" : "border-gray-700/50"
                } rounded-2xl p-6 flex items-center gap-5`}
              >
                {req.achieved ? (
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-400" />
                )}
                <div>
                  <p className="text-white font-medium text-lg">{req.label}</p>
                  {req.current && (
                    <p className="text-emerald-400 text-sm mt-1">
                      Atual: {req.current.toLocaleString("pt-BR")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ganhos mensais */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              Histórico de Ganhos
            </h2>
            <select className="px-6 py-3.5 bg-gray-700/80 rounded-2xl text-white outline-none hover:bg-gray-600 transition-all">
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>

          <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700/50 text-left text-gray-300">
                  <th className="px-8 py-5">Mês</th>
                  <th className="px-8 py-5 text-right">Ganhos</th>
                  <th className="px-8 py-5 text-right">Variação</th>
                </tr>
              </thead>
              <tbody>
                {monthlyRevenue.map((month, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-700/30 hover:bg-gray-700/20 transition-all"
                  >
                    <td className="px-8 py-6 text-white font-medium">
                      {month.month}
                    </td>
                    <td className="px-8 py-6 text-right text-emerald-400 font-bold text-xl">
                      €{month.revenue}
                    </td>
                    <td className="px-8 py-6 text-right">
                      {i === 0 ? (
                        <span className="text-emerald-400 font-medium">
                          +12.3%
                        </span>
                      ) : i === monthlyRevenue.length - 1 ? (
                        <span className="text-red-400 font-medium">-8.7%</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top vídeos rentáveis */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
            Vídeos que Mais Geraram Receita
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRevenueVideos.map((video, i) => (
              <div
                key={i}
                className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl font-bold text-emerald-400">
                    #{i + 1}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {video.views} views
                  </span>
                </div>
                <p className="text-white font-medium mb-4 line-clamp-2">
                  {video.title}
                </p>
                <div className="flex items-center gap-3">
                  <Euro className="w-6 h-6 text-emerald-400" />
                  <p className="text-2xl font-bold text-emerald-400">
                    €{video.revenue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

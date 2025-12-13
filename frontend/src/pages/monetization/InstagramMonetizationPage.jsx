// src/pages/monetization/InstagramMonetizationPage.jsx
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Instagram, CheckCircle, XCircle, Euro } from "lucide-react";

const monetizationRequirements = [
  { label: "10.000 seguidores", achieved: true, current: 18450 },
  { label: "Conta profissional (Creator ou Business)", achieved: true },
  { label: "Cumprir diretrizes de monetização do Instagram", achieved: true },
  { label: "Branded Content Tools ativados", achieved: true },
  { label: "Elegível para Bonus de Reels", achieved: false },
  { label: "Elegível para Subscriptions", achieved: false },
];

const monthlyRevenue = [
  { month: "Dezembro 2025", revenue: 145 },
  { month: "Novembro 2025", revenue: 132 },
  { month: "Outubro 2025", revenue: 158 },
  { month: "Setembro 2025", revenue: 140 },
  { month: "Agosto 2025", revenue: 128 },
  { month: "Julho 2025", revenue: 115 },
];

const topRevenueContent = [
  {
    title: "Reel: Aesthetic cyberpunk que você pediu",
    reach: "456K",
    revenue: 52,
  },
  { title: "Carrossel: 10 ferramentas essenciais", reach: "378K", revenue: 38 },
  { title: "Reel: Tutorial rápido de phishing", reach: "285K", revenue: 28 },
  { title: "Story highlight com poll", reach: "185K", revenue: 18 },
  { title: "Post patrocinado (Branded Content)", reach: "128K", revenue: 9 },
  {
    title: "IGTV: Entrevista com especialista em segurança",
    reach: "142K",
    revenue: 0,
  },
];

export default function InstagramMonetizationPage() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        {/* Cabeçalho */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Instagram className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">Instagram</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-yellow-400 rounded-full" />
                  <span className="text-yellow-400 font-bold text-xl">
                    Parcialmente Monetizado
                  </span>
                </div>
                <span className="text-gray-400 text-lg">
                  • Branded Content + Bonus de Reels (em análise)
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-xl">
            Ganhos, requisitos e conteúdos mais rentáveis
          </p>
        </div>

        {/* Requisitos de monetização */}
        <div className="mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
            Requisitos de Monetização
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monetizationRequirements.map((req, i) => (
              <div
                key={i}
                className={`bg-gray-800/70 backdrop-blur-sm border ${
                  req.achieved
                    ? "border-emerald-500/50"
                    : "border-yellow-500/50"
                } rounded-2xl p-6 flex items-center gap-5`}
              >
                {req.achieved ? (
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                ) : (
                  <XCircle className="w-10 h-10 text-yellow-400" />
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
                          +9.8%
                        </span>
                      ) : i === monthlyRevenue.length - 1 ? (
                        <span className="text-red-400 font-medium">-12.7%</span>
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

        {/* Top conteúdos rentáveis */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8">
            Conteúdos que Mais Geraram Receita
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRevenueContent.map((content, i) => (
              <div
                key={i}
                className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl font-bold text-purple-400">
                    #{i + 1}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {content.reach} alcance
                  </span>
                </div>
                <p className="text-white font-medium mb-4 line-clamp-2">
                  {content.title}
                </p>
                <div className="flex items-center gap-3">
                  <Euro className="w-6 h-6 text-purple-400" />
                  <p className="text-2xl font-bold text-purple-400">
                    €{content.revenue}
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

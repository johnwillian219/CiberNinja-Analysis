// src/pages/monetization/TikTokMonetizationPage.jsx
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  Music,
  CheckCircle,
  XCircle,
  Euro,
  Calendar,
  Filter,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  AlertCircle,
  Link,
  BarChart3,
  Video,
  Sparkles,
  MoreVertical,
  PlayCircle,
  DollarSign,
  Target,
  Zap,
  Download,
  RefreshCw,
  Heart,
  Share2,
  MessageCircle,
  Gift,
  ExternalLink,
  Mic,
  Diamond,
  Flame,
  Star,
  Coffee,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";
import { useState, useEffect } from "react";

const monetizationRequirements = [
  {
    label: "10K seguidores",
    achieved: true,
    current: 28450,
    icon: Users,
    description: "Mínimo necessário para monetização",
    progress: 100,
    color: "from-pink-500 to-rose-500",
  },
  {
    label: "100K views",
    sublabel: "últimos 30 dias",
    achieved: true,
    current: 5200000,
    icon: Eye,
    description: "Visualizações válidas",
    progress: 100,
    color: "from-purple-500 to-indigo-500",
  },
  {
    label: "Idade 18+",
    achieved: true,
    icon: AlertCircle,
    description: "Verificação de idade",
    progress: 100,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Conta ativa",
    achieved: true,
    icon: Link,
    description: "Sem violações",
    progress: 100,
    color: "from-emerald-500 to-green-500",
  },
  {
    label: "Creator Fund",
    achieved: true,
    icon: Diamond,
    description: "Programa ativado",
    progress: 100,
    color: "from-yellow-500 to-amber-500",
  },
];

const monthlyRevenue = [
  {
    month: "Dez 2025",
    revenue: 185,
    change: "+10.1%",
    trend: "up",
    views: "2.1M",
    gifts: 42,
    engagement: "8.4%",
  },
  {
    month: "Nov 2025",
    revenue: 168,
    change: "-8.9%",
    trend: "down",
    views: "1.8M",
    gifts: 38,
    engagement: "7.9%",
  },
  {
    month: "Out 2025",
    revenue: 192,
    change: "+9.7%",
    trend: "up",
    views: "2.3M",
    gifts: 45,
    engagement: "9.1%",
  },
  {
    month: "Set 2025",
    revenue: 175,
    change: "+10.8%",
    trend: "up",
    views: "1.9M",
    gifts: 41,
    engagement: "8.2%",
  },
  {
    month: "Ago 2025",
    revenue: 158,
    change: "+11.3%",
    trend: "up",
    views: "1.7M",
    gifts: 37,
    engagement: "7.6%",
  },
  {
    month: "Jul 2025",
    revenue: 142,
    change: "-11.4%",
    trend: "down",
    views: "1.5M",
    gifts: 32,
    engagement: "7.1%",
  },
  {
    month: "Jun 2025",
    revenue: 156,
    change: "+8.2%",
    trend: "up",
    views: "1.6M",
    gifts: 35,
    engagement: "7.8%",
  },
  {
    month: "Mai 2025",
    revenue: 145,
    change: "-6.9%",
    trend: "down",
    views: "1.4M",
    gifts: 31,
    engagement: "7.3%",
  },
];

const topRevenueVideos = [
  {
    id: 1,
    title: "POV: Você entra no servidor errado",
    views: "2.1M",
    revenue: 68,
    duration: "0:15",
    thumbnailColor: "from-pink-500 to-rose-500",
    published: "2 semanas atrás",
    likes: "245K",
    shares: "18K",
    gifts: 124,
    engagement: "12.8%",
  },
  {
    id: 2,
    title: "Quando o beat dropa e vira meme",
    views: "1.6M",
    revenue: 52,
    duration: "0:21",
    thumbnailColor: "from-purple-500 to-indigo-500",
    published: "1 mês atrás",
    likes: "192K",
    shares: "14K",
    gifts: 98,
    engagement: "11.2%",
  },
  {
    id: 3,
    title: "Hackeando o algoritmo em 15s",
    views: "1.2M",
    revenue: 38,
    duration: "0:15",
    thumbnailColor: "from-blue-500 to-cyan-500",
    published: "3 semanas atrás",
    likes: "158K",
    shares: "9.8K",
    gifts: 72,
    engagement: "10.5%",
  },
  {
    id: 4,
    title: "Tutorial rápido: phishing em 60s",
    views: "780K",
    revenue: 28,
    duration: "0:58",
    thumbnailColor: "from-emerald-500 to-green-500",
    published: "2 meses atrás",
    likes: "98K",
    shares: "6.4K",
    gifts: 48,
    engagement: "9.3%",
  },
  {
    id: 5,
    title: "Live: Testando exploits ao vivo",
    views: "520K",
    revenue: 19,
    duration: "15:32",
    thumbnailColor: "from-yellow-500 to-amber-500",
    published: "1 mês atrás",
    likes: "64K",
    shares: "4.2K",
    gifts: 31,
    engagement: "8.7%",
  },
  {
    id: 6,
    title: "Desafio viral: Segurança em 2025",
    views: "430K",
    revenue: 10,
    duration: "0:37",
    thumbnailColor: "from-orange-500 to-red-500",
    published: "4 dias atrás",
    likes: "52K",
    shares: "3.8K",
    gifts: 18,
    engagement: "7.9%",
  },
];

export default function TikTokMonetizationPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [timeRange, setTimeRange] = useState("6M");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cálculos
  const totalRevenue = monthlyRevenue.reduce(
    (sum, month) => sum + month.revenue,
    0
  );
  const avgRevenue = (totalRevenue / monthlyRevenue.length).toFixed(0);
  const totalViews = monthlyRevenue.reduce((sum, month) => {
    const views = parseFloat(month.views.replace("M", "")) * 1000000;
    return sum + views;
  }, 0);
  const totalGifts = monthlyRevenue.reduce(
    (sum, month) => sum + month.gifts,
    0
  );
  const avgEngagement = (
    monthlyRevenue.reduce(
      (sum, month) => sum + parseFloat(month.engagement.replace("%", "")),
      0
    ) / monthlyRevenue.length
  ).toFixed(1);

  const visibleData = monthlyRevenue.slice(0, timeRange === "6M" ? 6 : 8);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-pink-950/10">
        {/* Header Fixo - z-index alto */}
        <div
          className={`sticky top-0 z-[100] transition-all duration-300 ${
            isScrolled
              ? "bg-gray-900/95 backdrop-blur-xl border-b border-pink-500/20 shadow-xl"
              : "bg-transparent"
          }`}
        >
          <div className="px-4 md:px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
                    <Music className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-white">
                    Monetização TikTok
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400 text-xs md:text-sm font-semibold">
                        Creator Fund Ativo
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs hidden sm:inline">
                      • Desde Fev 2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white hover:bg-gray-700/50 transition-all active:scale-95">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Exportar</span>
                </button>
                <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-pink-500/25">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden xs:inline">Criar Vídeo</span>
                  <span className="xs:hidden">Criar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:p-6 lg:p-8 space-y-8 pb-20">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-pink-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Euro className="w-5 h-5 text-emerald-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Receita Total</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                €{totalRevenue}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-emerald-400 text-xs font-semibold">
                  +24.3% vs 2024
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-pink-500/20 rounded-lg">
                  <Eye className="w-5 h-5 text-pink-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Visualizações</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {(totalViews / 1000000).toFixed(1)}M
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-emerald-400 text-xs font-semibold">
                  +32.7% vs 2024
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Gift className="w-5 h-5 text-blue-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Presentes</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {totalGifts}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-emerald-400 text-xs font-semibold">
                  +18.9% vs 2024
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-yellow-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="text-emerald-400 text-sm font-semibold">
                  {Math.min((avgRevenue / 200) * 100, 100).toFixed(0)}%
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Meta Mensal</p>
              <p className="text-white text-2xl md:text-3xl font-bold">€200</p>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-3">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min((avgRevenue / 200) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Seção Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Status Monetização */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Status Fund
                  </h2>
                  <button className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors">
                    <RefreshCw className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-4">
                  {monetizationRequirements.map((req, i) => {
                    const Icon = req.icon;
                    return (
                      <div key={i} className="group">
                        <div
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] ${
                            req.achieved
                              ? "bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30"
                              : "bg-gray-700/30 border border-gray-600/30"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-r ${req.color}`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">
                              {req.label}
                            </p>
                            {req.sublabel && (
                              <p className="text-gray-400 text-xs mt-0.5">
                                {req.sublabel}
                              </p>
                            )}
                            {req.current && (
                              <div className="flex items-center justify-between mt-2">
                                <p className="text-emerald-400 text-sm font-bold">
                                  {formatNumber(req.current)}{" "}
                                  {req.label.includes("views")
                                    ? "views"
                                    : "segs."}
                                </p>
                              </div>
                            )}
                          </div>
                          {req.achieved ? (
                            <CheckCircle className="w-6 h-6 text-emerald-400 animate-pulse" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-400" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tabela de Receita */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <TrendingUpIcon className="w-5 h-5 text-emerald-400" />
                      Histórico de Ganhos
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      Performance mensal {selectedYear}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex bg-gray-800/50 p-1 rounded-xl">
                      {["6M", "1A"].map((range) => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            timeRange === range
                              ? "bg-gray-600 text-white"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-sm outline-none hover:bg-gray-800 transition-colors"
                    >
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>

                {/* Desktop: Tabela normal */}
                <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-700/30">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-700/20 text-left">
                        <th className="p-4 text-gray-300 text-sm font-medium">
                          Mês
                        </th>
                        <th className="p-4 text-gray-300 text-sm font-medium text-right">
                          Receita
                        </th>
                        <th className="p-4 text-gray-300 text-sm font-medium text-right">
                          Variação
                        </th>
                        <th className="p-4 text-gray-300 text-sm font-medium text-right">
                          Visualizações
                        </th>
                        <th className="p-4 text-gray-300 text-sm font-medium text-right">
                          Presentes
                        </th>
                        <th className="p-4 text-gray-300 text-sm font-medium text-right">
                          Engajamento
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleData.map((month, i) => (
                        <tr
                          key={i}
                          className="border-t border-gray-700/20 hover:bg-gray-700/10 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-white font-medium">
                                {month.month}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Euro className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-400 font-bold text-lg">
                                €{month.revenue}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                                month.trend === "up"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {month.trend === "up" ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {month.change}
                            </div>
                          </td>
                          <td className="p-4 text-right text-gray-300 font-medium">
                            {month.views}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Gift className="w-4 h-4 text-pink-400" />
                              <span className="text-pink-400 font-medium">
                                {month.gifts}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right text-blue-400 font-medium">
                            {month.engagement}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile: Cards scroll horizontal */}
                <div className="md:hidden -mx-6 px-6 overflow-x-auto pb-4">
                  <div className="flex gap-4 min-w-max">
                    {visibleData.map((month, i) => (
                      <div
                        key={i}
                        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 min-w-64 hover:border-pink-500/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <span className="text-white font-semibold">
                              {month.month}
                            </span>
                          </div>
                          <div
                            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                              month.trend === "up"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {month.trend === "up" ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            {month.change}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Receita</span>
                            <span className="flex items-center gap-1 text-emerald-400 font-bold text-lg">
                              <Euro className="w-4 h-4" />€{month.revenue}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Views</span>
                            <span className="text-white">{month.views}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Presentes</span>
                            <span className="flex items-center gap-1 text-pink-400">
                              <Gift className="w-4 h-4" />
                              {month.gifts}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Engajamento</span>
                            <span className="text-blue-400">
                              {month.engagement}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Vídeos */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <Video className="w-6 h-6 text-pink-400" />
                  Top Vídeos por Receita
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Vídeos com maior engajamento e presentes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRevenueVideos.map((video) => (
                <div
                  key={video.id}
                  className="group bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div
                    className={`relative h-48 bg-gradient-to-r ${video.thumbnailColor}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur text-white text-sm font-bold rounded-full shadow-lg">
                        #{video.id}
                      </span>
                      <span className="px-2 py-1 bg-black/80 backdrop-blur text-white text-xs rounded flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" />
                        {video.duration}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <span className="px-3 py-1.5 bg-black/80 backdrop-blur text-white text-sm rounded-lg">
                        {video.views}
                      </span>
                      <span className="px-3 py-1.5 bg-emerald-500/90 backdrop-blur text-white font-bold rounded-lg flex items-center gap-1 shadow-lg">
                        <Euro className="w-4 h-4" />€{video.revenue}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-pink-300 transition-colors leading-tight">
                      {video.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {video.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        {video.shares}
                      </span>
                      <span className="flex items-center gap-1">
                        <Gift className="w-4 h-4" />
                        {video.gifts}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-700/30">
                      <span className="text-gray-400 text-sm">
                        {video.published}
                      </span>
                      <span
                        className={`font-semibold ${
                          parseFloat(video.engagement) > 10
                            ? "text-emerald-400"
                            : parseFloat(video.engagement) > 8
                            ? "text-pink-400"
                            : "text-gray-400"
                        }`}
                      >
                        {video.engagement} eng.
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Detail Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${selectedVideo.thumbnailColor}`}
                >
                  <Video className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Análise do Vídeo
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm">Título</div>
                <div className="text-white font-semibold text-lg">
                  {selectedVideo.title}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-3">
                  <div className="text-gray-400 text-sm">Receita</div>
                  <div className="text-emerald-400 text-2xl font-bold">
                    €{selectedVideo.revenue}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-3">
                  <div className="text-gray-400 text-sm">Visualizações</div>
                  <div className="text-white text-2xl font-bold">
                    {selectedVideo.views}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-4">
                <div className="text-pink-300 font-semibold mb-2">
                  Engajamento
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Likes:</span>
                    <span className="text-white font-semibold">
                      {selectedVideo.likes}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Compart.:</span>
                    <span className="text-white font-semibold">
                      {selectedVideo.shares}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Presentes:</span>
                    <span className="text-pink-400 font-semibold">
                      {selectedVideo.gifts}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Taxa:</span>
                    <span className="text-white font-semibold">
                      {selectedVideo.engagement}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver no TikTok
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

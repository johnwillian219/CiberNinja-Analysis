// src/pages/monetization/YouTubeMonetizationPage.jsx
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  Youtube,
  CheckCircle,
  XCircle,
  Euro,
  Calendar,
  Filter,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  AlertCircle,
  Link,
  BarChart3,
  Video,
  Sparkles,
  MoreVertical,
  PlayCircle,
  Eye,
  DollarSign,
  Target,
  Zap,
  Download,
  RefreshCw,
  Heart,
  Share2,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";

const monetizationRequirements = [
  {
    label: "1.000 inscritos",
    achieved: true,
    current: 17420,
    icon: Users,
    description: "Mínimo necessário para monetização",
    progress: 100,
    color: "from-red-500 to-orange-500",
  },
  {
    label: "4.000 horas",
    sublabel: "últimos 12 meses",
    achieved: true,
    current: 124500,
    icon: Clock,
    description: "Horas de reprodução válidas",
    progress: 100,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Sem strikes ativos",
    achieved: true,
    icon: AlertCircle,
    description: "Canal em conformidade",
    progress: 100,
    color: "from-emerald-500 to-green-500",
  },
  {
    label: "Conta AdSense vinculada",
    achieved: true,
    icon: Link,
    description: "Recebimentos configurados",
    progress: 100,
    color: "from-purple-500 to-pink-500",
  },
];

const monthlyRevenue = [
  {
    month: "Dez 2025",
    revenue: 320,
    change: "+12.3%",
    trend: "up",
    views: "1.2M",
    cpm: 2.67,
    watchTime: "42K",
  },
  {
    month: "Nov 2025",
    revenue: 285,
    change: "+5.2%",
    trend: "up",
    views: "1.1M",
    cpm: 2.59,
    watchTime: "38K",
  },
  {
    month: "Out 2025",
    revenue: 310,
    change: "+8.7%",
    trend: "up",
    views: "1.3M",
    cpm: 2.38,
    watchTime: "45K",
  },
  {
    month: "Set 2025",
    revenue: 268,
    change: "-3.4%",
    trend: "down",
    views: "980K",
    cpm: 2.73,
    watchTime: "32K",
  },
  {
    month: "Ago 2025",
    revenue: 295,
    change: "+6.1%",
    trend: "up",
    views: "1.0M",
    cpm: 2.95,
    watchTime: "41K",
  },
  {
    month: "Jul 2025",
    revenue: 278,
    change: "-8.7%",
    trend: "down",
    views: "920K",
    cpm: 3.02,
    watchTime: "29K",
  },
  {
    month: "Jun 2025",
    revenue: 305,
    change: "+9.8%",
    trend: "up",
    views: "1.1M",
    cpm: 2.77,
    watchTime: "44K",
  },
  {
    month: "Mai 2025",
    revenue: 245,
    change: "-5.1%",
    trend: "down",
    views: "850K",
    cpm: 2.88,
    watchTime: "27K",
  },
];

const topRevenueVideos = [
  {
    id: 1,
    title: "Hackeando o Algoritmo do YouTube em 2025",
    views: "215K",
    revenue: 98,
    cpm: 4.56,
    duration: "15:22",
    thumbnailColor: "from-red-500 to-orange-500",
    published: "2 semanas atrás",
    likes: "24K",
    comments: "1.8K",
    engagement: "12.1%",
  },
  {
    id: 2,
    title: "Live: Invadindo a Deep Web",
    views: "148K",
    revenue: 72,
    cpm: 4.86,
    duration: "2:14:08",
    thumbnailColor: "from-purple-500 to-blue-500",
    published: "1 mês atrás",
    likes: "18K",
    comments: "1.2K",
    engagement: "9.8%",
  },
  {
    id: 3,
    title: "Como Instalar Kali Linux 2025",
    views: "98K",
    revenue: 55,
    cpm: 5.61,
    duration: "22:45",
    thumbnailColor: "from-blue-500 to-cyan-500",
    published: "3 semanas atrás",
    likes: "15K",
    comments: "850",
    engagement: "8.7%",
  },
  {
    id: 4,
    title: "POV: Você é o admin do servidor",
    views: "82K",
    revenue: 48,
    cpm: 5.85,
    duration: "18:33",
    thumbnailColor: "from-green-500 to-emerald-500",
    published: "2 meses atrás",
    likes: "12K",
    comments: "720",
    engagement: "7.9%",
  },
  {
    id: 5,
    title: "Quando o firewall falha",
    views: "52K",
    revenue: 32,
    cpm: 6.15,
    duration: "12:17",
    thumbnailColor: "from-rose-500 to-pink-500",
    published: "1 mês atrás",
    likes: "8K",
    comments: "420",
    engagement: "6.5%",
  },
  {
    id: 6,
    title: "Top 5 ferramentas de hacking em 2025",
    views: "45K",
    revenue: 15,
    cpm: 3.33,
    duration: "8:42",
    thumbnailColor: "from-amber-500 to-yellow-500",
    published: "4 dias atrás",
    likes: "6K",
    comments: "310",
    engagement: "5.2%",
  },
];

export default function YouTubeMonetizationPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [timeRange, setTimeRange] = useState("6M");
  const [showChartTooltip, setShowChartTooltip] = useState(null);

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
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));
  const totalViews = monthlyRevenue.reduce((sum, month) => {
    const views =
      parseFloat(month.views.replace("K", "").replace("M", "")) *
      (month.views.includes("M") ? 1000000 : 1000);
    return sum + views;
  }, 0);
  const avgCPM = (
    monthlyRevenue.reduce((sum, month) => sum + month.cpm, 0) /
    monthlyRevenue.length
  ).toFixed(2);

  // Tempo de exibição total
  const totalWatchTime = monthlyRevenue.reduce((sum, month) => {
    return sum + parseInt(month.watchTime.replace("K", "")) * 1000;
  }, 0);

  const visibleData = monthlyRevenue.slice(0, timeRange === "6M" ? 6 : 8);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Header Fixo - z-index aumentado */}
        <div
          className={`sticky top-0 z-5 transition-all duration-300 ${
            isScrolled
              ? "bg-gray-900/95 backdrop-blur-xl border-b border-red-500/20 shadow-xl"
              : "bg-transparent"
          }`}
        >
          <div className="px-4 md:px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/30">
                    <Youtube className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-white">
                    Monetização YouTube
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400 text-xs md:text-sm font-semibold">
                        Programa Partner Ativo
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs hidden sm:inline">
                      • Desde Jan 2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white hover:bg-gray-700/50 transition-all active:scale-95">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Exportar</span>
                </button>
                <button className=" hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-red-500/25">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden xs:inline">Studio</span>
                  <span className="xs:hidden">Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:p-6 lg:p-8 space-y-8 pb-20">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-red-500/30 transition-all duration-300">
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
                  +15.4% vs 2024
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Visualizações</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {(totalViews / 1000000).toFixed(1)}M
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-emerald-400 text-xs font-semibold">
                  +8.7% vs 2024
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                </div>
                <TrendingDown className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">CPM Médio</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                €{avgCPM}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-red-400 text-xs font-semibold">
                  -2.1% vs 2024
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-emerald-400 text-sm font-semibold">
                  {Math.min((avgRevenue / 350) * 100, 100).toFixed(0)}%
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Meta Mensal</p>
              <p className="text-white text-2xl md:text-3xl font-bold">€350</p>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min((avgRevenue / 350) * 100, 100)}%`,
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
                    Status Partner
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
                                  {req.label.includes("horas") ? "h" : "ins."}
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
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
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
                          CPM
                        </th>
                        <th className="p-4 text-gray-300 text-sm font-medium text-right">
                          Tempo
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
                          <td className="p-4 text-right text-amber-400 font-medium">
                            €{month.cpm}
                          </td>
                          <td className="p-4 text-right text-blue-400">
                            {month.watchTime}h
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
                        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 min-w-64 hover:border-red-500/30 transition-all duration-300"
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
                          <div className="flex justify-between">
                            <span className="text-gray-400">CPM</span>
                            <span className="text-amber-400">€{month.cpm}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tempo</span>
                            <span className="text-blue-400">
                              {month.watchTime}h
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
                  <Video className="w-6 h-6 text-red-400" />
                  Top Vídeos por Receita
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Vídeos com maior retorno financeiro e engajamento
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRevenueVideos.map((video) => (
                <div
                  key={video.id}
                  className="group bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300"
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
                        {video.views} views
                      </span>
                      <span className="px-3 py-1.5 bg-emerald-500/90 backdrop-blur text-white font-bold rounded-lg flex items-center gap-1 shadow-lg">
                        <Euro className="w-4 h-4" />€{video.revenue}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-red-300 transition-colors leading-tight">
                      {video.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {video.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {video.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        {video.engagement}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-700/30">
                      <span className="text-gray-400 text-sm">
                        {video.published}
                      </span>
                      <span className="text-amber-400 font-semibold">
                        CPM: €{video.cpm}
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

              <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="text-red-300 font-semibold mb-2">
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
                    <span className="text-gray-400">Comentários:</span>
                    <span className="text-white font-semibold">
                      {selectedVideo.comments}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Taxa:</span>
                    <span className="text-white font-semibold">
                      {selectedVideo.engagement}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CPM:</span>
                    <span className="text-amber-400 font-semibold">
                      €{selectedVideo.cpm}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver no YouTube
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

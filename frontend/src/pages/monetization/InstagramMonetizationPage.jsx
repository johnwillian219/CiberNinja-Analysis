// src/pages/monetization/InstagramMonetizationPage.jsx
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  Instagram,
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
  Shield,
  Tag,
  BarChart3,
  Camera,
  Image,
  Film,
  Video,
  Sparkles,
  MoreVertical,
  Download,
  TrendingUp as TrendingUpIcon,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Zap,
  Target,
  Settings,
  Bell,
  ShoppingBag,
  Home,
  Search,
  Plus,
  User,
  Grid,
  DollarSign,
  AlertCircle,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";

const monetizationRequirements = [
  {
    label: "10K seguidores",
    achieved: true,
    current: 18450,
    icon: Users,
    description: "Mínimo necessário para monetização",
    progress: 100,
  },
  {
    label: "Conta profissional",
    achieved: true,
    icon: Settings,
    description: "Creator ou Business",
    progress: 100,
  },
  {
    label: "Diretrizes",
    sublabel: "políticas do Instagram",
    achieved: true,
    icon: Shield,
    description: "Canal em conformidade",
    progress: 100,
  },
  {
    label: "Branded Content",
    achieved: true,
    icon: Tag,
    description: "Ferramentas ativadas",
    progress: 100,
  },
  {
    label: "Bonus de Reels",
    achieved: false,
    icon: Film,
    description: "Elegibilidade em verificação",
    progress: 65,
  },
  {
    label: "Subscriptions",
    achieved: false,
    icon: AlertCircle,
    description: "Requisitos não atendidos",
    progress: 30,
  },
];

const monthlyRevenue = [
  {
    month: "Dez 2025",
    revenue: 145,
    change: "+9.8%",
    trend: "up",
    reach: "456K",
    engagement: "4.8%",
  },
  {
    month: "Nov 2025",
    revenue: 132,
    change: "-8.3%",
    trend: "down",
    reach: "378K",
    engagement: "4.2%",
  },
  {
    month: "Out 2025",
    revenue: 158,
    change: "+12.9%",
    trend: "up",
    reach: "512K",
    engagement: "5.1%",
  },
  {
    month: "Set 2025",
    revenue: 140,
    change: "+9.4%",
    trend: "up",
    reach: "420K",
    engagement: "4.6%",
  },
  {
    month: "Ago 2025",
    revenue: 128,
    change: "+11.3%",
    trend: "up",
    reach: "385K",
    engagement: "4.0%",
  },
  {
    month: "Jul 2025",
    revenue: 115,
    change: "-12.7%",
    trend: "down",
    reach: "342K",
    engagement: "3.7%",
  },
  {
    month: "Jun 2025",
    revenue: 125,
    change: "+8.7%",
    trend: "up",
    reach: "398K",
    engagement: "4.2%",
  },
  {
    month: "Mai 2025",
    revenue: 110,
    change: "-5.2%",
    trend: "down",
    reach: "365K",
    engagement: "3.9%",
  },
  {
    month: "Abr 2025",
    revenue: 116,
    change: "+6.5%",
    trend: "up",
    reach: "380K",
    engagement: "4.1%",
  },
  {
    month: "Mar 2025",
    revenue: 109,
    change: "+4.8%",
    trend: "up",
    reach: "350K",
    engagement: "3.8%",
  },
];

const topRevenueContent = [
  {
    id: 1,
    title: "Aesthetic cyberpunk que você pediu",
    reach: "456K",
    revenue: 52,
    likes: "42K",
    saves: "8.5K",
    shares: "3.2K",
    duration: "0:21",
    engagement: "9.8%",
    type: "reel",
    icon: Film,
    thumbnailColor: "from-purple-500 to-pink-500",
    published: "2 semanas atrás",
  },
  {
    id: 2,
    title: "10 ferramentas essenciais para hacking",
    reach: "378K",
    revenue: 38,
    likes: "38K",
    saves: "7.2K",
    shares: "2.8K",
    engagement: "8.4%",
    type: "carousel",
    icon: Image,
    thumbnailColor: "from-orange-500 to-red-500",
    published: "1 mês atrás",
  },
  {
    id: 3,
    title: "Tutorial rápido de phishing em 15s",
    reach: "285K",
    revenue: 28,
    likes: "32K",
    saves: "5.8K",
    shares: "2.1K",
    duration: "0:15",
    engagement: "7.9%",
    type: "reel",
    icon: Film,
    thumbnailColor: "from-blue-500 to-cyan-500",
    published: "3 semanas atrás",
  },
  {
    id: 4,
    title: "Story highlight com poll interativo",
    reach: "185K",
    revenue: 18,
    likes: "24K",
    shares: "1.5K",
    engagement: "6.3%",
    type: "story",
    icon: Camera,
    thumbnailColor: "from-emerald-500 to-green-500",
    published: "2 meses atrás",
  },
  {
    id: 5,
    title: "Post patrocinado: Security Tools 2025",
    reach: "128K",
    revenue: 9,
    likes: "18K",
    saves: "3.2K",
    shares: "1.1K",
    engagement: "5.2%",
    type: "branded",
    icon: Tag,
    thumbnailColor: "from-yellow-500 to-amber-500",
    published: "1 mês atrás",
  },
  {
    id: 6,
    title: "Entrevista com especialista em segurança",
    reach: "142K",
    revenue: 0,
    likes: "25K",
    saves: "4.8K",
    shares: "1.8K",
    duration: "12:45",
    engagement: "7.1%",
    type: "igtv",
    icon: Video,
    thumbnailColor: "from-gray-500 to-gray-700",
    published: "3 meses atrás",
  },
];

export default function InstagramMonetizationPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
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
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));

  // Calcular alcance total
  const totalReach = monthlyRevenue.reduce((sum, month) => {
    const reach = parseFloat(month.reach.replace("K", "")) * 1000;
    return sum + reach;
  }, 0);

  // Calcular engajamento médio
  const avgEngagement = (
    monthlyRevenue.reduce(
      (sum, month) => sum + parseFloat(month.engagement.replace("%", "")),
      0
    ) / monthlyRevenue.length
  ).toFixed(1);

  const visibleData = monthlyRevenue.slice(0, timeRange === "6M" ? 6 : 8);

  const getTypeColor = (type) => {
    switch (type) {
      case "reel":
        return "from-purple-500 to-pink-500";
      case "carousel":
        return "from-orange-500 to-red-500";
      case "story":
        return "from-blue-500 to-cyan-500";
      case "branded":
        return "from-emerald-500 to-green-500";
      case "igtv":
        return "from-gray-500 to-gray-700";
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "reel":
        return "Reel";
      case "carousel":
        return "Carrossel";
      case "story":
        return "Story";
      case "branded":
        return "Patrocinado";
      case "igtv":
        return "IGTV";
      default:
        return type;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950/10 to-pink-950/5">
        {/* Header Fixo */}
        <div
          className={`sticky top-0 z-5 transition-all duration-300 ${
            isScrolled
              ? "bg-gray-900/95 backdrop-blur-xl border-b border-purple-500/20 shadow-xl"
              : "bg-transparent"
          }`}
        >
          <div className="px-4 md:px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Instagram className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-white">
                    Monetização Instagram
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1.5 bg-yellow-500/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                      <span className="text-yellow-400 text-xs md:text-sm font-semibold">
                        Parcialmente
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs">
                      • Desde Mar 2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white hover:bg-gray-700/50 transition-all active:scale-95">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Exportar</span>
                </button>
                <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-purple-500/25">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden xs:inline">Criar Conteúdo</span>
                  <span className="xs:hidden">Criar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:p-6 lg:p-8 space-y-8 pb-20">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Euro className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Receita Total</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                €{totalRevenue}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-semibold">
                  +18.4%
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Alcance Total</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {(totalReach / 1000000).toFixed(1)}M
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-semibold">
                  +22.7%
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Heart className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Engajamento</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {avgEngagement}%
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-semibold">
                  +7.2%
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-orange-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Meta Mensal</p>
              <p className="text-white text-2xl md:text-3xl font-bold">€200</p>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-3">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-700"
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
                    <Zap className="w-5 h-5 text-purple-400" />
                    Status Monetização
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
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                            req.achieved
                              ? "bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30"
                              : req.progress > 50
                              ? "bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30"
                              : "bg-gray-700/30 border border-gray-600/30"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-xl ${
                              req.achieved
                                ? "bg-emerald-500/20 text-emerald-400"
                                : req.progress > 50
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-gray-700 text-gray-400"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
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
                                  {req.current.toLocaleString("pt-BR")}
                                </p>
                                <div className="w-16 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      req.achieved
                                        ? "bg-emerald-500"
                                        : req.progress > 50
                                        ? "bg-yellow-500"
                                        : "bg-gray-600"
                                    }`}
                                    style={{ width: `${req.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                          {req.achieved ? (
                            <CheckCircle className="w-6 h-6 text-emerald-400" />
                          ) : req.progress > 50 ? (
                            <Clock className="w-6 h-6 text-yellow-400" />
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
                      Performance mensal 2025
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
                    <select className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white text-sm outline-none hover:bg-gray-800 transition-colors">
                      <option>2025</option>
                      <option>2024</option>
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
                          Alcance
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
                          <td className="p-4 text-right text-emerald-400 font-bold">
                            €{month.revenue}
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
                          <td className="p-4 text-right text-gray-300">
                            {month.reach}
                          </td>
                          <td className="p-4 text-right text-blue-400">
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
                        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 min-w-64"
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
                          <div className="flex justify-between">
                            <span className="text-gray-400">Receita</span>
                            <span className="text-emerald-400 font-bold text-lg">
                              €{month.revenue}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Alcance</span>
                            <span className="text-white">{month.reach}</span>
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

          {/* Top Conteúdos */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <Camera className="w-6 h-6 text-purple-400" />
                  Top Conteúdos por Receita
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Conteúdos com maior alcance e engajamento
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRevenueContent.map((content) => {
                const Icon = content.icon;
                return (
                  <div
                    key={content.id}
                    className="group bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div
                      className={`relative h-48 bg-gradient-to-r ${content.thumbnailColor}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-3 py-1 bg-black/70 backdrop-blur text-white text-sm font-bold rounded-full">
                          #{content.id}
                        </span>
                        <span className="px-2 py-1 bg-black/70 backdrop-blur text-white text-xs rounded flex items-center gap-1">
                          <Icon className="w-3 h-3" />
                          {getTypeLabel(content.type)}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                        <span className="px-3 py-1.5 bg-black/70 backdrop-blur text-white text-sm rounded-lg">
                          {content.reach}
                        </span>
                        <span
                          className={`px-3 py-1.5 backdrop-blur text-white font-bold rounded-lg flex items-center gap-1 ${
                            content.revenue > 0
                              ? "bg-emerald-500/80"
                              : "bg-gray-600/80"
                          }`}
                        >
                          <Euro className="w-4 h-4" />
                          {content.revenue > 0
                            ? `€${content.revenue}`
                            : "Não monetizado"}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <h3 className="text-white font-semibold line-clamp-2 group-hover:text-purple-300 transition-colors">
                        {content.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {content.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bookmark className="w-4 h-4" />
                          {content.saves || "—"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          {content.shares}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          {content.published}
                        </span>
                        <span
                          className={`font-semibold ${
                            parseFloat(content.engagement) > 8
                              ? "text-emerald-400"
                              : parseFloat(content.engagement) > 5
                              ? "text-blue-400"
                              : "text-gray-400"
                          }`}
                        >
                          {content.engagement} eng.
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

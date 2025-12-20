// src/pages/monetization/FacebookMonetizationPage.jsx
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  Facebook,
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
  ExternalLink,
  Home,
  Globe,
  Star,
  Award,
  TrendingUp as TrendingUpIcon,
  Users as UsersIcon,
  ThumbsUp,
  BookOpen,
  Flag,
  Shield as ShieldIcon,
  Coffee,
} from "lucide-react";
import { useState, useEffect } from "react";

const monetizationRequirements = [
  {
    label: "10K seguidores",
    achieved: true,
    current: 32500,
    icon: Users,
    description: "Página ativa e engajada",
    progress: 100,
    color: "from-blue-600 to-blue-800",
  },
  {
    label: "50K engajamentos",
    sublabel: "últimos 60 dias",
    achieved: true,
    current: 187500,
    icon: ThumbsUp,
    description: "Interações válidas",
    progress: 100,
    color: "from-indigo-500 to-purple-600",
  },
  {
    label: "Conformidade",
    achieved: true,
    icon: Shield,
    description: "Diretrizes da comunidade",
    progress: 100,
    color: "from-emerald-500 to-green-600",
  },
  {
    label: "Stars ativados",
    achieved: true,
    icon: Star,
    description: "Monetização por conteúdo",
    progress: 100,
    color: "from-amber-500 to-yellow-500",
  },
  {
    label: "In-stream ads",
    achieved: false,
    icon: Video,
    description: "Propaganda em vídeos",
    progress: 75,
    color: "from-orange-500 to-red-500",
  },
  {
    label: "Fan Subscriptions",
    achieved: false,
    icon: UsersIcon,
    description: "Assinaturas de fãs",
    progress: 45,
    color: "from-pink-500 to-rose-500",
  },
];

const monthlyRevenue = [
  {
    month: "Dez 2025",
    revenue: 215,
    change: "+11.2%",
    trend: "up",
    reach: "1.8M",
    engagement: "4.8%",
    stars: 185,
  },
  {
    month: "Nov 2025",
    revenue: 198,
    change: "-7.4%",
    trend: "down",
    reach: "1.6M",
    engagement: "4.3%",
    stars: 162,
  },
  {
    month: "Out 2025",
    revenue: 228,
    change: "+13.5%",
    trend: "up",
    reach: "2.1M",
    engagement: "5.2%",
    stars: 198,
  },
  {
    month: "Set 2025",
    revenue: 195,
    change: "+8.9%",
    trend: "up",
    reach: "1.7M",
    engagement: "4.5%",
    stars: 172,
  },
  {
    month: "Ago 2025",
    revenue: 178,
    change: "+12.7%",
    trend: "up",
    reach: "1.5M",
    engagement: "4.1%",
    stars: 155,
  },
  {
    month: "Jul 2025",
    revenue: 165,
    change: "-14.3%",
    trend: "down",
    reach: "1.4M",
    engagement: "3.8%",
    stars: 142,
  },
  {
    month: "Jun 2025",
    revenue: 192,
    change: "+9.8%",
    trend: "up",
    reach: "1.9M",
    engagement: "4.7%",
    stars: 175,
  },
  {
    month: "Mai 2025",
    revenue: 175,
    change: "-5.6%",
    trend: "down",
    reach: "1.6M",
    engagement: "4.2%",
    stars: 158,
  },
];

const topRevenueContent = [
  {
    id: 1,
    title: "Live: Segurança na Deep Web - Pergunte-me qualquer coisa",
    reach: "3.2M",
    revenue: 85,
    duration: "2:45:12",
    thumbnailColor: "from-blue-600 to-blue-800",
    published: "1 semana atrás",
    likes: "185K",
    shares: "42K",
    comments: "12K",
    stars: 245,
    type: "live",
  },
  {
    id: 2,
    title: "Carrossel: Top 10 ferramentas de ethical hacking 2025",
    reach: "2.8M",
    revenue: 62,
    duration: null,
    thumbnailColor: "from-indigo-500 to-purple-600",
    published: "2 semanas atrás",
    likes: "162K",
    shares: "38K",
    comments: "9.8K",
    stars: 198,
    type: "post",
  },
  {
    id: 3,
    title: "Reel: Como configurar VPN em 60 segundos",
    reach: "2.1M",
    revenue: 48,
    duration: "0:58",
    thumbnailColor: "from-emerald-500 to-green-600",
    published: "3 dias atrás",
    likes: "142K",
    shares: "32K",
    comments: "7.5K",
    stars: 158,
    type: "reel",
  },
  {
    id: 4,
    title: "Story: Desafio diário de segurança cibernética",
    reach: "1.5M",
    revenue: 32,
    duration: null,
    thumbnailColor: "from-amber-500 to-yellow-500",
    published: "1 mês atrás",
    likes: "98K",
    shares: "24K",
    comments: "5.2K",
    stars: 112,
    type: "story",
  },
  {
    id: 5,
    title: "Vídeo: Análise completa de malware - Caso real",
    reach: "1.2M",
    revenue: 28,
    duration: "18:34",
    thumbnailColor: "from-orange-500 to-red-500",
    published: "2 meses atrás",
    likes: "85K",
    shares: "19K",
    comments: "4.3K",
    stars: 95,
    type: "video",
  },
  {
    id: 6,
    title: "Post patrocinado: Ferramentas de pentest profissionais",
    reach: "980K",
    revenue: 18,
    duration: null,
    thumbnailColor: "from-pink-500 to-rose-500",
    published: "3 semanas atrás",
    likes: "72K",
    shares: "15K",
    comments: "3.1K",
    stars: 62,
    type: "sponsored",
  },
];

export default function FacebookMonetizationPage() {
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
  const totalStars = monthlyRevenue.reduce(
    (sum, month) => sum + month.stars,
    0
  );
  const totalReach = monthlyRevenue.reduce((sum, month) => {
    const reach = parseFloat(month.reach.replace("M", "")) * 1000000;
    return sum + reach;
  }, 0);
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

  const getTypeLabel = (type) => {
    switch (type) {
      case "live":
        return "Live";
      case "post":
        return "Post";
      case "reel":
        return "Reel";
      case "story":
        return "Story";
      case "video":
        return "Vídeo";
      case "sponsored":
        return "Patrocinado";
      default:
        return "Conteúdo";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "live":
        return PlayCircle;
      case "post":
        return BookOpen;
      case "reel":
        return Video;
      case "story":
        return MessageCircle;
      case "video":
        return Video;
      case "sponsored":
        return Star;
      default:
        return BookOpen;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-950/10">
        {/* Header Fixo - z-index alto */}
        <div
          className={`sticky top-0 z-[100] transition-all duration-300 ${
            isScrolled
              ? "bg-gray-900/95 backdrop-blur-xl border-b border-blue-600/20 shadow-xl"
              : "bg-transparent"
          }`}
        >
          <div className="px-4 md:px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Facebook className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl md:text-3xl font-bold text-white">
                    Monetização Facebook
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400 text-xs md:text-sm font-semibold">
                        Stars + In-Stream Ads
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
                  <span className="text-sm font-medium">Relatório</span>
                </button>
                <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-blue-500/25">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden xs:inline">Creator Studio</span>
                  <span className="xs:hidden">Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:p-6 lg:p-8 space-y-8 pb-20">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-blue-600/30 transition-all duration-300">
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
                  +16.8% vs 2024
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Alcance Total</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {(totalReach / 1000000).toFixed(1)}M
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-emerald-400 text-xs font-semibold">
                  +22.4% vs 2024
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Star className="w-5 h-5 text-amber-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Stars Recebidos</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {totalStars}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-emerald-400 text-xs font-semibold">
                  +28.5% vs 2024
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-emerald-400 text-sm font-semibold">
                  {Math.min((avgRevenue / 250) * 100, 100).toFixed(0)}%
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Meta Mensal</p>
              <p className="text-white text-2xl md:text-3xl font-bold">€250</p>
              <div className="w-full bg-gray-700 h-2 rounded-full mt-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-blue-800 h-2 rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min((avgRevenue / 250) * 100, 100)}%`,
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
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] ${
                            req.achieved
                              ? "bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30"
                              : req.progress > 50
                              ? "bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30"
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
                                  {req.label.includes("engajamentos")
                                    ? "interações"
                                    : "segs."}
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
                            <CheckCircle className="w-6 h-6 text-emerald-400 animate-pulse" />
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
                          Alcance
                        </th>
                        <th className="p-4 text-gray-300 text-sm font-medium text-right">
                          Stars
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
                            {month.reach}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Star className="w-4 h-4 text-amber-400" />
                              <span className="text-amber-400 font-medium">
                                {month.stars}
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
                        className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 min-w-64 hover:border-blue-600/30 transition-all duration-300"
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
                            <span className="text-gray-400">Alcance</span>
                            <span className="text-white">{month.reach}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Stars</span>
                            <span className="flex items-center gap-1 text-amber-400">
                              <Star className="w-4 h-4" />
                              {month.stars}
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

          {/* Top Conteúdos */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <Video className="w-6 h-6 text-blue-400" />
                  Top Conteúdos por Receita
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Conteúdos com maior alcance e engajamento
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRevenueContent.map((content) => {
                const Icon = getTypeIcon(content.type);
                return (
                  <div
                    key={content.id}
                    className="group bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-600/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
                    onClick={() => setSelectedContent(content)}
                  >
                    <div
                      className={`relative h-48 bg-gradient-to-r ${content.thumbnailColor}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-3 py-1 bg-black/80 backdrop-blur text-white text-sm font-bold rounded-full shadow-lg">
                          #{content.id}
                        </span>
                        <span className="px-2 py-1 bg-black/80 backdrop-blur text-white text-xs rounded flex items-center gap-1">
                          <Icon className="w-3 h-3" />
                          {getTypeLabel(content.type)}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                        <span className="px-3 py-1.5 bg-black/80 backdrop-blur text-white text-sm rounded-lg">
                          {content.reach}
                        </span>
                        <span className="px-3 py-1.5 bg-emerald-500/90 backdrop-blur text-white font-bold rounded-lg flex items-center gap-1 shadow-lg">
                          <Euro className="w-4 h-4" />€{content.revenue}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-blue-300 transition-colors leading-tight">
                        {content.title}
                      </h3>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {content.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          {content.shares}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {content.stars}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-700/30">
                        <span className="text-gray-400 text-sm">
                          {content.published}
                        </span>
                        <span
                          className={`font-semibold ${
                            parseFloat(content.reach.replace("M", "")) > 2
                              ? "text-emerald-400"
                              : parseFloat(content.reach.replace("M", "")) > 1
                              ? "text-blue-400"
                              : "text-gray-400"
                          }`}
                        >
                          {content.comments} comentários
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

      {/* Content Detail Modal */}
      {selectedContent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedContent(null)}
        >
          <div
            className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${selectedContent.thumbnailColor}`}
                >
                  {(() => {
                    const Icon = getTypeIcon(selectedContent.type);
                    return <Icon className="w-5 h-5 text-white" />;
                  })()}
                </div>
                <h3 className="text-xl font-bold text-white">
                  Análise do Conteúdo
                </h3>
              </div>
              <button
                onClick={() => setSelectedContent(null)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-gray-400 text-sm">Título</div>
                <div className="text-white font-semibold text-lg">
                  {selectedContent.title}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-3">
                  <div className="text-gray-400 text-sm">Receita</div>
                  <div className="text-emerald-400 text-2xl font-bold">
                    €{selectedContent.revenue}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-3">
                  <div className="text-gray-400 text-sm">Alcance</div>
                  <div className="text-white text-2xl font-bold">
                    {selectedContent.reach}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600/10 to-blue-800/10 border border-blue-600/20 rounded-xl p-4">
                <div className="text-blue-300 font-semibold mb-2">
                  Engajamento Facebook
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Likes:</span>
                    <span className="text-white font-semibold">
                      {selectedContent.likes}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Compart.:</span>
                    <span className="text-white font-semibold">
                      {selectedContent.shares}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Comentários:</span>
                    <span className="text-white font-semibold">
                      {selectedContent.comments}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stars:</span>
                    <span className="text-amber-400 font-semibold">
                      {selectedContent.stars}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver no Facebook
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

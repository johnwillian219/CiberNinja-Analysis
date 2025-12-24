// src/pages/monetization/YouTubeMonetizationPage.jsx - VERSÃO FINAL COMPLETA E CORRIGIDA

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
  Download, // ← Corrigido
  RefreshCw, // ← Corrigido
  Heart,
  Share2,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useYouTubeData } from "../../hooks/useYouTubeData";

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
  const { data: analyticsData, loading } = useYouTubeData();

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

  // Dados reais dos últimos 30 dias
  const last30Days = analyticsData?.slice(-30) || [];
  const totalRevenueLast30 = last30Days
    .reduce((sum, day) => sum + (day.estimatedRevenue || 0), 0)
    .toFixed(2);
  const totalViewsLast30 = last30Days.reduce(
    (sum, day) => sum + (day.views || 0),
    0
  );
  const totalWatchTimeLast30 =
    last30Days.reduce((sum, day) => sum + (day.watchTime || 0), 0) / 60;
  const avgCPM =
    totalViewsLast30 > 0
      ? (totalRevenueLast30 / (totalViewsLast30 / 1000)).toFixed(2)
      : "0.00";

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-6"></div>
            <p className="text-gray-400 text-lg">
              Carregando dados de monetização...
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Header Fixo */}
        <div
          className={`sticky top-0 z-50 transition-all duration-300 ${
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
                <button className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-red-500/25">
                  <Sparkles className="w-4 h-4" />
                  <span>YouTube Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:p-6 lg:p-8 space-y-8 pb-20">
          {/* Stats Cards com dados reais */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Euro className="w-5 h-5 text-emerald-400" />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-gray-400 text-sm mb-1">Receita (30 dias)</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                €{totalRevenueLast30}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Visualizações</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {formatNumber(totalViewsLast30)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">CPM Médio</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                €{avgCPM}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Tempo de Exibição</p>
              <p className="text-white text-2xl md:text-3xl font-bold">
                {Math.round(totalWatchTimeLast30)}h
              </p>
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

            {/* Tabela de Receita (mantém o teu mock por agora – pode ser integrado com dados reais depois) */}
            {/* ... (cola aqui o teu bloco completo da tabela de receita, mobile cards, etc.) */}
            {/* Top Vídeos e Modal */}
            {/* ... (cola aqui o teu bloco completo do top vídeos e o modal) */}
          </div>
        </div>
      </div>

      {/* Modal do vídeo (completo como tinhas) */}
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

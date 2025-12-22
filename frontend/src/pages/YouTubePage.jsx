// frontend/src/pages/YouTubePage.jsx

import { useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import YouTubeStatusBanner from "../components/auth/YouTubeStatusBanner";
import YouTubeLoginButton from "../components/auth/YouTubeLoginButton";
import YouTubeHeader from "../components/youtube/YouTubeHeader";
import YouTubeViewsChart from "../components/youtube/YouTubeChart";
import YouTubeInsights from "../components/youtube/YouTubeInsights";
import YouTubeVideosTable from "../components/youtube/YouTubeVideosTable";
import YouTubeRankings from "../components/youtube/YouTubeRankings";

import { useAuth } from "../context/AuthContext";
import { useYouTubeData } from "../hooks/useYouTubeData";

export default function YouTubePage() {
  const { youtubeConnected, youtubeLoading: authLoading } = useAuth();
  const {
    data,
    loading: dataLoading,
    error,
    lastUpdated,
    refetch,
    hasData,
  } = useYouTubeData();

  // Atualiza título da página
  useEffect(() => {
    document.title = youtubeConnected
      ? "YouTube Dashboard • Dados Reais"
      : "YouTube • Conectar Conta";
  }, [youtubeConnected]);

  const loading = authLoading || dataLoading;

  return (
    <DashboardLayout>
      <div className="sm:p-5 md:p-6 lg:p-8 xl:p-10 pb-16">
        {/* Banner de status da conexão */}
        <YouTubeStatusBanner />

        {/* Se não estiver conectado: tela de boas-vindas com botão */}
        {!youtubeConnected && !authLoading && (
          <div className="text-center py-20 px-6 bg-gradient-to-b from-gray-800/50 to-transparent rounded-2xl border border-gray-700">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Bem-vindo ao seu Dashboard do YouTube
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Conecte sua conta do YouTube para acessar dados históricos
                reais, estatísticas detalhadas, gráficos avançados e insights
                exclusivos do seu canal.
              </p>
              <YouTubeLoginButton size="large" />
            </div>
          </div>
        )}

        {/* Se estiver conectado */}
        {youtubeConnected && (
          <>
            {/* Loading dos dados */}
            {loading && (
              <div className="text-center py-20">
                <div className="inline-flex items-center gap-4">
                  <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xl text-gray-300">
                    Carregando dados reais do seu canal...
                  </p>
                </div>
              </div>
            )}

            {/* Erro ao carregar dados */}
            {error && !loading && (
              <div className="text-center py-12 bg-red-500/10 border border-red-500/30 rounded-xl">
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  Erro ao carregar dados
                </h3>
                <p className="text-gray-300 mb-6">{error}</p>
                <button
                  onClick={refetch}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {/* Dashboard completo - só aparece quando tem dados */}
            {!loading && !error && hasData && (
              <>
                <YouTubeHeader data={data} lastUpdated={lastUpdated} />

                <YouTubeViewsChart data={data} />

                <YouTubeInsights data={data} />

                <YouTubeVideosTable />

                <YouTubeRankings data={data} />
              </>
            )}

            {/* Caso conectado mas sem dados (raro, mas possível) */}
            {!loading && !error && !hasData && (
              <div className="text-center py-20 bg-gray-800/50 rounded-xl">
                <p className="text-xl text-gray-300 mb-6">
                  Nenhum dado encontrado nos últimos 30 dias.
                </p>
                <button
                  onClick={refetch}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
                >
                  Atualizar dados
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

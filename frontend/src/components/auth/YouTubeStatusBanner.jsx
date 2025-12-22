// frontend/src/components/auth/YouTubeStatusBanner.jsx

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Youtube,
  CheckCircle,
  RefreshCw,
  LogOut,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Info,
  ExternalLink,
  Menu,
  X,
  Link as LinkIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import DisconnectModal from "./DisconnectModal";

export default function YouTubeStatusBanner() {
  const {
    youtubeConnected,
    youtubeLoading,
    disconnectYouTube,
    refreshYouTubeStatus,
  } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const actionsRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showActions &&
        actionsRef.current &&
        !actionsRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setShowActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showActions]);

  // Gerencia o escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        if (showDisconnectModal) {
          setShowDisconnectModal(false);
        } else if (showActions) {
          setShowActions(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showDisconnectModal, showActions]);

  const handleDisconnect = useCallback(async () => {
    setShowDisconnectModal(true);
  }, []);

  const confirmDisconnect = useCallback(async () => {
    try {
      await disconnectYouTube();
    } catch (error) {
      console.error("Disconnection error:", error);
    } finally {
      setShowDisconnectModal(false);
    }
  }, [disconnectYouTube]);

  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      await refreshYouTubeStatus();
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }, [isRefreshing, refreshYouTubeStatus]);

  const toggleExpand = useCallback(() => {
    if (!showActions) {
      setIsExpanded((prev) => !prev);
    }
  }, [showActions]);

  const toggleActions = useCallback(() => {
    setShowActions((prev) => !prev);
  }, []);

  // Dados reutilizáveis
  const statusConfig = youtubeConnected
    ? {
        gradient: "from-gray-800 to-gray-900",
        border: "border-emerald-500/20",
        iconBg: "bg-emerald-500/10",
        icon: <CheckCircle className="w-7 h-7 text-emerald-400" />,
        title: "YouTube Conectado",
        description: "Acesso completo aos dados",
        statusColor: "emerald",
        features: [
          {
            icon: (
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            ),
            title: "Dados em tempo real",
            description:
              "Estatísticas atualizadas automaticamente do seu canal",
          },
          {
            icon: (
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            ),
            title: "Histórico completo",
            description: "Acesso aos dados dos últimos 6 meses",
          },
          {
            icon: (
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            ),
            title: "Análises detalhadas",
            description: "Métricas de audiência e desempenho avançadas",
          },
        ],
      }
    : {
        gradient: "from-gray-800 to-gray-900",
        border: "border-yellow-500/20",
        iconBg: "bg-yellow-500/10",
        icon: <AlertTriangle className="w-7 h-7 text-yellow-400" />,
        title: "Conectar YouTube",
        description: "Obtenha dados reais do seu canal",
        statusColor: "yellow",
        features: [
          {
            icon: (
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            ),
            title: "Dados limitados",
            description: "Apenas demonstrações e dados simulados disponíveis",
          },
          {
            icon: (
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            ),
            title: "Histórico indisponível",
            description: "Sem acesso aos dados passados do seu canal",
          },
          {
            icon: (
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            ),
            title: "Análises básicas",
            description: "Recursos avançados bloqueados sem conexão",
          },
        ],
      };

  // Skeleton loading
  if (youtubeLoading) {
    return (
      <div
        className="mb-4 animate-pulse"
        aria-label="Carregando status do YouTube"
      >
        <div className="rounded-2xl p-4 bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gray-700 rounded-xl" />
            <div className="flex-1">
              <div className="h-5 bg-gray-700 rounded w-32 mb-2" />
              <div className="h-3 bg-gray-700 rounded w-48" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        {/* Overlay para ações móveis */}
        {showActions && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-200"
            onClick={() => setShowActions(false)}
            aria-hidden="true"
          />
        )}

        {/* Banner principal */}
        <div
          className={`rounded-2xl border ${statusConfig.gradient} ${statusConfig.border} p-4 relative`}
          role="region"
          aria-label="Status da conexão com YouTube"
        >
          {/* Cabeçalho */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={toggleExpand}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            onKeyDown={(e) => e.key === "Enter" && toggleExpand()}
          >
            {/* Ícone de status */}
            <div className={`p-3 rounded-xl ${statusConfig.iconBg}`}>
              {statusConfig.icon}
            </div>

            {/* Informações principais */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Youtube className="w-5 h-5 text-red-500 flex-shrink-0" />
                <h3 className="text-base font-bold text-white truncate">
                  {statusConfig.title}
                </h3>
              </div>

              <p className="text-sm text-gray-300 mb-1">
                {statusConfig.description}
              </p>

              {/* Indicador visual de status (apenas ponto) */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    youtubeConnected
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-yellow-400"
                  }`}
                  aria-label={youtubeConnected ? "Conectado" : "Não conectado"}
                />
                <span className="text-xs text-gray-400">
                  {youtubeConnected ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            {/* Botão de ações mobile */}
            <button
              ref={menuButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                toggleActions();
              }}
              className="p-2.5 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 active:bg-gray-600 transition-colors md:hidden"
              aria-label="Ações"
              aria-expanded={showActions}
            >
              {showActions ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>

          {/* Menu de ações mobile */}
          {showActions && (
            <div
              ref={actionsRef}
              className="absolute right-0 top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-2xl shadow-xl z-50 animate-in slide-in-from-bottom-2 duration-200 md:hidden"
              role="menu"
            >
              <div className="p-3">
                {youtubeConnected ? (
                  <ConnectedMobileActions
                    isRefreshing={isRefreshing}
                    isExpanded={isExpanded}
                    onRefresh={handleRefresh}
                    onToggleExpand={() => {
                      setShowActions(false);
                      setIsExpanded((prev) => !prev);
                    }}
                    onDisconnect={() => {
                      setShowActions(false);
                      handleDisconnect();
                    }}
                  />
                ) : (
                  <DisconnectedMobileActions
                    isRefreshing={isRefreshing}
                    isExpanded={isExpanded}
                    onRefresh={handleRefresh}
                    onToggleExpand={() => {
                      setShowActions(false);
                      setIsExpanded((prev) => !prev);
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Conteúdo expandido */}
          {isExpanded && (
            <div
              className="mt-4 pt-4 border-t border-gray-700/50 animate-in fade-in duration-200"
              role="region"
              aria-label="Detalhes da conexão"
            >
              <div className="space-y-3">
                {statusConfig.features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-xl ${
                      youtubeConnected ? "bg-emerald-500/5" : "bg-yellow-500/5"
                    }`}
                  >
                    {feature.icon}
                    <div>
                      <div className="font-medium text-sm text-white mb-1">
                        {feature.title}
                      </div>
                      <p className="text-xs text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}

                {!youtubeConnected && (
                  <a
                    href="/help/connect-youtube"
                    className="inline-flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 mt-2 transition-colors"
                    aria-label="Saiba mais sobre como funciona a conexão"
                  >
                    <Info className="w-4 h-4" />
                    <span>Como funciona a conexão?</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Ações desktop */}
          <div className="hidden md:flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Info className="w-4 h-4" />
              <span>
                {youtubeConnected
                  ? "Conectado • Atualizado automaticamente"
                  : "Conecte para dados reais do seu canal"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <DesktopActions
                youtubeConnected={youtubeConnected}
                isRefreshing={isRefreshing}
                isExpanded={isExpanded}
                onRefresh={handleRefresh}
                onToggleExpand={() => setIsExpanded((prev) => !prev)}
                onDisconnect={handleDisconnect}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal de desconexão */}
      <DisconnectModal
        isOpen={showDisconnectModal}
        onClose={() => setShowDisconnectModal(false)}
        onConfirm={confirmDisconnect}
      />
    </>
  );
}

// Componente auxiliar para ações mobile quando conectado
function ConnectedMobileActions({
  isRefreshing,
  isExpanded,
  onRefresh,
  onToggleExpand,
  onDisconnect,
}) {
  return (
    <div className="space-y-2">
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="w-full flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-600/70 active:bg-gray-600 rounded-xl text-gray-300 disabled:opacity-50 transition-colors"
        aria-label={isRefreshing ? "Atualizando status" : "Atualizar status"}
      >
        <div
          className={`p-2 rounded-lg bg-gray-600/50 ${
            isRefreshing ? "animate-spin" : ""
          }`}
        >
          <RefreshCw className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="font-medium text-sm">Atualizar status</div>
          <div className="text-xs text-gray-400">Verificar conexão atual</div>
        </div>
      </button>

      <button
        onClick={onToggleExpand}
        className="w-full flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-600/70 active:bg-gray-600 rounded-xl text-gray-300 transition-colors"
        aria-label={isExpanded ? "Ocultar detalhes" : "Mostrar detalhes"}
      >
        <div className="p-2 rounded-lg bg-gray-600/50">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
        <div className="text-left">
          <div className="font-medium text-sm">
            {isExpanded ? "Menos detalhes" : "Mais detalhes"}
          </div>
          <div className="text-xs text-gray-400">
            {isExpanded ? "Ocultar informações" : "Mostrar informações"}
          </div>
        </div>
      </button>

      <div className="h-px bg-gray-700 my-2" aria-hidden="true" />

      <button
        onClick={onDisconnect}
        className="w-full flex items-center gap-3 p-3 bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 rounded-xl text-red-400 transition-colors"
        aria-label="Desconectar conta do YouTube"
      >
        <div className="p-2 rounded-lg bg-red-500/20">
          <LogOut className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="font-medium text-sm">Desconectar conta</div>
          <div className="text-xs text-red-400/80">
            Remover acesso ao YouTube
          </div>
        </div>
      </button>
    </div>
  );
}

// Componente auxiliar para ações mobile quando desconectado
function DisconnectedMobileActions({
  isRefreshing,
  onRefresh,
  onToggleExpand,
}) {
  return (
    <div className="space-y-2">
      <a
        href="/auth/youtube"
        className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 active:from-red-800 active:to-red-900 rounded-xl text-white transition-all"
        aria-label="Conectar conta do YouTube"
      >
        <div className="p-2 rounded-lg bg-white/20">
          <LinkIcon className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="font-medium text-sm">Conectar agora</div>
          <div className="text-xs text-white/80">
            Iniciar processo de conexão
          </div>
        </div>
        <ExternalLink className="w-4 h-4 ml-auto opacity-70" />
      </a>

      <button
        onClick={onToggleExpand}
        className="w-full flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-600/70 active:bg-gray-600 rounded-xl text-gray-300 transition-colors"
        aria-label="Mostrar benefícios da conexão"
      >
        <div className="p-2 rounded-lg bg-gray-600/50">
          <Info className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="font-medium text-sm">Por que conectar?</div>
          <div className="text-xs text-gray-400">
            Ver benefícios disponíveis
          </div>
        </div>
      </button>

      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="w-full flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-600/70 active:bg-gray-600 rounded-xl text-gray-300 disabled:opacity-50 transition-colors"
        aria-label={isRefreshing ? "Verificando status" : "Verificar status"}
      >
        <div
          className={`p-2 rounded-lg bg-gray-600/50 ${
            isRefreshing ? "animate-spin" : ""
          }`}
        >
          <RefreshCw className="w-4 h-4" />
        </div>
        <div className="text-left">
          <div className="font-medium text-sm">Verificar status</div>
          <div className="text-xs text-gray-400">
            Atualizar estado da conexão
          </div>
        </div>
      </button>
    </div>
  );
}

// Componente auxiliar para ações desktop
function DesktopActions({
  youtubeConnected,
  isRefreshing,
  isExpanded,
  onRefresh,
  onToggleExpand,
  onDisconnect,
}) {
  if (youtubeConnected) {
    return (
      <>
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="px-4 py-2 bg-gray-700/50 hover:bg-gray-600/70 text-gray-200 rounded-xl text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
          aria-label={isRefreshing ? "Atualizando status" : "Atualizar status"}
        >
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          <span>{isRefreshing ? "Atualizando..." : "Atualizar"}</span>
        </button>

        <button
          onClick={onToggleExpand}
          className="px-4 py-2 bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 rounded-xl text-sm transition-colors flex items-center gap-2"
          aria-label={isExpanded ? "Ocultar detalhes" : "Mostrar detalhes"}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>Menos detalhes</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Mais detalhes</span>
            </>
          )}
        </button>

        <button
          onClick={onDisconnect}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm transition-colors flex items-center gap-2"
          aria-label="Desconectar conta do YouTube"
        >
          <LogOut className="w-4 h-4" />
          <span>Desconectar</span>
        </button>
      </>
    );
  }

  return (
    <a
      href="/auth/youtube"
      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all hover:shadow-lg"
      aria-label="Conectar conta do YouTube"
    >
      <Youtube className="w-4 h-4" />
      <span>Conectar YouTube</span>
    </a>
  );
}

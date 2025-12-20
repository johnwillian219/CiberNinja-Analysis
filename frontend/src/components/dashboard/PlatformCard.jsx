// src/components/dashboard/PlatformCard.jsx
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useState, useEffect, useRef } from "react";

const generateSparklineData = (positive = true) => {
  if (positive) {
    return [30, 35, 32, 40, 45, 50, 62, 70, 68, 80].map((v) => ({
      value: v + Math.random() * 8,
    }));
  } else {
    return [80, 75, 78, 70, 65, 60, 58, 52, 55, 48].map((v) => ({
      value: v + Math.random() * 8,
    }));
  }
};

// Componente Sparkline seguro
const SafeSparkline = ({ isPositive, height = 20 }) => {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef(null);
  const [hasDimension, setHasDimension] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Verificar se o container tem dimensões válidas
    const checkDimension = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setHasDimension(width > 0 && height > 0);
      }
    };

    checkDimension();
    const timer = setTimeout(checkDimension, 100); // Verificar após um delay

    return () => clearTimeout(timer);
  }, []);

  const data = generateSparklineData(isPositive);

  if (!isClient) {
    return (
      <div
        ref={containerRef}
        className="h-16 sm:h-20 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6"
        style={{ minHeight: `${height}px` }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="mt-4 sm:mt-6 h-16 sm:h-20 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 min-h-[20px]"
      style={{ minHeight: `${height}px` }}
    >
      {hasDimension && (
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={20}
        >
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth={2.5}
              dot={false}
              animationDuration={1200}
              isAnimationActive={hasDimension}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default function PlatformCard({
  platform,
  Icon,
  followers = 0,
  growth = 0,
  growthText = "este mês",
}) {
  const isPositive = growth >= 0;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Formatar número para mobile
  const formatNumber = (num) => {
    if (!isClient) return "...";

    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toLocaleString("pt-BR");
  };

  return (
    <Link
      to={platform.path}
      className="group relative block bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 
                 hover:bg-gray-800/90 hover:border-cyan-500/40 transition-all duration-300
                 shadow-lg hover:shadow-xl sm:hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden
                 min-h-[180px] sm:min-h-[220px]"
    >
      {/* Fundo sutil no hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors truncate min-w-0">
            {platform.name}
          </h3>
          <div className="p-2 bg-gray-900/70 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform flex-shrink-0 ml-2">
            <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${platform.color}`} />
          </div>
        </div>

        {/* Seguidores */}
        <div className="mb-3 sm:mb-4">
          <p className="text-gray-400 text-xs sm:text-sm mb-1">
            Total de {platform.followersLabel}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-white min-h-[32px] sm:min-h-[40px] flex items-center">
            {formatNumber(followers)}
          </p>
        </div>

        {/* Crescimento */}
        <div
          className={`flex items-center gap-1.5 sm:gap-2 text-sm sm:text-lg font-semibold ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          ) : (
            <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          )}
          <span className="truncate">
            {isPositive ? "+" : ""}
            {formatNumber(Math.abs(growth))}{" "}
            <span className="hidden sm:inline">{growthText}</span>
            <span className="sm:hidden">mês</span>
          </span>
        </div>

        {/* Sparkline seguro */}
        <SafeSparkline isPositive={isPositive} />

        {/* Ver mais - oculto em mobile, visível em desktop */}
        <div className="mt-4 sm:mt-6 text-right hidden sm:block">
          <span className="inline-flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
            Ver mais
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// Componente Container para mobile scroll
export function PlatformCardsContainer({ children }) {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      // Verificar após o conteúdo carregar
      setTimeout(checkScroll, 300);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 280; // Largura aproximada de um card
      containerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden relative">
        <div
          ref={containerRef}
          className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex gap-4 min-w-max py-1">{children}</div>
        </div>

        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gray-900/90 backdrop-blur-sm border border-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all z-10"
          >
            <ArrowUpRight className="w-4 h-4 text-gray-300 rotate-90" />
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-gray-900/90 backdrop-blur-sm border border-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all z-10"
          >
            <ArrowUpRight className="w-4 h-4 text-gray-300 -rotate-90" />
          </button>
        )}

        {/* Indicadores de scroll */}
        <div className="flex justify-center gap-1.5 mt-4">
          {[1, 2, 3, 4].map((dot) => (
            <div
              key={dot}
              className={`w-1.5 h-1.5 rounded-full ${
                dot === 3 ? "bg-cyan-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </>
  );
}

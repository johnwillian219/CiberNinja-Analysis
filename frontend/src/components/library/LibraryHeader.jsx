// src/components/library/LibraryHeader.jsx - Versão com ícones
import {
  PlusCircle,
  Search,
  Filter,
  Youtube,
  Music,
  Instagram,
  Facebook,
  Globe,
} from "lucide-react";

export default function LibraryHeader({ searchQuery = "", onSearchChange }) {
  const platforms = [
    {
      name: "Todos",
      icon: Globe,
      color: "text-gray-400",
      bg: "bg-gray-700/50",
      active: true,
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      name: "TikTok",
      icon: Music,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
  ];

  const performanceFilters = [
    { label: "Alto CTR", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Mais Views", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Melhores", color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="mb-6 ">
      {/* Header compacto */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span>Biblioteca</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">Seus vídeos e análises</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg text-gray-300 text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Novo</span>
          </button>
        </div>
      </div>

      {/* Barra de busca melhorada */}
      <div className="relative mb-4 group">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 group-hover:text-purple-400 transition-colors">
          <Search className="w-4 h-4 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Buscar vídeos, shorts, posts..."
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors group-hover:border-purple-500/50"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange?.("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
          >
            ×
          </button>
        )}
      </div>

      {/* Filtros de plataforma com ícones */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-700">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <button
              key={index}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                platform.active
                  ? `${platform.bg} ${platform.color} border ${platform.color}/30`
                  : `${platform.bg} text-gray-300 hover:text-white border border-transparent hover:border-gray-600`
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{platform.name}</span>
            </button>
          );
        })}
      </div>

      {/* Filtros de performance (apenas desktop) */}
      <div className="hidden sm:flex items-center gap-2 mt-3">
        <span className="text-gray-500 text-xs font-medium">Performance:</span>
        {performanceFilters.map((filter, index) => (
          <button
            key={index}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium ${filter.bg} ${filter.color} hover:opacity-90 transition-opacity`}
          >
            <span>•</span>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Stats rápidas (mobile apenas) */}
      <div className="sm:hidden flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-white text-sm font-bold">428</p>
            <p className="text-gray-400 text-xs">Vídeos</p>
          </div>
          <div className="text-center">
            <p className="text-white text-sm font-bold">8.5M</p>
            <p className="text-gray-400 text-xs">Views</p>
          </div>
          <div className="text-center">
            <p className="text-emerald-400 text-sm font-bold">+28%</p>
            <p className="text-gray-400 text-xs">Crescimento</p>
          </div>
        </div>
        <button className="text-purple-400 text-xs font-medium hover:text-purple-300 transition-colors">
          Ver stats →
        </button>
      </div>
    </div>
  );
}

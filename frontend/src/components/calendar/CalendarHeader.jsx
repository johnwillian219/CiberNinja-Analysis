// src/components/calendar/CalendarHeader.jsx
import { PlusCircle } from "lucide-react";
import PlatformSelectorDropdown from "./PlatformSelectorDropdown";
import { Link } from "react-router-dom";

export default function CalendarHeader({ selectedPlatform, onPlatformChange }) {
  return (
    <div className="mb-6 md:mb-8">
      {/* Título principal - mais compacto */}
      <div className="text-center mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 md:mb-3">
          Calendário de Postagens
        </h1>
        <p className="text-gray-300 text-xs md:text-sm lg:text-base max-w-3xl mx-auto px-2 leading-relaxed">
          Planeje seu conteúdo com inteligência. A IA sugere os melhores
          horários para cada plataforma.
        </p>
      </div>

      {/* Dropdown de plataforma + botão agendar - sempre lado a lado */}
      <div className="flex flex-row items-center justify-center gap-3">
        {/* Dropdown - largura fixa */}
        <div className="w-auto">
          <PlatformSelectorDropdown
            selectedPlatform={selectedPlatform}
            onPlatformChange={onPlatformChange}
          />
        </div>

        {/* Botão que leva para a página de agendamento */}
        <Link
          to="/scheduling"
          className="flex items-center justify-center gap-2 px-3 py-2.5 md:px-4 md:py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg md:rounded-xl text-white text-sm md:text-base font-bold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-200 whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4 md:w-5 md:h-5" />
          <span>Agendar</span>
          <span className="hidden md:inline"> Conteúdo</span>
        </Link>
      </div>
    </div>
  );
}

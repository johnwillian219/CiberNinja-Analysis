// src/components/calendar/CalendarHeader.jsx
import { PlusCircle } from "lucide-react";
import PlatformSelectorDropdown from "./PlatformSelectorDropdown";
import { Link } from "react-router-dom"; // ← import do react-router-dom

export default function CalendarHeader({ selectedPlatform, onPlatformChange }) {
  return (
    <div className="mb-20">
      {/* Título principal */}
      <div className="text-center mb-12">
        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Calendário de Postagens
        </h1>
        <p className="text-gray-300 text-xl lg:text-2xl max-w-5xl mx-auto px-4 leading-relaxed">
          Planeje seu conteúdo com inteligência. A IA sugere os melhores
          horários para cada plataforma.
        </p>
      </div>

      {/* Dropdown de plataforma + botão agendar */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Dropdown */}
        <PlatformSelectorDropdown
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
        />

        {/* Botão que leva para a página de agendamento */}
        <Link
          to="/scheduling"
          className="flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl text-white text-2xl font-bold hover:shadow-2xl hover:shadow-cyan-500/60 transition-all duration-300"
        >
          <PlusCircle className="w-10 h-10" />
          Agendar Novo Conteúdo
        </Link>
      </div>
    </div>
  );
}

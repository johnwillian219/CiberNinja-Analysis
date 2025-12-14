// src/components/calendar/CalendarGrid/MonthView.jsx

export default function MonthView() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
      <h3 className="text-3xl font-bold text-white text-center mb-10">
        Dezembro 2025 - Visualização Mensal
      </h3>

      {/* Cabeçalho dos dias da semana */}
      <div className="grid grid-cols-7 gap-4 mb-8 text-center text-gray-400 font-bold text-lg">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Grid de dias */}
      <div className="grid grid-cols-7 gap-6">
        {/* Dia 1 começa na segunda (exemplo) */}
        <div className="min-h-32" /> {/* vazio */}
        {days.map((day) => (
          <div
            key={day}
            className="min-h-36 bg-gray-900/60 rounded-2xl p-5 border border-gray-700/30 flex flex-col"
          >
            <p className="text-white font-bold text-xl mb-4">{day}</p>

            {/* Simulação de evento no dia 15 */}
            {day === 15 && (
              <div className="bg-purple-500/20 border border-purple-500/40 rounded-xl p-3 text-center">
                <p className="text-purple-300 font-bold text-sm">Vídeo</p>
                <p className="text-gray-300 text-xs">18:00</p>
              </div>
            )}

            {/* Simulação de evento no dia 18 */}
            {day === 18 && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-3 text-center">
                <p className="text-emerald-300 font-bold text-sm">Short</p>
                <p className="text-gray-300 text-xs">12:00</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

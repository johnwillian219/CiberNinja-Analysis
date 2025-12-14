// src/components/calendar/CalendarHeader.jsx
export default function CalendarHeader() {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-6">
        Calendário de Postagens
      </h1>
      <p className="text-gray-300 text-xl lg:text-2xl max-w-4xl mx-auto px-4 leading-relaxed">
        Planeje seu conteúdo com inteligência. A IA analisa seu público e sugere
        os melhores horários e tipos de post para maximizar visualizações e
        engajamento.
      </p>
    </div>
  );
}

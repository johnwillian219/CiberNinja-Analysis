// src/components/calendar/CalendarGrid/WeekView.jsx
import CalendarEventDetailed from "../CalendarEvent/CalendarEventDetailed";

const weekEvents = [
  {
    id: 1,
    title: "Tutorial Avançado de Kali Linux",
    time: "18:00",
    description: "Ferramentas avançadas",
    platform: "YouTube",
  },
  {
    id: 2,
    title: "Live: Respondendo dúvidas",
    time: "20:00",
    description: "Sessão ao vivo",
    platform: "YouTube",
  },
];

export default function WeekView() {
  return (
    <div className="space-y-12">
      <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10">
        <h3 className="text-3xl font-bold text-white mb-8">
          Semana de 15 a 21 de Dezembro
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {weekEvents.map((event) => (
            <CalendarEventDetailed key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

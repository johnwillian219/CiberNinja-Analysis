// src/components/calendar/CalendarGrid/DayView.jsx
import CalendarEventDetailed from "../CalendarEvent/CalendarEventDetailed";

const dayEvents = [
  {
    id: 1,
    title: "Dica rápida: proteger senha",
    time: "12:00",
    description: "3 dicas em 60s",
    platform: "TikTok",
  },
];

export default function DayView() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Quinta-feira, 18 de Dezembro de 2025
      </h2>
      <div className="space-y-10">
        {dayEvents.map((event) => (
          <CalendarEventDetailed key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

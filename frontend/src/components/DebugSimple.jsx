// src/components/DebugSimple.jsx
import { useEvents } from "./calendar/context/EventsContext";
import { useEffect } from "react";

export default function DebugSimple() {
  const { events } = useEvents();

  useEffect(() => {
    console.log("=== DEBUG SIMPLE ===");
    console.log("Total de eventos:", events.length);

    // Mostrar os últimos 5 eventos
    const recentEvents = events.slice(-5);
    console.log(
      "Últimos eventos:",
      recentEvents.map((e) => ({
        id: e.id?.slice(-10),
        title: e.title?.slice(0, 20),
        date: e.date,
        time: e.time,
        platform: e.platform,
      }))
    );

    // Verificar IDs duplicados
    const ids = events.map((e) => e.id);
    const uniqueIds = [...new Set(ids)];
    if (ids.length !== uniqueIds.length) {
      console.error("🚨 IDs DUPLICADOS ENCONTRADOS!");
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      console.error("IDs duplicados:", duplicates);
    }
  }, [events]);

  return null;
}

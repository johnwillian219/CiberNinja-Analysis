// src/components/calendar/hooks/useEvents.js
import { useState, useCallback } from "react";

export default function useEvents(initialEvents = []) {
  const [events, setEvents] = useState(initialEvents);

  // CREATE
  const addEvent = useCallback((newEvent) => {
    setEvents((prev) => [
      ...prev,
      {
        ...newEvent,
        id: Date.now(), // ID temporário (em produção: viria da API)
        status: "scheduled",
      },
    ]);
  }, []);

  // UPDATE
  const updateEvent = useCallback((id, updatedFields) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...updatedFields } : event
      )
    );
  }, []);

  // DELETE
  const deleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  // MOVE (para drag & drop)
  const moveEvent = useCallback((eventId, newDate) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, date: newDate } : event
      )
    );
  }, []);

  // Filtrar eventos por plataforma
  const getEventsByPlatform = useCallback(
    (platform) => {
      if (!platform || platform === "all") return events;
      return events.filter((event) => event.platform === platform);
    },
    [events]
  );

  // Filtrar eventos por data (para um dia específico)
  const getEventsForDate = useCallback(
    (dateStr, platform = null) => {
      let filtered = events.filter((event) => event.date === dateStr);
      if (platform && platform !== "all") {
        filtered = filtered.filter((event) => event.platform === platform);
      }
      return filtered;
    },
    [events, platform]
  );

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    moveEvent,
    getEventsByPlatform,
    getEventsForDate,
  };
}

// src/components/calendar/context/EventsContext.jsx
import { createContext, useContext, useState } from "react";
import eventsByPlatform from "../data/eventsByPlatform";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  // Converter eventsByPlatform para array plano
  const initialEvents = Object.values(eventsByPlatform).flat();

  const [events, setEvents] = useState(initialEvents);
  // Estado para manter também a estrutura por plataforma (se necessário)
  const [eventsByPlatformState, setEventsByPlatformState] =
    useState(eventsByPlatform);

  const addEvent = (newEvent) => {
    console.log("Adicionando novo evento:", newEvent);

    const eventWithId = {
      ...newEvent,
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      date: newEvent.date,
      time: newEvent.time,
      title:
        newEvent.title ||
        `${newEvent.typeLabel || newEvent.type} - ${newEvent.platform}`,
      description: newEvent.description || "",
      type: newEvent.type?.toLowerCase() || "video",
      platform: newEvent.platform,
      isBestTime: newEvent.isBestTime || false,
      status: "scheduled", // Adicionar status padrão
    };

    // Atualizar array de eventos
    setEvents((prev) => [...prev, eventWithId]);

    // Atualizar estrutura por plataforma
    setEventsByPlatformState((prev) => {
      const platform = newEvent.platform;
      const updated = { ...prev };

      if (!updated[platform]) {
        updated[platform] = [];
      }

      updated[platform].push(eventWithId);
      return updated;
    });

    // Atualizar também o arquivo estático (para persistência)
    updateStaticEvents(newEvent.platform, eventWithId);

    return eventWithId;
  };

  // Função para atualizar o arquivo estático (simulação)
  const updateStaticEvents = (platform, event) => {
    console.log("Evento adicionado à plataforma:", platform, event);

    // Aqui você poderia fazer uma chamada API para salvar no backend
    // Por enquanto, apenas logamos
  };

  const deleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));

    // Atualizar também a estrutura por plataforma
    setEventsByPlatformState((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((platform) => {
        updated[platform] = updated[platform].filter((e) => e.id !== eventId);
      });
      return updated;
    });
  };

  const getEventsForPlatform = (platform) => {
    if (!platform) return events;
    return events.filter((e) => e.platform === platform);
  };

  const getEventsForDate = (dateString) => {
    return events.filter((event) => event.date === dateString);
  };

  // Função para obter eventos por plataforma (estruturado)
  const getEventsByPlatform = () => {
    return eventsByPlatformState;
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        eventsByPlatform: eventsByPlatformState, // Disponibilizar também estruturado
        addEvent,
        deleteEvent,
        getEventsForPlatform,
        getEventsForDate,
        getEventsByPlatform,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within EventsProvider");
  }
  return context;
};

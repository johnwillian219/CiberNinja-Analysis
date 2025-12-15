// src/components/calendar/hooks/useCalendarEvents.js
import { useState, useMemo } from "react";
import { useEvents } from "../context/EventsContext";

export default function useCalendarEvents(initialView = "month") {
  const { events, getEventsForDate } = useEvents();
  const [currentView, setCurrentView] = useState(initialView);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Cálculo de dias no mês
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  // Primeiro dia da semana do mês
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  // Ajuste para começar na segunda-feira
  const firstDayWeekday = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Navegação
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  // Formatação do mês/ano
  const formattedMonthYear = currentMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  // Função para obter eventos de uma data específica
  const getEventsForDateFormatted = (dateString) => {
    return getEventsForDate(dateString);
  };

  // Gerar array de dias do mês com seus eventos
  const monthDaysWithEvents = useMemo(() => {
    const daysArray = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1; // Mês 1-12

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      const dayEvents = getEventsForDate(dateStr);

      daysArray.push({
        date: day,
        dateStr: dateStr,
        isToday: isToday(year, month, day),
        events: dayEvents,
        hasEvents: dayEvents.length > 0,
      });
    }

    return daysArray;
  }, [currentMonth, events]);

  // Verificar se é hoje
  const isToday = (year, month, day) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() + 1 === month &&
      today.getDate() === day
    );
  };

  return {
    // Estado e navegação do calendário
    currentView,
    setCurrentView,
    currentMonth,
    setCurrentMonth,
    daysInMonth,
    firstDayWeekday,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    formattedMonthYear,

    // Dados de eventos
    events,
    getEventsForDate: getEventsForDateFormatted,
    monthDaysWithEvents,

    // Estatísticas
    totalEvents: events.length,
    eventsThisMonth: events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getMonth() === currentMonth.getMonth() &&
        eventDate.getFullYear() === currentMonth.getFullYear()
      );
    }).length,
  };
}

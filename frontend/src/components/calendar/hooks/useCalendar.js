// src/components/calendar/hooks/useCalendar.js
import { useState, useMemo } from "react";
import { mockEvents } from "../data/mockEvents";

export default function useCalendar(initialView = "month") {
  const [currentView, setCurrentView] = useState(initialView);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // Dezembro 2025 (mês 11 = Dezembro)

  // Cálculo dos dias do mês atual
  const daysInMonth = useMemo(() => {
    return new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
  }, [currentMonth]);

  // Dia da semana do primeiro dia do mês (0 = Domingo, 1 = Segunda, ..., 6 = Sábado)
  // Ajustado para começar na segunda-feira (padrão brasileiro/europeu)
  const firstDayWeekday = useMemo(() => {
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // 0 = Segunda, 6 = Domingo
  }, [currentMonth]);

  // Filtra eventos do mês atual
  const monthEvents = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1; // getMonth() é 0-based

    return mockEvents.filter((event) => {
      const [eventYear, eventMonth] = event.date.split("-").map(Number);
      return eventYear === year && eventMonth === month;
    });
  }, [currentMonth]);

  // Retorna eventos de um dia específico (1 a 31)
  const getEventsForDay = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return monthEvents.filter((event) => event.date === dateStr);
  };

  // Navegação entre meses
  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const goToPreviousMonth = () => navigateMonth(-1);
  const goToNextMonth = () => navigateMonth(1);

  // Formatação simples de data (pode ser melhorada com date-fns se quiser)
  const formatMonthYear = () => {
    return currentMonth.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  };

  return {
    // Estado
    currentView,
    setCurrentView,
    currentMonth,

    // Navegação
    goToPreviousMonth,
    goToNextMonth,
    formatMonthYear,

    // Dados do grid
    daysInMonth,
    firstDayWeekday,
    monthEvents,
    getEventsForDay,
  };
}

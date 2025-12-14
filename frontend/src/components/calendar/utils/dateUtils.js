// src/components/calendar/utils/dateUtils.js

export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1; // Segunda como primeiro dia (0 = segunda)
};

export const formatDate = (date) => {
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

export const formatBrazilianDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const getWeekdayName = (weekdayIndex) => {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return days[weekdayIndex];
};

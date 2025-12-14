// src/components/calendar/CalendarEvent/CalendarEventCompact.jsx
import CalendarEventCard from "./CalendarEventCard";

export default function CalendarEventCompact({ event }) {
  return <CalendarEventCard event={event} variant="compact" />;
}

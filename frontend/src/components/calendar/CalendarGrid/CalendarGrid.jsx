// src/components/calendar/CalendarGrid/CalendarGrid.jsx
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";

export default function CalendarGrid({ view = "month" }) {
  return (
    <div className="mt-12">
      {view === "month" && <MonthView />}
      {view === "week" && <WeekView />}
      {view === "day" && <DayView />}
    </div>
  );
}

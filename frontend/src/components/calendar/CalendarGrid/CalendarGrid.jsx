// src/components/calendar/CalendarGrid/CalendarGrid.jsx
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";

export default function CalendarGrid({ view = "month", platform }) {
  const viewProps = { platform };

  return (
    <div className="mt-12">
      {view === "month" && <MonthView {...viewProps} />}
      {view === "week" && <WeekView {...viewProps} />}
      {view === "day" && <DayView {...viewProps} />}
    </div>
  );
}

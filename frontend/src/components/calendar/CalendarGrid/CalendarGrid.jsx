// src/components/calendar/CalendarGrid/CalendarGrid.jsx
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";

export default function CalendarGrid({
  view = "month",
  platform,
  currentMonth,
}) {
  const viewProps = { platform, currentMonth };

  return (
    <div className="mt-2 md:mt-4 lg:mt-6">
      {view === "month" && <MonthView {...viewProps} />}
      {view === "week" && <WeekView {...viewProps} />}
      {view === "day" && <DayView {...viewProps} />}
    </div>
  );
}

// src/pages/CalendarPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { useState } from "react";

import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarViewSwitcher from "../components/calendar/CalendarViewSwitcher";
import CalendarNavigation from "../components/calendar/CalendarNavigation";
import CalendarGrid from "../components/calendar/CalendarGrid/CalendarGrid";

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState("month");
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11)); // Dezembro 2025

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10 min-h-screen">
        <CalendarHeader />

        <div className="max-w-7xl mx-auto">
          <CalendarNavigation
            currentMonth={currentMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />

          <CalendarViewSwitcher
            activeView={currentView}
            onViewChange={setCurrentView}
          />

          <CalendarGrid view={currentView} currentMonth={currentMonth} />
        </div>
      </div>
    </DashboardLayout>
  );
}

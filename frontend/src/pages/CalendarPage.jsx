// src/pages/CalendarPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { useState } from "react";

import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarViewSwitcher from "../components/calendar/CalendarViewSwitcher";
import CalendarNavigation from "../components/calendar/CalendarNavigation";
import CalendarGrid from "../components/calendar/CalendarGrid/CalendarGrid";
import SchedulingModal from "../components/Modal/SchedulingModal";

import { EventsProvider } from "../components/calendar/context/EventsContext";

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState("month");
  const [selectedPlatform, setSelectedPlatform] = useState("YouTube");
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11));
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-10 min-h-screen">
        <EventsProvider>
          <CalendarHeader
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
            onOpenScheduling={() => setIsSchedulingOpen(true)}
          />

          <div className="max-w-7xl mx-auto">
            <CalendarNavigation
              currentMonth={currentMonth}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />

            <div className="my-8 lg:my-12">
              <CalendarViewSwitcher
                activeView={currentView}
                onViewChange={setCurrentView}
              />
            </div>

            <CalendarGrid
              view={currentView}
              platform={selectedPlatform}
              currentMonth={currentMonth}
            />
          </div>
        </EventsProvider>

        <SchedulingModal
          isOpen={isSchedulingOpen}
          onClose={() => setIsSchedulingOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}

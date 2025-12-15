// src/pages/CalendarPage.jsx
import DashboardLayout from "../components/layout/DashboardLayout";
import { useState } from "react";

import CalendarHeader from "../components/calendar/CalendarHeader";
import CalendarViewSwitcher from "../components/calendar/CalendarViewSwitcher";
import CalendarNavigation from "../components/calendar/CalendarNavigation";
import CalendarGrid from "../components/calendar/CalendarGrid/CalendarGrid";
import SchedulingModal from "../components/Modal/SchedulingModal";

import { EventsProvider } from "../components/calendar/context/EventsContext"; // ← import do Provider

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
      <div className="p-6 lg:p-10 min-h-screen">
        {/* Provider envolvendo todo o conteúdo do calendário */}
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

            <div className="my-12">
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

        {/* Modal de agendamento fora do Provider (não precisa de eventos) */}
        <SchedulingModal
          isOpen={isSchedulingOpen}
          onClose={() => setIsSchedulingOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}

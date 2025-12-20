// src/components/wizard/WizardNavigation.jsx
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function WizardNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex justify-between items-center gap-3 sm:gap-4">
      <button
        onClick={onPrevious}
        disabled={currentStep === 0}
        className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 flex-1 ${
          currentStep === 0
            ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
            : "bg-gray-700/70 text-white hover:bg-gray-600/70 active:scale-95 border border-gray-600/50"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Voltar</span>
      </button>

      <div className="text-center px-3 py-1.5 bg-gray-800/50 rounded-lg border border-gray-700/50 min-w-[80px]">
        <span className="text-gray-300 text-xs sm:text-sm">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2 flex-1 ${
          currentStep === totalSteps - 1
            ? "bg-emerald-600 text-white cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/20 active:scale-95"
        }`}
      >
        {currentStep === totalSteps - 1 ? (
          <>
            <Check className="w-4 h-4" />
            <span className="hidden sm:inline">Concluir</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">Próximo</span>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}

// src/components/compare/wizard/WizardNavigation.jsx
export default function WizardNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex justify-between mt-16 max-w-4xl mx-auto">
      <button
        onClick={onPrevious}
        disabled={currentStep === 0}
        className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
          currentStep === 0
            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        ← Anterior
      </button>

      <button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
          currentStep === totalSteps - 1
            ? "bg-emerald-600 text-white cursor-not-allowed"
            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50"
        }`}
      >
        {currentStep === totalSteps - 1 ? "Concluído ✅" : "Próximo →"}
      </button>
    </div>
  );
}

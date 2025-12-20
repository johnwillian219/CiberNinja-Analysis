// src/components/wizard/WizardProgressBar.jsx
export default function WizardProgressBar({
  steps,
  currentStep,
  progress,
  onStepClick,
}) {
  return (
    <div className="relative">
      {/* Linha de fundo */}
      <div className="absolute inset-x-0 top-4 h-1.5 bg-gray-700/50 rounded-full" />

      {/* Linha de progresso */}
      <div
        className="absolute inset-x-0 top-4 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />

      {/* Etapas */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => onStepClick && onStepClick(index)}
            disabled={index > currentStep}
            className="flex flex-col items-center group flex-1 min-w-0"
          >
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                index < currentStep
                  ? "bg-emerald-500 text-white shadow-emerald-500/30"
                  : index === currentStep
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-110"
                  : "bg-gray-700 text-gray-400"
              } group-hover:scale-110 active:scale-95`}
            >
              {index < currentStep ? "✓" : step.number}
            </div>

            {/* Texto */}
            <p
              className={`mt-1.5 text-xs font-medium transition-colors truncate w-full text-center px-1 ${
                index <= currentStep ? "text-white" : "text-gray-500"
              }`}
            >
              {step.shortTitle}
            </p>
          </button>
        ))}
      </div>

      {/* Progresso em porcentagem (opcional, pode remover para mais compacto) */}
      <div className="text-center mt-4">
        <p className="text-gray-300 text-xs">
          Progresso:{" "}
          <span className="text-purple-400 font-bold text-sm">
            {Math.round(progress)}%
          </span>
        </p>
      </div>
    </div>
  );
}

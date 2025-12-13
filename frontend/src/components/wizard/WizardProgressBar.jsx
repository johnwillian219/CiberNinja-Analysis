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
      <div className="absolute inset-x-0 top-8 h-2 bg-gray-700 rounded-full" />

      {/* Linha de progresso */}
      <div
        className="absolute inset-x-0 top-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700"
        style={{ width: `${progress}%` }}
      />

      {/* Etapas */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => onStepClick && onStepClick(index)}
            disabled={index > currentStep}
            className="flex flex-col items-center group"
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-500 shadow-lg ${
                index < currentStep
                  ? "bg-emerald-500 text-white shadow-emerald-500/50"
                  : index === currentStep
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl shadow-purple-500/60 scale-115"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              } group-hover:scale-115`}
            >
              {index < currentStep ? "✓" : step.number}
            </div>

            {/* Texto curto e responsivo */}
            <p
              className={`mt-4 text-sm lg:text-base font-medium transition-colors whitespace-nowrap ${
                index <= currentStep ? "text-white" : "text-gray-500"
              }`}
            >
              {step.shortTitle}
            </p>
          </button>
        ))}
      </div>

      {/* Progresso em porcentagem */}
      <div className="text-center mt-10">
        <p className="text-gray-300 text-lg">
          Progresso:{" "}
          <span className="text-purple-400 font-bold text-2xl">
            {Math.round(progress)}%
          </span>
        </p>
      </div>
    </div>
  );
}

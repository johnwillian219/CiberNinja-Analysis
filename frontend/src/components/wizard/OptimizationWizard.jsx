// src/components/wizard/OptimizationWizard.jsx
import { useState } from "react";
import WizardProgressBar from "./WizardProgressBar";
import WizardNavigation from "./WizardNavigation";
import Step1_ThumbnailLab from "./steps/Step1_ThumbnailLab";
import Step2_TitleOptimizer from "./steps/Step2_TitleOptimizer";
import Step3_DescriptionDoctor from "./steps/Step3_DescriptionDoctor";
import Step4_TagAnalyzer from "./steps/Step4_TagAnalyzer";
import Step5_ContentDissector from "./steps/Step5_ContentDissector";
import Step6_OptimizationReport from "./steps/Step6_OptimizationReport";

const steps = [
  {
    number: 1,
    title: "Thumbnail",
    shortTitle: "Thumbnail",
    component: Step1_ThumbnailLab,
  },
  {
    number: 2,
    title: "Título",
    shortTitle: "Título",
    component: Step2_TitleOptimizer,
  },
  {
    number: 3,
    title: "Descrição",
    shortTitle: "Descrição",
    component: Step3_DescriptionDoctor,
  },
  {
    number: 4,
    title: "Tags",
    shortTitle: "Tags",
    component: Step4_TagAnalyzer,
  },
  {
    number: 5,
    title: "Estrutura do Vídeo",
    shortTitle: "Estrutura",
    component: Step5_ContentDissector,
  },
  {
    number: 6,
    title: "Relatório Final",
    shortTitle: "Relatório",
    component: Step6_OptimizationReport,
  },
];

export default function OptimizationWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
      {/* Cabeçalho compacto */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-700/50">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">
          Fluxo de Otimização
        </h2>
        <p className="text-center text-gray-300 mt-1 text-xs sm:text-sm">
          Etapa{" "}
          <span className="text-purple-400 font-semibold">
            {currentStep + 1}
          </span>{" "}
          de {steps.length}
        </p>
      </div>

      {/* Barra de progresso compacta */}
      <div className="px-4 sm:px-6 py-4">
        <WizardProgressBar
          steps={steps}
          currentStep={currentStep}
          progress={progress}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Conteúdo da etapa */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="mt-2 sm:mt-3">
          <CurrentComponent />
        </div>
      </div>

      {/* Navegação compacta */}
      <div className="bg-gray-900/30 border-t border-gray-700/50 px-4 sm:px-6 py-4">
        <WizardNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}

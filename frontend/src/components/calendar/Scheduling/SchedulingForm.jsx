// src/components/calendar/Scheduling/SchedulingForm.jsx
import {
  Youtube,
  Music,
  Instagram,
  Facebook,
  Calendar,
  Clock,
  Type,
  FileText,
  Sparkles,
  Check,
  ChevronRight,
  Video,
  Zap,
  Radio,
  FileImage,
  Globe,
} from "lucide-react";
import { useEvents } from "../context/EventsContext";
import { useState, useCallback, useEffect, useRef } from "react";

const platforms = [
  {
    name: "YouTube",
    icon: Youtube,
    color: "bg-red-500",
    label: "YT",
    description: "Vídeos longos",
  },
  {
    name: "TikTok",
    icon: Music,
    color: "bg-pink-500",
    label: "TT",
    description: "Shorts",
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "bg-purple-500",
    label: "IG",
    description: "Reels e Posts",
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-500",
    label: "FB",
    description: "Posts e Lives",
  },
];

const types = [
  {
    label: "Vídeo",
    icon: Video,
    description: "Vídeo tradicional",
  },
  {
    label: "Short/Reel",
    icon: Zap,
    description: "Vídeo curto",
  },
  {
    label: "Live",
    icon: Radio,
    description: "Transmissão ao vivo",
  },
  {
    label: "Post",
    icon: FileImage,
    description: "Imagem ou texto",
  },
];

const typeToKey = {
  Vídeo: "video",
  "Short/Reel": "short",
  Live: "live",
  Post: "post",
};

export default function SchedulingForm({ onSuccess, onFormChange, formData }) {
  const { addEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const hasSubmittedRef = useRef(false);
  const formRef = useRef(null);

  const data = formData || {
    platform: "YouTube",
    type: "Vídeo",
    title: "",
    description: "",
    date: "",
    time: "",
    isBestTime: true,
  };

  const handleChange = useCallback(
    (field, value) => {
      const updatedData = { ...data, [field]: value };
      if (onFormChange) onFormChange(updatedData);
    },
    [data, onFormChange]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (hasSubmittedRef.current || isSubmitting) return;

      if (!data.title || !data.date || !data.time) {
        alert("Preencha título, data e horário!");
        return;
      }

      hasSubmittedRef.current = true;
      setIsSubmitting(true);

      try {
        const eventData = {
          platform: data.platform,
          type: typeToKey[data.type] || "video",
          typeLabel: data.type,
          title: data.title.trim(),
          description: data.description.trim(),
          date: data.date,
          time: data.time,
          isBestTime: data.isBestTime || false,
        };

        const newEvent = addEvent(eventData);
        if (newEvent && onSuccess) {
          setTimeout(() => onSuccess(eventData), 100);
        } else if (!newEvent) {
          alert("Este evento já foi agendado.");
        }
      } catch (error) {
        alert("Erro ao agendar. Tente novamente.");
        hasSubmittedRef.current = false;
      } finally {
        setTimeout(() => {
          setIsSubmitting(false);
          hasSubmittedRef.current = false;
        }, 2000);
      }
    },
    [data, isSubmitting, addEvent, onSuccess]
  );

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const handleSubmitInternal = (e) => handleSubmit(e);
    form.addEventListener("submit", handleSubmitInternal);
    return () => form.removeEventListener("submit", handleSubmitInternal);
  }, [handleSubmit]);

  const selectedPlatform = platforms.find((p) => p.name === data.platform);
  const selectedType = types.find((t) => t.label === data.type);

  const steps = ["Plataforma", "Tipo", "Detalhes", "Agendamento"];
  const stepIcons = [Globe, Type, FileText, Clock];
  const StepIcon = stepIcons[activeStep];

  return (
    <form
      ref={formRef}
      className="space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Header com indicador visual */}
      <div className="bg-gray-800/50 rounded-xl p-3 mb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <StepIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {steps[activeStep]}
              </h2>
              <p className="text-xs text-gray-400">
                Passo {activeStep + 1} de {steps.length}
              </p>
            </div>
          </div>

          {/* Indicador de progresso circular */}
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {activeStep + 1}
              </span>
            </div>
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="9"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
              />
              <circle
                cx="20"
                cy="20"
                r="9"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeDasharray={`${
                  ((activeStep + 1) / steps.length) * 56.5
                } 56.5`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Indicador visual da seleção atual */}
        <div className="flex items-center gap-2 text-xs text-gray-300">
          <div className={`w-2 h-2 rounded-full ${selectedPlatform?.color}`} />
          <span>{selectedPlatform?.name}</span>
          <span className="text-gray-500">•</span>
          <span>{selectedType?.label}</span>
        </div>
      </div>

      {/* Conteúdo por etapa */}
      <div className="space-y-4">
        {/* Etapa 1: Plataforma */}
        {activeStep === 0 && (
          <div className="animate-fadeIn">
            <div className="mb-3">
              <p className="text-sm text-gray-300 mb-2">
                Onde você vai postar?
              </p>
              <p className="text-xs text-gray-400">Selecione a plataforma:</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {platforms.map((p) => {
                const PIcon = p.icon;
                return (
                  <button
                    type="button"
                    key={p.name}
                    onClick={() => {
                      handleChange("platform", p.name);
                      setActiveStep(1);
                    }}
                    className={`p-3 rounded-xl border transition-all text-left group ${
                      data.platform === p.name
                        ? `${p.color} border-transparent text-white shadow-md`
                        : "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center`}
                      >
                        <PIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{p.label}</p>
                        <p className="text-xs opacity-80">{p.name}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-300 mt-1">
                      {p.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Etapa 2: Tipo de Conteúdo */}
        {activeStep === 1 && (
          <div className="animate-fadeIn">
            <div className="mb-3">
              <p className="text-sm text-gray-300 mb-2">
                Qual tipo de conteúdo?
              </p>
              <p className="text-xs text-gray-400">Escolha o formato:</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {types.map((t) => {
                const TIcon = t.icon;
                return (
                  <button
                    type="button"
                    key={t.label}
                    onClick={() => {
                      handleChange("type", t.label);
                      setActiveStep(2);
                    }}
                    className={`p-3 rounded-xl border transition-all text-center group ${
                      data.type === t.label
                        ? "border-purple-500 bg-purple-500/10 text-purple-300"
                        : "border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center mb-1.5 group-hover:bg-gray-700">
                        <TIcon className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-xs mb-0.5">{t.label}</p>
                      <p className="text-[10px] text-gray-400">
                        {t.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Etapa 3: Detalhes do Conteúdo */}
        {activeStep === 2 && (
          <div className="animate-fadeIn space-y-3">
            <div>
              <p className="text-sm text-gray-300 mb-2">Detalhes do conteúdo</p>
              <p className="text-xs text-gray-400 mb-3">
                Preencha as informações:
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Título obrigatório
                  </label>
                  <input
                    type="text"
                    value={data.title || ""}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Ex: Tutorial de segurança digital"
                    className="w-full px-3 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none transition-all placeholder-gray-500"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Descrição (opcional)
                  </label>
                  <div className="relative">
                    <textarea
                      value={data.description || ""}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      rows={3}
                      placeholder="Adicione detalhes, hashtags, links..."
                      className="w-full px-3 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg text-white text-sm resize-none focus:border-purple-500 focus:outline-none transition-all placeholder-gray-500 pr-10"
                      disabled={isSubmitting}
                    />
                    <FileText className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Etapa 4: Data e Hora */}
        {activeStep === 3 && (
          <div className="animate-fadeIn space-y-3">
            <div>
              <p className="text-sm text-gray-300 mb-2">Quando postar?</p>
              <p className="text-xs text-gray-400 mb-3">
                Defina data e horário:
              </p>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">
                      Data
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={data.date || ""}
                        onChange={(e) => handleChange("date", e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">
                      Horário
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="time"
                        value={data.time || ""}
                        onChange={(e) => handleChange("time", e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg text-white text-sm focus:border-purple-500 focus:outline-none transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Sugestão da IA */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={data.isBestTime || true}
                        onChange={(e) =>
                          handleChange("isBestTime", e.target.checked)
                        }
                        className="sr-only"
                        disabled={isSubmitting}
                      />
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                          data.isBestTime
                            ? "border-yellow-500 bg-yellow-500"
                            : "border-gray-600 bg-gray-800"
                        }`}
                      >
                        {data.isBestTime && (
                          <Sparkles className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-xs font-medium text-yellow-300">
                          Horário sugerido pela IA
                        </span>
                      </div>
                      <p className="text-[10px] text-yellow-400/80">
                        Baseado no histórico de engajamento
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview */}
            {(data.title || data.date || data.time) && (
              <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                <p className="text-xs text-gray-400 mb-1.5">
                  Pré-visualização:
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white truncate">
                      {data.title || "Sem título"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {data.time || "--:--"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${selectedPlatform?.color} text-white`}
                    >
                      {selectedPlatform?.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      {selectedType?.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      {data.date || "Sem data"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navegação entre etapas */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <button
          type="button"
          onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
          disabled={activeStep === 0}
          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
            activeStep === 0
              ? "text-gray-600 cursor-not-allowed"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          Voltar
        </button>

        <div className="flex items-center gap-1">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === activeStep
                  ? "bg-purple-500"
                  : index < activeStep
                  ? "bg-purple-300"
                  : "bg-gray-700"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            if (activeStep < steps.length - 1) {
              setActiveStep((prev) => prev + 1);
            }
          }}
          disabled={activeStep === steps.length - 1}
          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
            activeStep === steps.length - 1
              ? "text-gray-600 cursor-not-allowed"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          Próximo
        </button>
      </div>

      {/* Botão de Agendar (só aparece na última etapa) */}
      {activeStep === 3 && (
        <button
          type="submit"
          disabled={isSubmitting || !data.title || !data.date || !data.time}
          className={`w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg transition-all text-sm flex items-center justify-center gap-2 shadow-lg ${
            isSubmitting || !data.title || !data.date || !data.time
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-purple-500/30 active:scale-[0.98]"
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Agendando...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Confirmar Agendamento</span>
            </>
          )}
        </button>
      )}

      {/* Adicionar animação CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </form>
  );
}

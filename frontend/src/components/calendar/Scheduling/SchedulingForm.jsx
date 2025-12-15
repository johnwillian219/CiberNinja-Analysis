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
} from "lucide-react";
import { useEvents } from "../context/EventsContext";
import { useState, useCallback, useEffect, useRef } from "react";

const platforms = [
  { name: "YouTube", icon: Youtube, color: "from-red-500 to-pink-500" },
  { name: "TikTok", icon: Music, color: "from-pink-500 to-black" },
  {
    name: "Instagram",
    icon: Instagram,
    color: "from-purple-500 to-orange-500",
  },
  { name: "Facebook", icon: Facebook, color: "from-blue-500 to-cyan-500" },
];

const types = ["Vídeo", "Short/Reel", "Live", "Post"];

// Mapeamento de tipo para key
const typeToKey = {
  Vídeo: "video",
  "Short/Reel": "short",
  Live: "live",
  Post: "post",
};

export default function SchedulingForm({ onSuccess, onFormChange, formData }) {
  const { addEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasSubmittedRef = useRef(false);
  const formRef = useRef(null);

  // Se formData não for fornecido, use valores padrão
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

      // Notifica o componente pai sobre a mudança
      if (onFormChange) {
        onFormChange(updatedData);
      }
    },
    [data, onFormChange]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      console.log("📝 Form submit iniciado");

      // Prevenir múltiplos submissions
      if (hasSubmittedRef.current) {
        console.warn("⚠️ Form já submetido, ignorando...");
        return;
      }

      if (isSubmitting) {
        console.warn("⚠️ Já está submetendo, ignorando...");
        return;
      }

      // Validação
      if (!data.title || !data.date || !data.time) {
        alert("Por favor, preencha título, data e horário!");
        return;
      }

      // Marcar como submetido
      hasSubmittedRef.current = true;
      setIsSubmitting(true);

      console.log("🚀 Preparando dados do evento...");

      try {
        // Preparar dados
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

        console.log("📋 EventData preparado:", eventData);

        // Adicionar ao contexto
        const newEvent = addEvent(eventData);

        if (newEvent) {
          console.log("✅ Evento adicionado com sucesso:", newEvent);

          // Chamar callback de sucesso com delay para garantir
          if (onSuccess) {
            setTimeout(() => {
              console.log("🎉 Chamando onSuccess...");
              onSuccess(eventData);
            }, 100);
          }
        } else {
          console.warn("❌ Evento não foi adicionado (possível duplicado)");
          alert("Este evento já foi agendado anteriormente.");
        }
      } catch (error) {
        console.error("💥 Erro:", error);
        alert("Erro ao agendar conteúdo. Tente novamente.");
        hasSubmittedRef.current = false; // Resetar em caso de erro
      } finally {
        // Resetar estado após 2 segundos
        setTimeout(() => {
          setIsSubmitting(false);
          hasSubmittedRef.current = false;
          console.log("🏁 Estado do formulário resetado");
        }, 2000);
      }
    },
    [data, isSubmitting, addEvent, onSuccess]
  );

  // Prevenir múltiplos event listeners
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleSubmitInternal = (e) => {
      console.log("🔗 Event listener de submit acionado");
      handleSubmit(e);
    };

    form.addEventListener("submit", handleSubmitInternal);

    return () => {
      form.removeEventListener("submit", handleSubmitInternal);
    };
  }, [handleSubmit]);

  const selectedPlatform = platforms.find((p) => p.name === data.platform);
  const Icon = selectedPlatform?.icon || Youtube;

  return (
    <form
      ref={formRef}
      className="space-y-6"
      onSubmit={(e) => {
        // Prevenir comportamento padrão adicional
        e.preventDefault();
      }}
    >
      {/* Cabeçalho com plataforma selecionada */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedPlatform.color} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Novo Conteúdo</h2>
          <p className="text-gray-300 text-base">{data.platform}</p>
        </div>
      </div>

      {/* Plataforma */}
      <div>
        <label className="flex items-center gap-3 text-gray-300 text-sm font-medium mb-3">
          <div className="w-8 h-8 rounded-lg bg-gray-700/50 flex items-center justify-center">
            <Icon className="w-4 h-4 text-gray-400" />
          </div>
          Plataforma
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {platforms.map((p) => {
            const PIcon = p.icon;
            return (
              <button
                type="button"
                key={p.name}
                onClick={() => handleChange("platform", p.name)}
                className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 min-h-[90px] justify-center ${
                  data.platform === p.name
                    ? `border-purple-500 bg-gradient-to-br ${p.color} text-white shadow-md`
                    : "border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500"
                }`}
              >
                <PIcon className="w-6 h-6" />
                <span className="font-medium text-sm text-center line-clamp-2 px-1">
                  {p.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tipo de Conteúdo */}
      <div>
        <label className="flex items-center gap-3 text-gray-300 text-sm font-medium mb-3">
          <Type className="w-4 h-4 text-gray-400" />
          Tipo de Conteúdo
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {types.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => handleChange("type", t)}
              className={`py-3 px-2 rounded-xl border transition-all font-medium text-sm text-center line-clamp-2 min-h-[60px] flex items-center justify-center ${
                data.type === t
                  ? "border-purple-500 bg-purple-500/20 text-purple-300 shadow-md"
                  : "border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Título */}
      <div>
        <label className="flex items-center gap-3 text-gray-300 text-sm font-medium mb-2">
          <Type className="w-4 h-4 text-gray-400" />
          Título do Post
        </label>
        <input
          type="text"
          value={data.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Ex: Como proteger sua senha em 2025"
          className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white text-base focus:border-purple-500 focus:outline-none transition-all placeholder-gray-400"
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Descrição */}
      <div>
        <label className="flex items-center gap-3 text-gray-300 text-sm font-medium mb-2">
          <FileText className="w-4 h-4 text-gray-400" />
          Descrição (opcional)
        </label>
        <textarea
          value={data.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          placeholder="Adicione detalhes, timestamps, hashtags..."
          className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white text-sm resize-none focus:border-purple-500 focus:outline-none transition-all placeholder-gray-400"
          disabled={isSubmitting}
        />
      </div>

      {/* Data e Hora */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center gap-3 text-gray-300 text-sm font-medium mb-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            Data
          </label>
          <input
            type="date"
            value={data.date || ""}
            onChange={(e) => handleChange("date", e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white text-base focus:border-purple-500 focus:outline-none transition-all"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="flex items-center gap-3 text-gray-300 text-sm font-medium mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            Horário
          </label>
          <input
            type="time"
            value={data.time || ""}
            onChange={(e) => handleChange("time", e.target.value)}
            className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-xl text-white text-base focus:border-purple-500 focus:outline-none transition-all"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Melhor horário */}
      <div className="pt-2">
        <label className="flex items-center gap-3 text-gray-300 text-sm cursor-pointer">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={data.isBestTime || true}
              onChange={(e) => handleChange("isBestTime", e.target.checked)}
              className="w-5 h-5 rounded border-gray-600 bg-gray-700 checked:bg-purple-500 focus:ring-1 focus:ring-purple-500"
              disabled={isSubmitting}
            />
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <span className="text-sm">
              Este é o melhor horário sugerido pela IA
            </span>
          </div>
        </label>
      </div>

      {/* Botão de Agendar */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full mt-8 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all text-lg flex items-center justify-center gap-3 ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={(e) => {
          // Prevenir clique duplo
          if (isSubmitting) {
            e.preventDefault();
            return;
          }
        }}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Agendando...
          </>
        ) : (
          <>
            <Check className="w-6 h-6" />
            Agendar Conteúdo
          </>
        )}
      </button>

      {/* Nota informativa */}
      {isSubmitting && (
        <p className="text-center text-gray-400 text-sm mt-4">
          Aguarde enquanto processamos seu agendamento...
        </p>
      )}
    </form>
  );
}

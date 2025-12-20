// SchedulingPage.jsx - OTIMIZADO PARA MOBILE E DESKTOP
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ChevronLeft } from "lucide-react";

import SchedulingForm from "../components/calendar/Scheduling/SchedulingForm";
import SchedulingPreview from "../components/calendar/Scheduling/SchedulingPreview";
import SchedulingModal from "../components/Modal/SchedulingModal";

export default function SchedulingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    platform: "YouTube",
    type: "Vídeo",
    title: "",
    description: "",
    date: "",
    time: "",
    isBestTime: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastScheduledData, setLastScheduledData] = useState(null);

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  const handleSuccess = (scheduledEvent) => {
    console.log("Agendamento bem-sucedido:", scheduledEvent);
    setLastScheduledData(scheduledEvent);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      platform: "YouTube",
      type: "Vídeo",
      title: "",
      description: "",
      date: "",
      time: "",
      isBestTime: true,
    });
  };

  const goToCalendar = () => {
    navigate("/calendar");
  };

  const scheduleAnother = () => {
    resetForm();
    setIsModalOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <DashboardLayout>
        <div className="md:p-6 lg:p-8 min-h-screen pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Cabeçalho compacto */}
            <div className="mb-4 md:mb-6 lg:mb-8">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => navigate("/calendar")}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="hidden xs:inline">Voltar ao Calendário</span>
                  <span className="xs:hidden">Voltar</span>
                </button>

                <div className="text-right">
                  <span className="text-xs text-gray-500 hidden md:inline">
                    Novo Agendamento
                  </span>
                  <span className="text-xs text-gray-500 md:hidden">Novo</span>
                </div>
              </div>

              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  Agendar Conteúdo
                </h1>
                <p className="text-gray-400 text-xs md:text-sm lg:text-base mt-0.5 md:mt-1">
                  Preencha os detalhes e visualize a prévia ao vivo
                </p>
              </div>
            </div>

            {/* Mobile: Formulário em coluna única | Desktop: Lado a lado */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {/* Formulário - Ocupa toda a largura em mobile, metade em desktop */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div>
                    <h2 className="text-base md:text-lg lg:text-xl font-semibold text-white">
                      Detalhes do Conteúdo
                    </h2>
                    <p className="text-gray-400 text-xs md:text-sm mt-0.5">
                      Passo a passo para agendamento
                    </p>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] md:text-xs text-green-400">
                      Online
                    </span>
                  </div>
                </div>

                <SchedulingForm
                  onSuccess={handleSuccess}
                  onFormChange={handleFormChange}
                  formData={formData}
                />
              </div>

              {/* Preview - Em desktop fica ao lado do formulário */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div>
                    <h2 className="text-base md:text-lg lg:text-xl font-semibold text-white">
                      Pré-visualização
                    </h2>
                    <p className="text-gray-400 text-xs md:text-sm mt-0.5">
                      Como ficará no calendário
                    </p>
                  </div>
                  <span className="text-[10px] md:text-xs text-cyan-400 px-2 py-1 md:px-2.5 md:py-1.5 bg-cyan-400/10 rounded-full">
                    Ao vivo
                  </span>
                </div>
                <SchedulingPreview formData={formData} />

                {/* Informações adicionais apenas em desktop */}
                <div className="hidden lg:block mt-6 pt-6 border-t border-gray-700/30">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>Alterações são refletidas instantaneamente</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <span>
                        Horários em IA são baseados no engajamento histórico
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações de ajuda mobile */}
            <div className="mt-4 lg:hidden">
              <div className="bg-gray-800/20 rounded-lg p-3 border border-gray-700/30">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      <span className="text-purple-400 font-medium">Dica:</span>{" "}
                      Toque em cada etapa para preencher
                    </p>
                    <p className="text-[10px] text-gray-500">
                      A prévia atualiza automaticamente enquanto você digita
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      {/* Modal de Confirmação */}
      <SchedulingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        scheduledData={lastScheduledData}
        onViewCalendar={goToCalendar}
        onScheduleAnother={scheduleAnother}
      />
    </>
  );
}

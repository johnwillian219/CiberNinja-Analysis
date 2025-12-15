// SchedulingPage.jsx - CORRIGIDO
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Link } from "react-router-dom";

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

  // Função para atualizar os dados do formulário
  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  // Função chamada quando o agendamento é bem-sucedido
  const handleSuccess = (scheduledEvent) => {
    console.log("Agendamento bem-sucedido:", scheduledEvent);

    // Salva os dados agendados para exibir no modal
    setLastScheduledData(scheduledEvent);

    // Abre o modal de confirmação
    setIsModalOpen(true);
  };

  // Função para resetar o formulário
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

  // Função para ir para o calendário após agendar
  const goToCalendar = () => {
    navigate("/calendar");
  };

  // Função para agendar outro conteúdo
  const scheduleAnother = () => {
    resetForm();
    setIsModalOpen(false);
    // Scroll para o topo do formulário
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <DashboardLayout>
        <div className="p-6 lg:p-8 min-h-screen">
          <div className="max-w-6xl mx-auto">
            {/* Cabeçalho da página */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Agendar Conteúdo
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Preencha os detalhes e visualize a prévia
                </p>
              </div>

              <Link
                to="/calendar"
                className="px-5 py-2.5 bg-gray-800/50 hover:bg-gray-700/60 rounded-lg text-white font-medium transition-all flex items-center gap-2 w-fit text-sm border border-gray-700/50"
              >
                <span>←</span>
                Voltar ao Calendário
              </Link>
            </div>

            {/* Grid: Formulário + Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Formulário - REMOVA O FORM EXTERNO AQUI */}
              <div className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Detalhes do Conteúdo
                </h2>

                {/* APENAS O COMPONENTE SchedulingForm, SEM FORM EXTERNO */}
                <SchedulingForm
                  onSuccess={handleSuccess}
                  onFormChange={handleFormChange}
                  formData={formData}
                />
              </div>

              {/* Preview */}
              <div className="bg-gray-800/40 border border-gray-700/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Pré-visualização
                  </h2>
                  <span className="text-xs text-green-400 px-2 py-1 bg-green-400/10 rounded-full">
                    Ao vivo
                  </span>
                </div>
                <SchedulingPreview formData={formData} />
              </div>
            </div>

            {/* Botão Único de Agendar - AGORA DENTRO DO SchedulingForm */}
            {/* REMOVA ESTE BOTÃO - ele já está dentro do SchedulingForm */}
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

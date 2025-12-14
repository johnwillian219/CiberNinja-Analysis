// src/components/library/Actions/ExportMenu.jsx
import { Download, FileText, Table, Sparkles } from "lucide-react";

export default function ExportMenu() {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
      <button className="w-full px-6 py-5 flex items-center gap-4 text-white hover:bg-gray-700 transition-all">
        <FileText className="w-7 h-7 text-purple-400" />
        <div className="text-left">
          <p className="font-bold">Relatório PDF</p>
          <p className="text-gray-400 text-sm">
            Completo com métricas e gráficos
          </p>
        </div>
      </button>

      <button className="w-full px-6 py-5 flex items-center gap-4 text-white hover:bg-gray-700 transition-all">
        <Table className="w-7 h-7 text-cyan-400" />
        <div className="text-left">
          <p className="font-bold">CSV/Excel</p>
          <p className="text-gray-400 text-sm">Dados brutos para análise</p>
        </div>
      </button>

      <button className="w-full px-6 py-5 flex items-center gap-4 text-white hover:bg-gray-700 transition-all">
        <Sparkles className="w-7 h-7 text-emerald-400" />
        <div className="text-left">
          <p className="font-bold">Relatório IA</p>
          <p className="text-gray-400 text-sm">
            Insights e recomendações automáticas
          </p>
        </div>
      </button>
    </div>
  );
}

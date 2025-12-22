// frontend/src/hooks/useYouTubeData.js

import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export function useYouTubeData() {
  const {
    youtubeConnected,
    youtubeLoading: authLoading,
    refreshYouTubeStatus,
  } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = useCallback(async () => {
    if (!youtubeConnected) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.getYouTubeData();

      // A resposta vem do controller: { success: true, data: rows, headers, updatedAt }
      const rows = response.data || [];
      const headers = response.headers || [];

      // Processa os dados para formato mais fácil de usar nos gráficos
      const processedData = rows.map((row) => {
        const dayObj = {};
        headers.forEach((header, index) => {
          dayObj[header.name] = row[index];
        });
        return {
          day: dayObj.day,
          views: parseInt(dayObj.views || 0),
          watchTime: parseInt(dayObj.estimatedMinutesWatched || 0),
          subscribersGained: parseInt(dayObj.subscribersGained || 0),
          subscribersLost: parseInt(dayObj.subscribersLost || 0),
          likes: parseInt(dayObj.likes || 0),
          comments: parseInt(dayObj.comments || 0),
          shares: parseInt(dayObj.shares || 0),
        };
      });

      // Ordena por data (caso não venha ordenado)
      processedData.sort((a, b) => a.day.localeCompare(b.day));

      setData(processedData);
      setLastUpdated(response.updatedAt || new Date().toISOString());
    } catch (err) {
      console.error("Erro ao buscar dados do YouTube:", err);
      setError(err.message || "Falha ao carregar dados reais do YouTube");

      // Se for erro de autenticação, atualiza o status
      if (err.message.includes("Conexão com o YouTube não encontrada")) {
        refreshYouTubeStatus();
      }
    } finally {
      setLoading(false);
    }
  }, [youtubeConnected, refreshYouTubeStatus]);

  // Busca dados quando a conexão muda ou ao montar
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refetch manual
  const refetch = () => {
    fetchData();
  };

  return {
    data, // Array de objetos com dados diários
    loading: loading || authLoading,
    error,
    lastUpdated,
    connected: youtubeConnected,
    refetch,
    hasData: !!data && data.length > 0,
  };
}

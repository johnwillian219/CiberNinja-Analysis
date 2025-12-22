// backend/src/server.js (VERSÃO FINAL - com auth + YouTube)

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Rotas de autenticação (login, register, etc.)
import authRoutes from "./routes/authRoutes.js"; // ← caminho correto do teu arquivo antigo

// Rotas do YouTube
import youtubeRoutes from "./routes/youtube.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rotas de auth (login, register, me, etc.)
app.use("/api/auth", authRoutes);

// Rotas do YouTube
app.use("/api/youtube", youtubeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend CiberNinja rodando com sucesso!",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Backend CiberNinja rodando com sucesso! 🚀" });
});

const PORT = process.env.BACKEND_PORT || process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(
    `Frontend permitido: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
  );
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

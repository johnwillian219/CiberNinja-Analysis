import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" })); // ← ESSA LINHA É OBRIGATÓRIA
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rotas
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend CiberNinja rodando com sucesso! 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

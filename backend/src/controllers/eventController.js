// src/controllers/eventController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Todos os eventos do usuário logado
export const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { userId: req.user.id },
      orderBy: { date: "asc" },
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar eventos" });
  }
};

// POST - Criar novo evento
export const createEvent = async (req, res) => {
  try {
    const { title, description, platform, type, date, time, isBestTime } =
      req.body;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        platform,
        type,
        date,
        time,
        isBestTime: isBestTime || false,
        status: "scheduled",
        userId: req.user.id,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar evento" });
  }
};

// DELETE - Remover evento
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
    });

    if (!event || event.userId !== req.user.id) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    await prisma.event.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Evento removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover evento" });
  }
};

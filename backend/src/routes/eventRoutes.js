// src/routes/eventRoutes.js
import { Router } from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  getEvents,
  createEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = Router();

// Todas as rotas protegidas
router.use(protectRoute);

router.get("/", getEvents);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);

export default router;

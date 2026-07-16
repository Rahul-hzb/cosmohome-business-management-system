import express from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/announcement.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getAll);
router.get("/:id", getById);

// Protected
router.post("/", protect, create);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);

export default router;


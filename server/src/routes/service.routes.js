import express from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
  getTrash,
  restore,
  permanentDelete,
} from "../controllers/service.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAll);

// Protected Routes
router.get("/trash", protect, getTrash);

// Public Route
router.get("/:id", getById);

// Protected Routes
router.post("/", protect, create);
router.put("/:id", protect, update);

router.patch("/:id/restore", protect, restore);

router.delete("/:id/permanent", protect, permanentDelete);
router.delete("/:id", protect, remove);

export default router;

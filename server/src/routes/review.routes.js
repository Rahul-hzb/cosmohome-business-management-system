import express from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/review.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAll);
router.get("/:id", getById);

// Protected Routes
router.post("/", protect, upload.single("image"), create);

router.put("/:id", protect, upload.single("image"), update);

router.delete("/:id", protect, remove);

export default router;

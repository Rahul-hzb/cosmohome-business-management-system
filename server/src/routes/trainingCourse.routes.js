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
} from "../controllers/trainingCourse.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

/* Public Routes */
router.get("/", getAll);

/* Protected Routes */
router.get("/trash/all", protect, getTrash);

router.post("/", protect, upload.single("thumbnail"), create);

router.put("/:id", protect, upload.single("thumbnail"), update);

router.patch("/:id/restore", protect, restore);

router.delete("/:id/permanent", protect, permanentDelete);

router.delete("/:id", protect, remove);

/* Must be LAST */
router.get("/:id", getById);

export default router;

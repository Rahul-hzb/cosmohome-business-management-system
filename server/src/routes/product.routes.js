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
} from "../controllers/product.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Public
router.get("/", getAll);
router.get("/:id", getById);

// Admin
router.post("/", protect, upload.single("image"), create);

router.put("/:id", protect, upload.single("image"), update);

router.delete("/:id", protect, remove);

router.get("/trash/all", protect, getTrash);

router.patch("/:id/restore", protect, restore);

router.delete("/:id/permanent", protect, permanentDelete);

export default router;

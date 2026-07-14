import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/website.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get Website Settings
router.get("/", protect, getSettings);

// Update Website Settings
router.put("/", protect, updateSettings);

export default router;

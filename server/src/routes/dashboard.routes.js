import express from "express";

import { get } from "../controllers/dashboard.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Dashboard
router.get("/", protect, get);

export default router;

import express from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/trainingEnquiry.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/* Public Route - Student submits enquiry */
router.post("/", create);

/* Protected Admin Routes */
router.get("/", protect, getAll);

router.get("/:id", protect, getById);

router.put("/:id", protect, update);

router.delete("/:id", protect, remove);

export default router;

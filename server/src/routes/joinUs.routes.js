import express from "express";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/joinUs.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Upload Fields
const uploadDocuments = upload.fields([
  {
    name: "profilePhoto",
    maxCount: 1,
  },
  {
    name: "aadhaarCard",
    maxCount: 1,
  },
  {
    name: "addressProof",
    maxCount: 1,
  },
  {
    name: "experienceCertificate",
    maxCount: 1,
  },
  {
    name: "trainingCertificate",
    maxCount: 1,
  },
]);

// Public
router.post("/", uploadDocuments, create);

// Admin
router.get("/", protect, getAll);

router.get("/:id", protect, getById);

router.put("/:id", protect, update);

router.delete("/:id", protect, remove);

export default router;

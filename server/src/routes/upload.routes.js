import express from "express";

import { upload } from "../controllers/upload.controller.js";
import uploadMiddleware from "../middleware/upload.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/image", protect, uploadMiddleware.single("image"), upload);

export default router;

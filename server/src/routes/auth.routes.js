import express from "express";

import { login, getCurrentAdmin,logout,updatePassword } from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);


router.get("/me", protect, getCurrentAdmin);

router.put("/change-password", protect, updatePassword);

export default router;

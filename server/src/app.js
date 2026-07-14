import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

import websiteRoutes from "./routes/website.routes.js"; 

import serviceRoutes from "./routes/service.routes.js";


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/settings", websiteRoutes);

app.use("/api/services", serviceRoutes);  

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cosmohome Backend API is running 🚀",
  });
});

export default app;

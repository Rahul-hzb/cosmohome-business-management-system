import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

import websiteRoutes from "./routes/website.routes.js";

import serviceRoutes from "./routes/service.routes.js";

import uploadRoutes from "./routes/upload.routes.js";

import galleryRoutes from "./routes/gallery.routes.js";

import categoryRoutes from "./routes/category.routes.js";

import teamRoutes from "./routes/team.routes.js";

import reviewRoutes from "./routes/review.routes.js";

import appointmentRoutes from "./routes/appointment.routes.js";

import announcementRoutes from "./routes/announcement.routes.js";

import joinUsRoutes from "./routes/joinUs.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/settings", websiteRoutes);

app.use("/api/services", serviceRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/gallery", galleryRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/team", teamRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/announcements", announcementRoutes);

app.use("/api/join-us", joinUsRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cosmohome Backend API is running 🚀",
  });
});

export default app;

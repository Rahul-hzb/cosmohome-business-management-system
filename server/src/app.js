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

import contactRoutes from "./routes/contact.routes.js";

import dashboardRoutes from "./routes/dashboard.routes.js";

import productRoutes from "./routes/product.routes.js";

import trainingCourseRoutes from "./routes/trainingCourse.routes.js";

import trainingEnquiryRoutes from "./routes/trainingEnquiry.routes.js";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

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

app.use("/api/contact", contactRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/products", productRoutes);

 
app.use("/api/training-courses", trainingCourseRoutes);

app.use("/api/training-enquiries", trainingEnquiryRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cosmohome Backend API is running 🚀",
  });
});

export default app;

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import connectDB from "../config/database.js";
import Admin from "../models/Admin.js";

dotenv.config();

const resetAdmin = async () => {
  try {
    await connectDB();

    const admin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!admin) {
      console.log("❌ Admin not found.");
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    admin.password = hashedPassword;

    await admin.save();

    console.log("✅ Admin password reset successfully.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

resetAdmin();

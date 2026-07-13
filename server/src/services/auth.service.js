import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const loginAdmin = async (email, password) => {
  // Check admin
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isPasswordMatch = await bcrypt.compare(password, admin.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: admin._id,
      email: admin.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    admin,
    token,
  };
};

const changePassword = async (adminId, currentPassword, newPassword) => {
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw new Error("Admin not found");
  }

  // Verify current password
  const isPasswordMatch = await bcrypt.compare(currentPassword, admin.password);

  if (!isPasswordMatch) {
    throw new Error("Current password is incorrect");
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  admin.password = hashedPassword;

  await admin.save();

  return;
};


export { loginAdmin, changePassword };

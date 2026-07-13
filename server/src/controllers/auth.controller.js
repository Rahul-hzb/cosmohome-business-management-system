import { loginAdmin,changePassword } from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { admin, token } = await loginAdmin(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      admin: {
        fullName: admin.fullName,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const getCurrentAdmin = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changePassword(req.admin._id, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export { login , getCurrentAdmin,logout,updatePassword };

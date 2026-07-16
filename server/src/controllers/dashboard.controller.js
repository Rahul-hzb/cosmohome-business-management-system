import { getDashboard } from "../services/dashboard.service.js";

// Get Dashboard
const get = async (req, res) => {
  try {
    const dashboard = await getDashboard();

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { get };

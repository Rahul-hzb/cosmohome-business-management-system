import {
  getWebsiteSettings,
  updateWebsiteSettings,
} from "../services/website.service.js";

// Get Website Settings
const getSettings = async (req, res) => {
  try {
    const settings = await getWebsiteSettings();

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Website Settings
const updateSettings = async (req, res) => {
  try {
    const settings = await updateWebsiteSettings(req.body);

    res.status(200).json({
      success: true,
      message: "Website settings updated successfully.",
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getSettings, updateSettings };

import WebsiteSettings from "../models/WebsiteSettings.js";

// Get Website Settings
const getWebsiteSettings = async () => {
  let settings = await WebsiteSettings.findOne();

  // Create default document if it doesn't exist
  if (!settings) {
    settings = await WebsiteSettings.create({
      companyName: "Cosmohome",
    });
  }

  return settings;
};

// Update Website Settings
const updateWebsiteSettings = async (data) => {
  let settings = await WebsiteSettings.findOne();

  if (!settings) {
    settings = await WebsiteSettings.create({
      companyName: "Cosmohome",
      ...data,
    });
  } else {
    Object.assign(settings, data);
    await settings.save();
  }

  return settings;
};

export { getWebsiteSettings, updateWebsiteSettings };
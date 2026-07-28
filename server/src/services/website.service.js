import WebsiteSettings from "../models/WebsiteSettings.js";

// Get Website Settings
const getWebsiteSettings = async () => {
  let settings = await WebsiteSettings.findOne();

  if (!settings) {
    settings = await WebsiteSettings.create({
      companyName: "Cosmohome",
      tagline: "",
      about: "",
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
      tagline: "",
      about: "",
    });
  }

  settings.companyName = data.companyName ?? settings.companyName;
  settings.tagline = data.tagline ?? settings.tagline;
  settings.about = data.about ?? settings.about;

  await settings.save();

  return settings;
};

export { getWebsiteSettings, updateWebsiteSettings };

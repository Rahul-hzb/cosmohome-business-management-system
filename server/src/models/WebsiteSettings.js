import mongoose from "mongoose";

const websiteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    tagline: {
      type: String,
      default: "",
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    heroBanner: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },

    contact: {
      phone: {
        type: String,
        default: "",
      },

      whatsapp: {
        type: String,
        default: "",
      },

      email: {
        type: String,
        default: "",
        lowercase: true,
      },

      address: {
        type: String,
        default: "",
      },
    },

    socialLinks: {
      facebook: {
        type: String,
        default: "",
      },

      instagram: {
        type: String,
        default: "",
      },

      youtube: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },
    },

    seo: {
      title: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      keywords: {
        type: String,
        default: "",
      },
    },

    footer: {
      text: {
        type: String,
        default: "",
      },

      copyright: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

const WebsiteSettings = mongoose.model(
  "WebsiteSettings",
  websiteSettingsSchema,
);

export default WebsiteSettings;

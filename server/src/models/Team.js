import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    instagram: {
      type: String,
      default: "",
      trim: true,
    },

    facebook: {
      type: String,
      default: "",
      trim: true,
    },

    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      url: {
        type: String,
        required: true,
      },

      publicId: {
        type: String,
        required: true,
      },

      alt: {
        type: String,
        default: "",
      },
    },

    social: {
      type: socialSchema,
      default: {},
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Team = mongoose.model("Team", teamSchema);

export default Team;

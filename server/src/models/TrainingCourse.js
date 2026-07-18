import mongoose from "mongoose";

const trainingCourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    courseCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    thumbnail: {
      url: String,
      publicId: String,
      alt: String,
    },

    shortDescription: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    trainerName: {
      type: String,
      required: true,
      trim: true,
    },

    trainerExperience: {
      type: String,
      default: "",
    },

    courseType: {
      type: String,
      enum: ["Certification", "Workshop", "Masterclass"],
      default: "Certification",
    },

    duration: {
      type: Number,
      required: true,
    },

    durationUnit: {
      type: String,
      enum: ["Days", "Weeks", "Months"],
      default: "Days",
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      lowercase: true,
      default: "beginner",
    },

    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      lowercase: true,
      default: "offline",
    },

    language: {
      type: String,
      default: "English",
    },

    fees: {
      type: Number,
      required: true,
    },

    discountFees: {
      type: Number,
      default: 0,
    },

    maxStudents: {
      type: Number,
      default: 30,
    },

    certificateAvailable: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("TrainingCourse", trainingCourseSchema);

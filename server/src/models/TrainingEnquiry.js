import mongoose from "mongoose";

const trainingEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    city: {
      type: String,
      trim: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingCourse",
      required: true,
    },

    qualification: {
      type: String,
      trim: true,
    },

    preferredBatch: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Contacted", "Enrolled", "Closed"],
      default: "Pending",
    },

    adminRemark: {
      type: String,
      default: "",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("TrainingEnquiry", trainingEnquirySchema);

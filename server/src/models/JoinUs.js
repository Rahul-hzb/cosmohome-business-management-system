import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },

    publicId: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const joinUsSchema = new mongoose.Schema(
  {
    // Personal Information

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    guardianName: {
      type: String,
      required: true,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    alternatePhone: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    aadhaarNumber: {
      type: String,
      required: true,
      trim: true,
    },

    panNumber: {
      type: String,
      default: "",
      trim: true,
    },

    // Professional Information

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    currentProfession: {
      type: String,
      required: true,
      trim: true,
    },

    workPreference: {
      type: String,
      enum: ["Full Time", "Part Time", "Freelance"],
      required: true,
    },

    salonExperience: {
      type: Boolean,
      required: true,
    },

    ownTools: {
      type: Boolean,
      required: true,
    },

    preferredLocation: {
      type: String,
      required: true,
      trim: true,
    },

    servicesOffered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    // Documents

    documents: {
      profilePhoto: fileSchema,

      aadhaarCard: fileSchema,

      addressProof: fileSchema,

      experienceCertificate: fileSchema,

      trainingCertificate: fileSchema,
    },

    declarationAccepted: {
      type: Boolean,
      required: true,
    },

    isSubmitted: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Shortlisted", "Interview", "Approved", "Rejected"],
      default: "Pending",
    },

    adminRemark: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const JoinUs = mongoose.model("JoinUs", joinUsSchema);

export default JoinUs;

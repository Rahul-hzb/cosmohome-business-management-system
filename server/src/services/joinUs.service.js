import fs from "fs";

import JoinUs from "../models/JoinUs.js";
import cloudinary from "../config/cloudinary.js";

// Upload file helper
const uploadFile = async (file, folder) => {
  if (!file) return {};

  const result = await cloudinary.uploader.upload(file.path, {
    folder,
    resource_type: "auto",
  });

  fs.unlinkSync(file.path);

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

// Create Join Us Application
const createApplication = async (applicationData, files) => {
  const documents = {
    profilePhoto: await uploadFile(
      files?.profilePhoto?.[0],
      "cosmohome/join-us/profile",
    ),

    aadhaarCard: await uploadFile(
      files?.aadhaarCard?.[0],
      "cosmohome/join-us/aadhaar",
    ),

    addressProof: await uploadFile(
      files?.addressProof?.[0],
      "cosmohome/join-us/address-proof",
    ),

    experienceCertificate: await uploadFile(
      files?.experienceCertificate?.[0],
      "cosmohome/join-us/experience",
    ),

    trainingCertificate: await uploadFile(
      files?.trainingCertificate?.[0],
      "cosmohome/join-us/training",
    ),
  };

  const application = await JoinUs.create({
    ...applicationData,
    documents,
  });

  return application;
};
// Get All Applications
const getAllApplications = async () => {
  return await JoinUs.find()
    .populate("servicesOffered", "name")
    .sort({
      createdAt: -1,
    })
    .lean();
};

// Get Application By ID
const getApplicationById = async (id) => {
  const application = await JoinUs.findById(id).populate(
    "servicesOffered",
    "name"
  );

  if (!application) {
    throw new Error("Application not found.");
  }

  return application;
};

// Update Application
const updateApplication = async (id, applicationData) => {
  const application = await JoinUs.findById(id);

  if (!application) {
    throw new Error("Application not found.");
  }

  Object.assign(application, applicationData);

  await application.save();

  return application;
};

// Delete Application
const deleteApplication = async (id) => {
  const application = await JoinUs.findById(id);

  if (!application) {
    throw new Error("Application not found.");
  }

  await application.deleteOne();
};

export {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
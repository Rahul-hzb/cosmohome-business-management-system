import Category from "../models/Category.js";
import slugify from "slugify";
import fs from "fs";

import cloudinary from "../config/cloudinary.js";
import Service from "../models/Service.js";

// Create Service
const createService = async (serviceData, file) => {
  // Check duplicate name
  const existingService = await Service.findOne({
    name: serviceData.name,
  });

  if (existingService) {
    throw new Error("Service already exists.");
  }

  const category = await Category.findById(serviceData.category);

  if (!category) {
    throw new Error("Category not found.");
  }

  // Upload image if provided
  let images = [];

  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/services",
    });

    fs.unlinkSync(file.path);

    images.push({
      url: result.secure_url,
      publicId: result.public_id,
      alt: serviceData.name,
    });
  }

  // Generate slug
  const slug = slugify(serviceData.name, {
    lower: true,
    strict: true,
  });

  const service = await Service.create({
    ...serviceData,
    slug,
    images,
  });

  return service;
};

// Get All Services
const getAllServices = async () => {
  return await Service.find({
    isDeleted: false,
  })
    .populate("category", "name slug")
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();
};

// Get Deleted Services
const getTrashServices = async () => {
  return await Service.find({
    isDeleted: true,
  })
    .sort({
      updatedAt: -1,
    })
    .lean();
};

// Restore Service
const restoreService = async (id) => {
  const service = await Service.findOne({
    _id: id,
    isDeleted: true,
  });

  if (!service) {
    throw new Error("Service not found in trash");
  }

  service.isDeleted = false;

  await service.save();

  return service;
};

// Permanently Delete Service

const permanentDeleteService = async (id) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new Error("Service not found.");
  }

  // Delete Cloudinary image
  if (
    service.images &&
    service.images.length > 0 &&
    service.images[0].publicId
  ) {
    await cloudinary.uploader.destroy(service.images[0].publicId);
  }

  await service.deleteOne();
};

// Get Service By ID
const getServiceById = async (id) => {
  const service = await Service.findById(id).populate("category", "name slug");

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

// Update Service
const updateService = async (id, serviceData, file) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new Error("Service not found.");
  }

  if (serviceData.name) {
    serviceData.slug = slugify(serviceData.name, {
      lower: true,
      strict: true,
    });
  }

  if (file) {
    // Delete old image
    if (service.images.length > 0) {
      await cloudinary.uploader.destroy(service.images[0].publicId);
    }

    // Upload new image
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/services",
    });

    fs.unlinkSync(file.path);

    service.images = [
      {
        url: result.secure_url,
        publicId: result.public_id,
        alt: serviceData.name || service.name,
      },
    ];
  }

  Object.assign(service, serviceData);

  await service.save();

  return service;
};

// Delete Service

const deleteService = async (id) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new Error("Service not found.");
  }

  // Delete image from Cloudinary
  if (
    service.images &&
    service.images.length > 0 &&
    service.images[0].publicId
  ) {
    await cloudinary.uploader.destroy(service.images[0].publicId);
  }

  // Soft delete
  service.isDeleted = true;
  service.isActive = false;

  await service.save();

  return service;
};

export {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getTrashServices,
  restoreService,
  permanentDeleteService,
};

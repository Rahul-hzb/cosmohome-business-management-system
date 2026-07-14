import slugify from "slugify";
import Service from "../models/Service.js";

// Create Service
const createService = async (serviceData) => {
  // Check duplicate service name (case-insensitive)
  const existingService = await Service.findOne({
    name: {
      $regex: new RegExp(`^${serviceData.name}$`, "i"),
    },
  });

  if (existingService) {
    throw new Error("Service already exists");
  }

  // Generate slug
  const slug = slugify(serviceData.name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const service = await Service.create({
    ...serviceData,
    slug,
  });

  return service;
};

// Get All Services
const getAllServices = async () => {
  return await Service.find()
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();
};

// Get Service By ID
const getServiceById = async (id) => {
  const service = await Service.findById(id).lean();

  if (!service) {
    throw new Error("Service not found");
  }

  return service;
};

// Update Service
const updateService = async (id, serviceData) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new Error("Service not found");
  }

  // Check duplicate name if updating name
  if (serviceData.name) {
    const existingService = await Service.findOne({
      name: {
        $regex: new RegExp(`^${serviceData.name}$`, "i"),
      },
      _id: { $ne: id },
    });

    if (existingService) {
      throw new Error("Service name already exists");
    }

    service.name = serviceData.name;

    service.slug = slugify(serviceData.name, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  if (serviceData.category !== undefined)
    service.category = serviceData.category;

  if (serviceData.shortDescription !== undefined)
    service.shortDescription = serviceData.shortDescription;

  if (serviceData.description !== undefined)
    service.description = serviceData.description;

  if (serviceData.pricing !== undefined) service.pricing = serviceData.pricing;

  if (serviceData.duration !== undefined)
    service.duration = serviceData.duration;

  if (serviceData.images !== undefined) service.images = serviceData.images;

  if (serviceData.benefits !== undefined)
    service.benefits = serviceData.benefits;

  if (serviceData.featured !== undefined)
    service.featured = serviceData.featured;

  if (serviceData.isActive !== undefined)
    service.isActive = serviceData.isActive;

  if (serviceData.displayOrder !== undefined)
    service.displayOrder = serviceData.displayOrder;

  await service.save();

  return service;
};

// Delete Service
const deleteService = async (id) => {
  const service = await Service.findById(id);

  if (!service) {
    throw new Error("Service not found");
  }

  await service.deleteOne();
};

export {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};

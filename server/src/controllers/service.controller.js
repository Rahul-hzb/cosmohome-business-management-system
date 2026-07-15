import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getTrashServices,
  restoreService,
  permanentDeleteService,
} from "../services/service.service.js";

// Create Service
const create = async (req, res) => {
  try {
    const service = await createService(req.body);

    res.status(201).json({
      success: true,
      message: "Service created successfully.",
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Services
const getAll = async (req, res) => {
  try {
    const services = await getAllServices();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTrash = async (req, res) => {
  try {
    const services = await getTrashServices();

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const restore = async (req, res) => {
  try {
    const service = await restoreService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service restored successfully.",
      data: service,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const permanentDelete = async (req, res) => {
  try {
    await permanentDeleteService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service permanently deleted.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Service By ID
const getById = async (req, res) => {
  try {
    const service = await getServiceById(req.params.id);

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Service
const update = async (req, res) => {
  try {
    const service = await updateService(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Service
const remove = async (req, res) => {
  try {
    const service = await deleteService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service moved to trash successfully.",
      data: service,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { create, getAll, getById, update, remove,getTrash, restore, permanentDelete };

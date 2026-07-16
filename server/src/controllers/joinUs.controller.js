import {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../services/joinUs.service.js";

// Create
const create = async (req, res) => {
  try {
    const application = await createApplication(req.body, req.files);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
const getAll = async (req, res) => {
  try {
    const applications = await getAllApplications();

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By ID
const getById = async (req, res) => {
  try {
    const application = await getApplicationById(req.params.id);

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
const update = async (req, res) => {
  try {
    const application = await updateApplication(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Application updated successfully.",
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
const remove = async (req, res) => {
  try {
    await deleteApplication(req.params.id);

    res.status(200).json({
      success: true,
      message: "Application deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { create, getAll, getById, update, remove };

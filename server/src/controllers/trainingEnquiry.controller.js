import {
  createTrainingEnquiry,
  getAllTrainingEnquiries,
  getTrainingEnquiryById,
  updateTrainingEnquiry,
  deleteTrainingEnquiry,
} from "../services/trainingEnquiry.service.js";

// Create Enquiry
export const create = async (req, res) => {
  try {
    const enquiry = await createTrainingEnquiry(req.body);

    res.status(201).json({
      success: true,
      message: "Training enquiry submitted successfully.",
      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Enquiries
export const getAll = async (req, res) => {
  try {
    const enquiries = await getAllTrainingEnquiries();

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Enquiry By ID
export const getById = async (req, res) => {
  try {
    const enquiry = await getTrainingEnquiryById(req.params.id);

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Enquiry
export const update = async (req, res) => {
  try {
    const enquiry = await updateTrainingEnquiry(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Training enquiry updated successfully.",
      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Enquiry
export const remove = async (req, res) => {
  try {
    await deleteTrainingEnquiry(req.params.id);

    res.status(200).json({
      success: true,
      message: "Training enquiry deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

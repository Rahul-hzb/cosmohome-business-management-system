import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../services/review.service.js";

// Create Review
const create = async (req, res) => {
  try {
    const review = await createReview(req.body, req.file);

    res.status(201).json({
      success: true,
      message: "Review created successfully.",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Reviews
const getAll = async (req, res) => {
  try {
    const reviews = await getAllReviews();

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Review By ID
const getById = async (req, res) => {
  try {
    const review = await getReviewById(req.params.id);

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Review
const update = async (req, res) => {
  try {
    const review = await updateReview(req.params.id, req.body, req.file);

    res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Review
const remove = async (req, res) => {
  try {
    await deleteReview(req.params.id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { create, getAll, getById, update, remove };

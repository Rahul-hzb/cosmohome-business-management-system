import {
  createTrainingCourse,
  getAllTrainingCourses,
  getTrainingCourseById,
  updateTrainingCourse,
  deleteTrainingCourse,
  restoreTrainingCourse,
  permanentDeleteTrainingCourse,
  getTrashTrainingCourses,
} from "../services/trainingCourse.service.js";

// Create
export const create = async (req, res) => {
  try {
    const course = await createTrainingCourse(req.body, req.file);

    res.status(201).json({
      success: true,
      message: "Training course created successfully.",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
export const getAll = async (req, res) => {
  try {
    const courses = await getAllTrainingCourses();

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By ID
export const getById = async (req, res) => {
  try {
    const course = await getTrainingCourseById(req.params.id);

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
export const update = async (req, res) => {
  try {
    const course = await updateTrainingCourse(
      req.params.id,
      req.body,
      req.file,
    );

    res.status(200).json({
      success: true,
      message: "Training course updated successfully.",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Soft Delete
export const remove = async (req, res) => {
  try {
    await deleteTrainingCourse(req.params.id);

    res.status(200).json({
      success: true,
      message: "Training course moved to trash.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Trash
export const getTrash = async (req, res) => {
  try {
    const courses = await getTrashTrainingCourses();

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Restore
export const restore = async (req, res) => {
  try {
    const course = await restoreTrainingCourse(req.params.id);

    res.status(200).json({
      success: true,
      message: "Training course restored successfully.",
      data: course,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Permanent Delete
export const permanentDelete = async (req, res) => {
  try {
    await permanentDeleteTrainingCourse(req.params.id);

    res.status(200).json({
      success: true,
      message: "Training course permanently deleted.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

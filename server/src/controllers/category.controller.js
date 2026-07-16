import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service.js";

// Create Category
const create = async (req, res) => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Categories
const getAll = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Category By ID
const getById = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Category
const update = async (req, res) => {
  try {
    const category = await updateCategory(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Category
const remove = async (req, res) => {
  try {
    await deleteCategory(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { create, getAll, getById, update, remove };


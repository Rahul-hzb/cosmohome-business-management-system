import slugify from "slugify";
import Category from "../models/Category.js";

// Create Category
const createCategory = async (categoryData) => {
  const existingCategory = await Category.findOne({
    name: categoryData.name,
  });

  if (existingCategory) {
    throw new Error("Category already exists.");
  }

  const slug = slugify(categoryData.name, {
    lower: true,
    strict: true,
  });

  const category = await Category.create({
    ...categoryData,
    slug,
  });

  return category;
};

// Get All Categories
const getAllCategories = async () => {
  return await Category.find().sort({
    displayOrder: 1,
    createdAt: -1,
  });
};

// Get Category By ID
const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  return category;
};

// Update Category
const updateCategory = async (id, categoryData) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  if (categoryData.name) {
    categoryData.slug = slugify(categoryData.name, {
      lower: true,
      strict: true,
    });
  }

  Object.assign(category, categoryData);

  await category.save();

  return category;
};

// Delete Category
const deleteCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found.");
  }

  await category.deleteOne();
};

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

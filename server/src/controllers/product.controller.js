import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  restoreProduct,
  permanentDeleteProduct,
  getTrashProducts,
} from "../services/product.service.js";

// Create Product
const create = async (req, res) => {
  try {
    const product = await createProduct(req.body, req.file);

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
const getAll = async (req, res) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Product By ID
const getById = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
const update = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body, req.file);

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Soft Delete
const remove = async (req, res) => {
  try {
    await deleteProduct(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product moved to trash.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Trash
const getTrash = async (req, res) => {
  try {
    const products = await getTrashProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Restore
const restore = async (req, res) => {
  try {
    const product = await restoreProduct(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product restored successfully.",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Permanent Delete
const permanentDelete = async (req, res) => {
  try {
    await permanentDeleteProduct(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product permanently deleted.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  create,
  getAll,
  getById,
  update,
  remove,
  getTrash,
  restore,
  permanentDelete,
};

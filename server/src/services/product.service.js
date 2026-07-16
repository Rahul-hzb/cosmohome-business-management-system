import slugify from "slugify";
import fs from "fs";

import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// Create Product
const createProduct = async (productData, file) => {
  const existingProduct = await Product.findOne({
    name: productData.name,
  });

  if (existingProduct) {
    throw new Error("Product already exists.");
  }

  let images = [];

  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/products",
    });

    fs.unlinkSync(file.path);

    images.push({
      url: result.secure_url,
      publicId: result.public_id,
      alt: productData.name,
    });
  }

  const slug = slugify(productData.name, {
    lower: true,
    strict: true,
  });

  const product = await Product.create({
    ...productData,
    slug,
    images,
  });

  return product;
};

// Get All Products
const getAllProducts = async () => {
  return await Product.find({
    isDeleted: false,
  })
    .populate("category", "name slug")
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();
};

// Get Product By ID
const getProductById = async (id) => {
  const product = await Product.findById(id).populate("category", "name slug");

  if (!product) {
    throw new Error("Product not found.");
  }

  return product;
};

// Update Product
const updateProduct = async (id, productData, file) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found.");
  }

  if (productData.name) {
    productData.slug = slugify(productData.name, {
      lower: true,
      strict: true,
    });
  }

  if (file) {
    if (product.images.length > 0) {
      await cloudinary.uploader.destroy(product.images[0].publicId);
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/products",
    });

    fs.unlinkSync(file.path);

    product.images = [
      {
        url: result.secure_url,
        publicId: result.public_id,
        alt: productData.name || product.name,
      },
    ];
  }

  Object.assign(product, productData);

  await product.save();

  return product;
};

// Soft Delete Product
const deleteProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found.");
  }

  product.isDeleted = true;
  product.isActive = false;

  await product.save();

  return product;
};

// Restore Product
const restoreProduct = async (id) => {
  const product = await Product.findOne({
    _id: id,
    isDeleted: true,
  });

  if (!product) {
    throw new Error("Product not found.");
  }

  product.isDeleted = false;
  product.isActive = true;

  await product.save();

  return product;
};

// Permanently Delete Product
const permanentDeleteProduct = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found.");
  }

  if (
    product.images &&
    product.images.length > 0 &&
    product.images[0].publicId
  ) {
    await cloudinary.uploader.destroy(product.images[0].publicId);
  }

  await product.deleteOne();
};

// Trash Products
const getTrashProducts = async () => {
  return await Product.find({
    isDeleted: true,
  }).sort({
    updatedAt: -1,
  });
};

export {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  restoreProduct,
  permanentDeleteProduct,
  getTrashProducts,
};

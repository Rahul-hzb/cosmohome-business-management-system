import fs from "fs";

import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// Create Gallery
const createGallery = async (galleryData, file) => {
  if (!file) {
    throw new Error("Gallery image is required.");
  }

  // Upload image to Cloudinary
  const result = await cloudinary.uploader.upload(file.path, {
    folder: "cosmohome/gallery",
  });

  // Delete local file
  fs.unlinkSync(file.path);

  const gallery = await Gallery.create({
    ...galleryData,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
      alt: galleryData.title,
    },
  });

  return gallery;
};

// Get All Gallery
const getAllGallery = async () => {
  return await Gallery.find({
    isDeleted: false,
  }).sort({
    displayOrder: 1,
    createdAt: -1,
  });
};

// Get Gallery By ID
const getGalleryById = async (id) => {
  const gallery = await Gallery.findById(id);

  if (!gallery) {
    throw new Error("Gallery item not found.");
  }

  return gallery;
};

// Update Gallery

const updateGallery = async (id, galleryData, file) => {
  const gallery = await Gallery.findById(id);

  if (!gallery) {
    throw new Error("Gallery item not found.");
  }

  if (file) {
    // Delete old image from Cloudinary
    if (gallery.image?.publicId) {
      await cloudinary.uploader.destroy(gallery.image.publicId);
    }

    // Upload new image
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/gallery",
    });

    // Delete local file
    fs.unlinkSync(file.path);

    gallery.image = {
      url: result.secure_url,
      publicId: result.public_id,
      alt: galleryData.title || gallery.title,
    };
  }

  Object.assign(gallery, galleryData);

  await gallery.save();

  return gallery;
};

// Permanently Delete Gallery

const permanentDeleteGallery = async (id) => {
  const gallery = await Gallery.findById(id);

  if (!gallery) {
    throw new Error("Gallery item not found.");
  }

  // Delete image from Cloudinary
  if (gallery.image?.publicId) {
    await cloudinary.uploader.destroy(gallery.image.publicId);
  }

  // Delete MongoDB document
  await gallery.deleteOne();

  return;
};

export { createGallery, getAllGallery, getGalleryById, updateGallery, permanentDeleteGallery };

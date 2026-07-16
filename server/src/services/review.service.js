import fs from "fs";

import Review from "../models/Review.js";
import cloudinary from "../config/cloudinary.js";

// Create Review
const createReview = async (reviewData, file) => {
  let image = {};

  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/reviews",
    });

    fs.unlinkSync(file.path);

    image = {
      url: result.secure_url,
      publicId: result.public_id,
      alt: reviewData.customerName,
    };
  }

  const review = await Review.create({
    ...reviewData,
    image,
  });

  return review;
};

// Get All Reviews
const getAllReviews = async () => {
  return await Review.find({ isActive: true })
    .populate("service", "name")
    .populate("teamMember", "name designation")
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();
};

// Get Review By ID
const getReviewById = async (id) => {
  const review = await Review.findById(id)
    .populate("service", "name")
    .populate("teamMember", "name designation");

  if (!review) {
    throw new Error("Review not found.");
  }

  return review;
};

// Update Review
const updateReview = async (id, reviewData, file) => {
  const review = await Review.findById(id);

  if (!review) {
    throw new Error("Review not found.");
  }

  if (file) {
    if (review.image?.publicId) {
      await cloudinary.uploader.destroy(review.image.publicId);
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/reviews",
    });

    fs.unlinkSync(file.path);

    review.image = {
      url: result.secure_url,
      publicId: result.public_id,
      alt: reviewData.customerName || review.customerName,
    };
  }

  Object.assign(review, reviewData);

  await review.save();

  return review;
};

// Delete Review
const deleteReview = async (id) => {
  const review = await Review.findById(id);

  if (!review) {
    throw new Error("Review not found.");
  }

  if (review.image?.publicId) {
    await cloudinary.uploader.destroy(review.image.publicId);
  }

  await review.deleteOne();
};

export {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};

import {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
    permanentDeleteGallery,
} from "../services/gallery.service.js";

// Create Gallery
const create = async (req, res) => {
  try {
    const gallery = await createGallery(req.body, req.file);

    res.status(201).json({
      success: true,
      message: "Gallery item created successfully.",
      data: gallery,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Gallery
const getAll = async (req, res) => {
  try {
    const galleries = await getAllGallery();

    res.status(200).json({
      success: true,
      count: galleries.length,
      data: galleries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Gallery By ID
const getById = async (req, res) => {
  try {
    const gallery = await getGalleryById(req.params.id);

    res.status(200).json({
      success: true,
      data: gallery,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
//update gallery
const update = async (req, res) => {
  try {
    const gallery = await updateGallery(req.params.id, req.body, req.file);

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully.",
      data: gallery,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const permanentDelete = async (req, res) => {
  try {
    await permanentDeleteGallery(req.params.id);

    res.status(200).json({
      success: true,
      message: "Gallery deleted permanently.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { create, getAll, getById, update, permanentDelete };

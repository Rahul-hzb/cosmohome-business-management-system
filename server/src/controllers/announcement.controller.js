import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} from "../services/announcement.service.js";

// Create
const create = async (req, res) => {
  try {
    const announcement = await createAnnouncement(req.body);

    res.status(201).json({
      success: true,
      message: "Announcement created successfully.",
      data: announcement,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
const getAll = async (req, res) => {
  try {
    const announcements = await getAllAnnouncements();

    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By ID
const getById = async (req, res) => {
  try {
    const announcement = await getAnnouncementById(req.params.id);

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
const update = async (req, res) => {
  try {
    const announcement = await updateAnnouncement(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully.",
      data: announcement,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
const remove = async (req, res) => {
  try {
    await deleteAnnouncement(req.params.id);

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { create, getAll, getById, update, remove };


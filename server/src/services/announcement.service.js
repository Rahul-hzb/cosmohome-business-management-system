import Announcement from "../models/Announcement.js";

// Create
const createAnnouncement = async (announcementData) => {
  return await Announcement.create(announcementData);
};

// Get All
const getAllAnnouncements = async () => {
  return await Announcement.find()
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();
};

// Get By ID
const getAnnouncementById = async (id) => {
  const announcement = await Announcement.findById(id);

  if (!announcement) {
    throw new Error("Announcement not found.");
  }

  return announcement;
};

// Update
const updateAnnouncement = async (id, announcementData) => {
  const announcement = await Announcement.findById(id);

  if (!announcement) {
    throw new Error("Announcement not found.");
  }

  Object.assign(announcement, announcementData);

  await announcement.save();

  return announcement;
};

// Delete
const deleteAnnouncement = async (id) => {
  const announcement = await Announcement.findById(id);

  if (!announcement) {
    throw new Error("Announcement not found.");
  }

  await announcement.deleteOne();
};

export {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
};


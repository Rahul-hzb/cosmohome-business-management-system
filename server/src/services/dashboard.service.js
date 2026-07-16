import Appointment from "../models/Appointment.js";
import Service from "../models/Service.js";
import Category from "../models/Category.js";
import Gallery from "../models/Gallery.js";
import Team from "../models/Team.js";
import Review from "../models/Review.js";
import Announcement from "../models/Announcement.js";
import JoinUs from "../models/JoinUs.js";
import Contact from "../models/Contact.js";

const getDashboard = async () => {
  // Appointment Counts
  const totalAppointments = await Appointment.countDocuments();

  const pendingAppointments = await Appointment.countDocuments({
    status: "Pending",
  });

  const confirmedAppointments = await Appointment.countDocuments({
    status: "Confirmed",
  });

  const completedAppointments = await Appointment.countDocuments({
    status: "Completed",
  });

  const cancelledAppointments = await Appointment.countDocuments({
    status: "Cancelled",
  });

  // Business Counts
  const totalServices = await Service.countDocuments();

  const totalCategories = await Category.countDocuments();

  const totalGallery = await Gallery.countDocuments();

  const totalTeam = await Team.countDocuments();

  const totalReviews = await Review.countDocuments();

  const totalAnnouncements = await Announcement.countDocuments();

  // Join Us
  const totalApplications = await JoinUs.countDocuments();

  const pendingApplications = await JoinUs.countDocuments({
    status: "Pending",
  });

  const approvedApplications = await JoinUs.countDocuments({
    status: "Approved",
  });

  // Contact
  const totalContacts = await Contact.countDocuments();

  const unreadContacts = await Contact.countDocuments({
    isRead: false,
  });

  // Recent Data
  const recentAppointments = await Appointment.find()
    .populate("service", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  const recentApplications = await JoinUs.find()
    .sort({ createdAt: -1 })
    .limit(5);

  const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

  return {
    appointments: {
      total: totalAppointments,
      pending: pendingAppointments,
      confirmed: confirmedAppointments,
      completed: completedAppointments,
      cancelled: cancelledAppointments,
    },

    services: totalServices,

    categories: totalCategories,

    gallery: totalGallery,

    team: totalTeam,

    reviews: totalReviews,

    announcements: totalAnnouncements,

    joinUs: {
      total: totalApplications,
      pending: pendingApplications,
      approved: approvedApplications,
    },

    contacts: {
      total: totalContacts,
      unread: unreadContacts,
    },

    recentAppointments,

    recentApplications,

    recentContacts,
  };
};

export { getDashboard };

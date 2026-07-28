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
  // Run all count queries in parallel
  const [
    totalAppointments,
    pendingAppointments,
    confirmedAppointments,
    completedAppointments,
    cancelledAppointments,
    totalServices,
    totalCategories,
    totalGallery,
    totalTeam,
    totalReviews,
    totalAnnouncements,
    totalApplications,
    pendingApplications,
    approvedApplications,
    totalContacts,
    unreadContacts,
  ] = await Promise.all([
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: "Pending" }),
    Appointment.countDocuments({ status: "Confirmed" }),
    Appointment.countDocuments({ status: "Completed" }),
    Appointment.countDocuments({ status: "Cancelled" }),
    Service.countDocuments(),
    Category.countDocuments(),
    Gallery.countDocuments(),
    Team.countDocuments(),
    Review.countDocuments(),
    Announcement.countDocuments(),
    JoinUs.countDocuments(),
    JoinUs.countDocuments({ status: "Pending" }),
    JoinUs.countDocuments({ status: "Approved" }),
    Contact.countDocuments(),
    Contact.countDocuments({ isRead: false }),
  ]);

  // Recent Appointments
  const recentAppointments = await Appointment.find()
    .populate("service", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  // Recent Join Us Applications
  const recentApplications = await JoinUs.find()
    .sort({ createdAt: -1 })
    .limit(5);

  // Recent Contact Messages
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

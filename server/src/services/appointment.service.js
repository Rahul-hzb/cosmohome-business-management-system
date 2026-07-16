import Appointment from "../models/Appointment.js";

// Create Appointment
const createAppointment = async (appointmentData) => {
  const appointment = await Appointment.create(appointmentData);

  return appointment;
};

// Get All Appointments
const getAllAppointments = async () => {
  return await Appointment.find()
    .populate("service", "name")
    .populate("assignedTeam", "name designation")
    .sort({
      appointmentDate: 1,
      appointmentTime: 1,
    })
    .lean();
};

// Get Appointment By ID
const getAppointmentById = async (id) => {
  const appointment = await Appointment.findById(id)
    .populate("service", "name")
    .populate("assignedTeam", "name designation");

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  return appointment;
};

// Update Appointment
const updateAppointment = async (id, appointmentData) => {
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  Object.assign(appointment, appointmentData);

  await appointment.save();

  return appointment;
};

// Delete Appointment
const deleteAppointment = async (id) => {
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  await appointment.deleteOne();
};

export {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};

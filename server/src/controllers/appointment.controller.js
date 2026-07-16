import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../services/appointment.service.js";

// Create Appointment
const create = async (req, res) => {
  try {
    const appointment = await createAppointment(req.body);

    res.status(201).json({
      success: true,
      message: "Appointment created successfully.",
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Appointments
const getAll = async (req, res) => {
  try {
    const appointments = await getAllAppointments();

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Appointment By ID
const getById = async (req, res) => {
  try {
    const appointment = await getAppointmentById(req.params.id);

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Appointment
const update = async (req, res) => {
  try {
    const appointment = await updateAppointment(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully.",
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Appointment
const remove = async (req, res) => {
  try {
    await deleteAppointment(req.params.id);

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { create, getAll, getById, update, remove };


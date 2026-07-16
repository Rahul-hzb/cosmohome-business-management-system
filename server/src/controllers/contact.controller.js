import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from "../services/contact.service.js";

// Create
const create = async (req, res) => {
  try {
    const contact = await createContact(req.body);

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: contact,
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
    const contacts = await getAllContacts();

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
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
    const contact = await getContactById(req.params.id);

    res.status(200).json({
      success: true,
      data: contact,
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
    const contact = await updateContact(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Contact updated successfully.",
      data: contact,
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
    await deleteContact(req.params.id);

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { create, getAll, getById, update, remove };


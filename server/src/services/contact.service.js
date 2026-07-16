import Contact from "../models/Contact.js";

// Create Contact
const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

// Get All Contacts
const getAllContacts = async () => {
  return await Contact.find()
    .sort({
      createdAt: -1,
    })
    .lean();
};

// Get Contact By ID
const getContactById = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error("Contact not found.");
  }

  return contact;
};

// Update Contact
const updateContact = async (id, contactData) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error("Contact not found.");
  }

  Object.assign(contact, contactData);

  await contact.save();

  return contact;
};

// Delete Contact
const deleteContact = async (id) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new Error("Contact not found.");
  }

  await contact.deleteOne();
};

export {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};


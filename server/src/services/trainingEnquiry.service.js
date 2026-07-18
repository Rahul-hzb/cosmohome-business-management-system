import TrainingEnquiry from "../models/TrainingEnquiry.js";
import TrainingCourse from "../models/TrainingCourse.js";

/* ------------------------------------------
   Create Training Enquiry
------------------------------------------ */
const createTrainingEnquiry = async (enquiryData) => {
  // Check if the selected course exists
  const course = await TrainingCourse.findById(enquiryData.course);

  if (!course) {
    throw new Error("Training course not found.");
  }

  const enquiry = await TrainingEnquiry.create(enquiryData);

  return enquiry.populate("course", "name courseCode");
};

/* ------------------------------------------
   Get All Enquiries
------------------------------------------ */
const getAllTrainingEnquiries = async () => {
  return await TrainingEnquiry.find()
    .populate("course", "name courseCode")
    .sort({
      createdAt: -1,
    })
    .lean();
};

/* ------------------------------------------
   Get Enquiry By ID
------------------------------------------ */
const getTrainingEnquiryById = async (id) => {
  const enquiry = await TrainingEnquiry.findById(id).populate(
    "course",
    "name courseCode",
  );

  if (!enquiry) {
    throw new Error("Training enquiry not found.");
  }

  return enquiry;
};

/* ------------------------------------------
   Update Enquiry
------------------------------------------ */
const updateTrainingEnquiry = async (id, enquiryData) => {
  const enquiry = await TrainingEnquiry.findById(id);

  if (!enquiry) {
    throw new Error("Training enquiry not found.");
  }

  Object.assign(enquiry, enquiryData);

  await enquiry.save();

  return enquiry.populate("course", "name courseCode");
};

/* ------------------------------------------
   Delete Enquiry
------------------------------------------ */
const deleteTrainingEnquiry = async (id) => {
  const enquiry = await TrainingEnquiry.findById(id);

  if (!enquiry) {
    throw new Error("Training enquiry not found.");
  }

  await enquiry.deleteOne();
};

export {
  createTrainingEnquiry,
  getAllTrainingEnquiries,
  getTrainingEnquiryById,
  updateTrainingEnquiry,
  deleteTrainingEnquiry,
};

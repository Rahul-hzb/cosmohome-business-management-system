import fs from "fs";
import slugify from "slugify";

import TrainingCourse from "../models/TrainingCourse.js";
import cloudinary from "../config/cloudinary.js";

/* ------------------------------------------
   Create Training Course
------------------------------------------ */
const createTrainingCourse = async (courseData, file) => {
  const existingCourse = await TrainingCourse.findOne({
    $or: [{ name: courseData.name }, { courseCode: courseData.courseCode }],
  });

  if (existingCourse) {
    throw new Error("Course name or course code already exists.");
  }

  let thumbnail = {};

  if (file) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/training-courses",
    });

    fs.unlinkSync(file.path);

    thumbnail = {
      url: result.secure_url,
      publicId: result.public_id,
      alt: courseData.name,
    };
  }

  const slug = slugify(courseData.name, {
    lower: true,
    strict: true,
  });

  const course = await TrainingCourse.create({
    ...courseData,
    slug,
    thumbnail,
  });

  return course;
};

/* ------------------------------------------
   Get All Training Courses
------------------------------------------ */
const getAllTrainingCourses = async () => {
  return await TrainingCourse.find({
    isDeleted: false,
  })
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();
};

/* ------------------------------------------
   Get Training Course By ID
------------------------------------------ */
const getTrainingCourseById = async (id) => {
  const course = await TrainingCourse.findById(id);

  if (!course) {
    throw new Error("Training course not found.");
  }

  return course;
};

/* ------------------------------------------
   Update Training Course
------------------------------------------ */
const updateTrainingCourse = async (id, courseData, file) => {
  const course = await TrainingCourse.findById(id);

  if (!course) {
    throw new Error("Training course not found.");
  }

  if (courseData.name) {
    courseData.slug = slugify(courseData.name, {
      lower: true,
      strict: true,
    });
  }

  if (file) {
    if (course.thumbnail?.publicId) {
      await cloudinary.uploader.destroy(course.thumbnail.publicId);
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/training-courses",
    });

    fs.unlinkSync(file.path);

    course.thumbnail = {
      url: result.secure_url,
      publicId: result.public_id,
      alt: courseData.name || course.name,
    };
  }

  Object.assign(course, courseData);

  await course.save();

  return course;
};

/* ------------------------------------------
   Soft Delete
------------------------------------------ */
const deleteTrainingCourse = async (id) => {
  const course = await TrainingCourse.findById(id);

  if (!course) {
    throw new Error("Training course not found.");
  }

  course.isDeleted = true;
  course.isActive = false;

  await course.save();

  return course;
};

/* ------------------------------------------
   Restore
------------------------------------------ */
const restoreTrainingCourse = async (id) => {
  const course = await TrainingCourse.findOne({
    _id: id,
    isDeleted: true,
  });

  if (!course) {
    throw new Error("Training course not found.");
  }

  course.isDeleted = false;
  course.isActive = true;

  await course.save();

  return course;
};

/* ------------------------------------------
   Permanent Delete
------------------------------------------ */
const permanentDeleteTrainingCourse = async (id) => {
  const course = await TrainingCourse.findById(id);

  if (!course) {
    throw new Error("Training course not found.");
  }

  if (course.thumbnail?.publicId) {
    await cloudinary.uploader.destroy(course.thumbnail.publicId);
  }

  await course.deleteOne();
};

/* ------------------------------------------
   Trash Courses
------------------------------------------ */
const getTrashTrainingCourses = async () => {
  return await TrainingCourse.find({
    isDeleted: true,
  }).sort({
    updatedAt: -1,
  });
};

export {
  createTrainingCourse,
  getAllTrainingCourses,
  getTrainingCourseById,
  updateTrainingCourse,
  deleteTrainingCourse,
  restoreTrainingCourse,
  permanentDeleteTrainingCourse,
  getTrashTrainingCourses,
};

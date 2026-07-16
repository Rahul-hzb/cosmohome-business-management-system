import fs from "fs";

import Team from "../models/Team.js";
import cloudinary from "../config/cloudinary.js";

// Create Team Member
const createTeam = async (teamData, file) => {
  if (!file) {
    throw new Error("Team member image is required.");
  }

  const existingTeam = await Team.findOne({
    name: teamData.name,
  });

  if (existingTeam) {
    throw new Error("Team member already exists.");
  }

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "cosmohome/team",
  });

  fs.unlinkSync(file.path);

  const team = await Team.create({
    ...teamData,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
      alt: teamData.name,
    },
  });

  return team;
};

// Get All Team Members
const getAllTeam = async () => {
  return await Team.find()
    .sort({
      displayOrder: 1,
      createdAt: -1,
    })
    .lean();
};

// Get Team Member By ID
const getTeamById = async (id) => {
  const team = await Team.findById(id);

  if (!team) {
    throw new Error("Team member not found.");
  }

  return team;
};

// Update Team Member
const updateTeam = async (id, teamData, file) => {
  const team = await Team.findById(id);

  if (!team) {
    throw new Error("Team member not found.");
  }

  if (file) {
    if (team.image?.publicId) {
      await cloudinary.uploader.destroy(team.image.publicId);
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "cosmohome/team",
    });

    fs.unlinkSync(file.path);

    team.image = {
      url: result.secure_url,
      publicId: result.public_id,
      alt: teamData.name || team.name,
    };
  }

  Object.assign(team, teamData);

  await team.save();

  return team;
};

// Delete Team Member
const deleteTeam = async (id) => {
  const team = await Team.findById(id);

  if (!team) {
    throw new Error("Team member not found.");
  }

  if (team.image?.publicId) {
    await cloudinary.uploader.destroy(team.image.publicId);
  }

  await team.deleteOne();
};

export { createTeam, getAllTeam, getTeamById, updateTeam, deleteTeam };

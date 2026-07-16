import {
  createTeam,
  getAllTeam,
  getTeamById,
  updateTeam,
  deleteTeam,
} from "../services/team.service.js";

// Create Team Member
const create = async (req, res) => {
  try {
    const team = await createTeam(req.body, req.file);

    res.status(201).json({
      success: true,
      message: "Team member created successfully.",
      data: team,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Team Members
const getAll = async (req, res) => {
  try {
    const team = await getAllTeam();

    res.status(200).json({
      success: true,
      count: team.length,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Team Member By ID
const getById = async (req, res) => {
  try {
    const team = await getTeamById(req.params.id);

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Team Member
const update = async (req, res) => {
  try {
    const team = await updateTeam(req.params.id, req.body, req.file);

    res.status(200).json({
      success: true,
      message: "Team member updated successfully.",
      data: team,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Team Member
const remove = async (req, res) => {
  try {
    await deleteTeam(req.params.id);

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully.",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { create, getAll, getById, update, remove };

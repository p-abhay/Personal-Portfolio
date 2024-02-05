// /backend/src/controllers/experienceController.js
const experienceModel = require("../models/experienceModel");

async function getExperiences(req, res) {
  try {
    const experiences = await experienceModel.getExperiences();
    //console.log("hello mate");
    res.json(experiences);
  } catch (error) {
    console.error("Error getting experiences:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getExperienceById(req, res) {
  const experienceId = req.params.id;
  try {
    const experience = await experienceModel.getExperienceById(experienceId);
    //console.log("hello mate");
    res.json(experience);
  } catch (error) {
    console.error("Error getting experiences:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addExperience(req, res) {
  const experience = req.body;
  try {
    const addedExperience = await experienceModel.addExperience(experience);
    res.json(addedExperience);
  } catch (error) {
    console.error("Error adding experience:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateExperience(req, res) {
  const experienceId = req.params.id;
  const updatedExperience = req.body;
  try {
    const updatedExperienceResult = await experienceModel.updateExperience(
      experienceId,
      updatedExperience
    );
    res.json(updatedExperienceResult);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteExperience(req, res) {
  const experienceId = req.params.id;
  try {
    const deletedExperience = await experienceModel.deleteExperience(
      experienceId
    );
    res.json(deletedExperience);
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getExperiences,
  getExperienceById,
  addExperience,
  updateExperience,
  deleteExperience,
};

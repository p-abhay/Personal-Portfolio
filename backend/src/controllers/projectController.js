// /backend/src/controllers/projectController.js
const projectModel = require("../models/projectModel");

async function getProjects(req, res) {
  try {
    const projects = await projectModel.getProjects();
    //console.log("hello mate");
    res.json(projects);
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getProjectById(req, res) {
  const projectId = req.params.id;
  try {
    const project = await projectModel.getProjectById(projectId);
    //console.log("hello mate");
    res.json(project);
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function addProject(req, res) {
  const project = req.body;
  try {
    const addedProject = await projectModel.addProject(project);
    res.json(addedProject);
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateProject(req, res) {
  const projectId = req.params.id;
  const updatedProject = req.body;
  try {
    const updatedProjectResult = await projectModel.updateProject(
      projectId,
      updatedProject
    );
    res.json(updatedProjectResult);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteProject(req, res) {
  const projectId = req.params.id;
  try {
    const deletedProject = await projectModel.deleteProject(projectId);
    res.json(deletedProject);
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};

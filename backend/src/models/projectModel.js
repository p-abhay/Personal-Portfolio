// /backend/src/models/projectModel.js
const { ObjectId } = require("mongodb");
const { getClient } = require("../db/db");

async function getCollection() {
  const client = getClient();
  const database = client.db("personal-portfolio");
  const collection = database.collection("project-db");
  //console.log("collector");
  return collection;
}

async function getProjects() {
  const collection = await getCollection();

  try {
    const projects = await collection.find({}).toArray();
    return projects;
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
}

async function getProjectById(projectId) {
  const collection = await getCollection();

  try {
    const project = await collection.findOne({ _id: new ObjectId(projectId) });
    // const project = await collection.findOne({ _id: projectId });
    // console.log(projectId);
    return project;
  } catch (error) {
    console.error("Error getting project by ID:", error);
    throw error;
  }
}

async function addProject(project) {
  const collection = await getCollection();

  try {
    // Use ObjectId to generate a unique identifier
    project._id = new ObjectId();
    const result = await collection.insertOne(project);
    console.log("Result: ", result);
    return result.insertedId;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
}

async function updateProject(projectId, updatedProject) {
  const collection = await getCollection();

  try {
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(projectId) },
      { $set: { ...updatedProject, _id: new ObjectId(projectId) } },
      { returnDocument: "after" }
    );

    return result;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

async function deleteProject(projectId) {
  const collection = await getCollection();

  try {
    const result = await collection.findOneAndDelete({
      _id: new ObjectId(projectId),
    });
    console.log("delted", result);
    return result;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};

// /backend/src/models/experienceModel.js
const { ObjectId } = require("mongodb");
const { getClient } = require("../db/db");

async function getCollection() {
  const client = getClient();
  const database = client.db("personal-portfolio");
  const collection = database.collection("experience-db");
  //console.log("collector");
  return collection;
}

async function getExperiences() {
  const collection = await getCollection();

  try {
    const experiences = await collection.find({}).toArray();
    return experiences;
  } catch (error) {
    console.error("Error getting experiences:", error);
    throw error;
  }
}

async function getExperienceById(experienceId) {
  const collection = await getCollection();

  try {
    const experience = await collection.findOne({
      _id: new ObjectId(experienceId),
    });
    // const experience = await collection.findOne({ _id: experienceId });
    // console.log(experienceId);
    return experience;
  } catch (error) {
    console.error("Error getting experience by ID:", error);
    throw error;
  }
}

async function addExperience(experience) {
  const collection = await getCollection();

  try {
    // Use ObjectId to generate a unique identifier
    experience._id = new ObjectId();
    const result = await collection.insertOne(experience);
    console.log("Result: ", result);
    return result.insertedId;
  } catch (error) {
    console.error("Error adding experienece:", error);
    throw error;
  }
}

async function updateExperience(experienceId, updatedExperience) {
  const collection = await getCollection();

  try {
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(experienceId) },
      { $set: { ...updatedExperience, _id: new ObjectId(experienceId) } },
      { returnDocument: "after" }
    );

    return result;
  } catch (error) {
    console.error("Error updating experience:", error);
    throw error;
  }
}

async function deleteExperience(experienceId) {
  const collection = await getCollection();

  try {
    const result = await collection.findOneAndDelete({
      _id: new ObjectId(experienceId),
    });
    console.log("deleted", result);
    return result;
  } catch (error) {
    console.error("Error deleting experience:", error);
    throw error;
  }
}

module.exports = {
  getExperiences,
  getExperienceById,
  addExperience,
  updateExperience,
  deleteExperience,
};

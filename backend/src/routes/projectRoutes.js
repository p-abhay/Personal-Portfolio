// /backend/src/routes/projectRoutes.js
const express = require("express");
const projectController = require("../controllers/projectController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.post("/add", verifyToken, projectController.addProject);
router.put("/update/:id", verifyToken, projectController.updateProject);
router.delete("/delete/:id", verifyToken, projectController.deleteProject);

module.exports = router;

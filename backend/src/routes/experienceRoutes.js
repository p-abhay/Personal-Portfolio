// /backend/src/routes/experienceRoutes.js
const express = require("express");
const experienceController = require("../controllers/experienceController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", experienceController.getExperiences);
router.get("/:id", experienceController.getExperienceById);
router.post("/add", verifyToken, experienceController.addExperience);
router.put("/update/:id", verifyToken, experienceController.updateExperience);
router.delete(
  "/delete/:id",
  verifyToken,
  experienceController.deleteExperience
);

module.exports = router;

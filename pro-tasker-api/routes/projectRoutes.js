const express = require("express");
const { authMiddleware } = require("../middleware/authMid");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const projectRouter = express.Router();

// Protects all rotes in this router
projectRouter.use(authMiddleware);

projectRouter.get("/", getAllProjects);
projectRouter.post("/", createProject);
projectRouter.get("/:projectId", getProjectById);
projectRouter.put("/:projectId", updateProject);
projectRouter.delete("/:projectId", deleteProject);
module.exports = projectRouter;
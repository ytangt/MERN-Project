const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMid");

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

//through middleware to check
router.use(authMiddleware);

// GET /api/projects
// POST /api/projects 
router
  .route("/")
  .get(getAllProjects)
  .post(createProject);

// GET /api/projects/:id 
// PUT /api/projects/:id 
// DELETE /api/projects/:id 
router
  .route("/:id")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

module.exports = router;
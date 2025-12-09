const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/authMid");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");


router.use(authMiddleware);


router
  .route("/:projectId/tasks")
  .get(getTasks)
  .post(createTask);

// PUT 
// DELETE 
router
  .route("/:projectId/tasks/:taskId")
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
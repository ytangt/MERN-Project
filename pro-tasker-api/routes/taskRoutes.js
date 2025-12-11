const express = require("express");
const { authMiddleware } = require("../middleware/authMid");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");

const taskRouter = express.Router({ mergeParams: true });

// Protect all routes
taskRouter.use(authMiddleware);

taskRouter.get("/", getTasks);

taskRouter.post("/", createTask);
taskRouter.get("/:taskId", getTaskById);
taskRouter.put("/:taskId", updateTask);
taskRouter.delete("/:taskId", deleteTask);

module.exports = taskRouter;
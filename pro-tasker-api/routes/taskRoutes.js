const express = require("express");
const { authMiddleware } = require("../middleware/authMid");
const Project = require("../models/Project");
const Task = require("../models/Task");

const taskRouter = express.Router({ mergeParams: true });

// Protect all routes
taskRouter.use(authMiddleware);

// Helper: Check if logged-in user owns this project

async function checkProjectOwnership(projectId, userId) {
  const project = await Project.findById(projectId);

  if (!project) return null;

  if (project.user.toString() !== userId.toString()) return false;

  return project;
}

//GET /api/tasks/:projectId
taskRouter.get("/", async (req, res) => {
  try {
    const { projectId } = req.params;

    // Authorization
    const project = await checkProjectOwnership(projectId, req.user._id);
    if (project === null) {
      return res.status(404).json({ message: "Project not found!" });
    }
    if (project === false) {
      return res.status(403).json({ message: "Not authorized to view tasks in this project." });
    }

    const tasks = await Task.find({ project: projectId });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/projects/:projectId/tasks
 */
taskRouter.post("/", async (req, res) => {
  try {
    const { projectId } = req.params;

    // Authorization
    const project = await checkProjectOwnership(projectId, req.user._id);
    if (project === null) {
      return res.status(404).json({ message: "Project not found!" });
    }
    if (project === false) {
      return res.status(403).json({ message: "Not authorized to add tasks." });
    }

    const newTask = await Task.create({
      ...req.body,
      project: projectId,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/projects/:projectId/tasks/:taskId
 */
taskRouter.put("/:taskId", async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    // Authorization
    const project = await checkProjectOwnership(projectId, req.user._id);
    if (project === null) {
      return res.status(404).json({ message: "Project not found!" });
    }
    if (project === false) {
      return res.status(403).json({ message: "Not authorized to update tasks." });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, project: projectId },  
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/projects/:projectId/tasks/:taskId
 */
taskRouter.delete("/:taskId", async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    // Authorization
    const project = await checkProjectOwnership(projectId, req.user._id);
    if (project === null) {
      return res.status(404).json({ message: "Project not found!" });
    }
    if (project === false) {
      return res.status(403).json({ message: "Not authorized to delete tasks." });
    }

    const deleted = await Task.findOneAndDelete({
      _id: taskId,
      project: projectId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.json({ message: "Task deleted successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = taskRouter;
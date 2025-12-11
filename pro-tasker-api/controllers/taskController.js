const Project = require("../models/Project");
const Task = require("../models/Task");

//verify project owner
async function verifyProjectOwner(req, res) {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    res.status(404).json({ message: "Project not found" });
    return null;
  }

  if (project.owner.toString() !== req.user._id) {
    res.status(403).json({ message: "Not authorized" });
    return null;
  }

  return project;
}

//create task
async function createTask(req, res) {
  try {
    const project = await verifyProjectOwner(req, res);
    if (!project) return;

    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      project: project._id,
    });

    res.status(201).json(task);

  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ message: "Server error", error: error.message,
      stack: error.stack});
  }
}

//Get tasks
async function getTasks(req, res) {
  try {
    const project = await verifyProjectOwner(req, res);
    if (!project) return;

    const tasks = await Task.find({ project: project._id }).sort({ createdAt: -1 });

    res.json(tasks);

  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//Update Task
async function updateTask(req, res) {
  try {
    const project = await verifyProjectOwner(req, res);
    if (!project) return;

    const { taskId } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findOne({ _id: taskId, project: project._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    const updated = await task.save();

    res.json(updated);

  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
//getTaskbyID
async function getTaskById(req, res) {
  try {
    const project = await verifyProjectOwner(req, res);
    if (!project) return;

    const { taskId } = req.params;

    const task = await Task.findOne({
      _id: taskId,
      project: project._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ message: "Server error" });
  }
}
//DeleteTask
async function deleteTask(req, res) {
  try {
    const project = await verifyProjectOwner(req, res);
    if (!project) return;

    const { taskId } = req.params;

    const task = await Task.findOne({ _id: taskId, project: project._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });

  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
};

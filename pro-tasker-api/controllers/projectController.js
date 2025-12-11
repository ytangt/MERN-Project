const Project = require("../models/Project");
const Task = require("../models/Task");

//create project
async function createProject(req, res) {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    // owner = the logged in user (from authMiddleware)
    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
    });

    res.status(201).json(project);

  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//get projects from login user
async function getAllProjects(req, res) {
  try {
    const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });

    res.json(projects);

  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//get project by ID
async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(project);

  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//updateProject
async function updateProject(req, res) {
  try {
    const { name, description } = req.body;
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;

    const updatedProject = await project.save();

    res.json(updatedProject);

  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//Delete projects

async function deleteProject(req, res) {
  console.log("DELETE PROJECT HIT", req.params);
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Delete tasks belonging to this project
    await Task.deleteMany({ project: project._id });

    // Delete the project
    await project.deleteOne();

    res.json({ message: "Project and related tasks deleted" });

  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
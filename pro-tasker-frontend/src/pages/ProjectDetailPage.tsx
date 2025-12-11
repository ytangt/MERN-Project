import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
import type { Project,Task} from "../types";
import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";

function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { projectId } = useParams();

  //Edit state for project updates
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  
  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}`);
        setProject(res.data);

        // Fill inputs when entering page
        setEditName(res.data.name);
        setEditDescription(res.data.description || "");
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  // Fetch tasks for this project
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await apiClient.get(`/api/projects/${projectId}/tasks`);
        setTasks(res.data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };
    fetchTasks();
  }, [projectId]);

    //update project
    const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await apiClient.put(`/api/projects/${projectId}`, {
        name: editName,
        description: editDescription,
      });
       // update UI
      setProject(res.data); 
      // close form
      setEditMode(false);
    } catch (error) {
      console.error("Update project failed", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Project</div>;

  return (
    <div className="container">
      <h1>Project Details</h1>

      {/* ---------- PROJECT CARD ---------- */}
      {project && (
        <div className="card p-3 mb-4">
          {!editMode ? (
            <>
              <h3 className="card-title">{project.name}</h3>
              <p className="card-text">{project.description}</p>

              <button
                className="btn btn-outline-secondary"
                onClick={() => setEditMode(true)}
              >
                Edit Project
              </button>
            </>
          ) : (
            <form onSubmit={handleUpdateProject}>
              <div className="mb-2">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Description</label>
                <input
                  className="form-control"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>

              <button className="btn btn-primary me-2" type="submit">
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
                type="button"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      )}

      <hr />

        {/* ------------ TASK LIST ------------ */}
        <h2 className="mt-4">Tasks</h2>

        {tasks.length === 0 ? (
          <p className="text-muted">No tasks yet.</p>
        ) : (
          <ul className="list-group mb-3">
            {tasks.map((task) => (
              <li key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center">
                <Link
                className="btn btn-sm btn-outline-primary" 
                to={`/projects/${projectId}/tasks/${task._id}`}>
                  {task.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* ------------ CREATE NEW TASK ------------ */}
      <TaskForm
  onSubmit={async (title, description) => {
    try {
      const res = await apiClient.post(`/api/projects/${projectId}/tasks`, {
        title,
        description,
      });

      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error creating task:", err);
    }
  }}
/> 
      </div>
    );
  }

export default ProjectDetailsPage;
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

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}`);
        console.log(res.data);
        setProject(res.data);
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

  // Create new task
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const res = await apiClient.post(`/api/projects/${projectId}/tasks`, {
        title: newTaskTitle,
      });

      setTasks((prev) => [...prev, res.data]);
      setNewTaskTitle("");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Project</div>;

  return (
    <div className="container">
      <h1 >Project Details</h1>

      {project && 
      <div className="card p-3 mb-4">
      <h3 className="card-title">{project.name}</h3>
      <p className="card-text">{project.description}</p>
      </div>
      }

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
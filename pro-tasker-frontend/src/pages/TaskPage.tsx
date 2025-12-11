import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../clients/api";
import type { Task, TaskStatus } from "../types";

function TaskPage() {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Local form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");

  // Fetch single task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/api/projects/${projectId}/tasks/${taskId}`
        );

        const data: Task = res.data;
        setTask(data);

        // Fill form values
        setTitle(data.title);
        setDescription(data.description || "");
        setStatus(data.status || "todo");
      } catch (err: any) {
        console.error(err);
        setError("Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [projectId, taskId]);

  // Handle UPDATE
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await apiClient.put(`/api/projects/${projectId}/tasks/${taskId}`, {
        title,
        description,
        status,
      });

      navigate(`/projects/${projectId}`); // return to project detail
    } catch (err: any) {
      console.error(err);
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  // Handle DELETE
  const handleDelete = async () => {
    try {
      setLoading(true);

      await apiClient.delete(`/api/projects/${projectId}/tasks/${taskId}`);

      navigate(`/projects/${projectId}`);
    } catch (err: any) {
      console.error(err);
      setError("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading task...</div>;
  if (error) return <div>{error}</div>;
  if (!task) return <div>No task found</div>;

  return (
    <div>
      <h1>Edit Task</h1>

      <form onSubmit={handleUpdate}>
        <label>
          Title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Description:
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="in-review">In Review</option>
            <option value="done">Done</option>
          </select>
        </label>

        <button type="submit">Save Changes</button>
      </form>

      <button onClick={handleDelete}>Delete Task</button>
    </div>
  );
}

export default TaskPage;
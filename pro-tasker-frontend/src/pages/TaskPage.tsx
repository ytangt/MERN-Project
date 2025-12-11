import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiClient } from "../clients/api";
import type { Task, TaskStatus } from "../types";
import TaskItem from "../components/TaskItem";

function TaskPage() {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  const updateStatus = async (status: TaskStatus) => {
    try {
      await apiClient.put(`/api/projects/${projectId}/tasks/${taskId}`, {
        ...task,
        status,
      });

      setTask((prev) =>
        prev ? { ...prev, status } : prev
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
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

  if (loading) return <div className="text-center p-3">Loading task...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!task) return <div>No task found</div>;

  return (
    <div className="container">
      <h2 className="mb-3">Task Details</h2>

      <ul className="list-group">
        <TaskItem
          task={task}
          onStatusChange={updateStatus}
          onDelete={handleDelete}
        />
      </ul>

      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate(`/projects/${projectId}`)}
      >
        Back to Project
      </button>
    </div>
  );
}

export default TaskPage;
import type { Task } from "../types";

function TaskItem({
  task,
  onStatusChange,
  onDelete,
}: {
  task: Task;
  onStatusChange: (status: Task["status"]) => void;
  onDelete: () => void;
}) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div>
        <h4 className="mb-1">{task.title}</h4>
        <p className="text-muted mb-1">{task.description}</p>
        <p >Status: {task.status}</p>
      </div>
      <div className="d-flex flex-column gap-1 ms-3">
        <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => onStatusChange("todo")}>To Do</button>
        <button 
        className="btn btn-outline-warning btn-sm"
        onClick={() => onStatusChange("in-progress")}>In Progress</button>
        <button
          className="btn btn-outline-info btn-sm"
          onClick={() => onStatusChange("in-review")}>In Review
        </button>
        <button 
        className="btn btn-outline-info btn-sm"
        onClick={() => onStatusChange("done")}>Done</button>

        <button 
        className="btn btn-danger btn-sm mt-1" 
        onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
}

export default TaskItem;
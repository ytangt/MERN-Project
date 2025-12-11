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
    <div>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <button onClick={() => onStatusChange("todo")}>To Do</button>
      <button onClick={() => onStatusChange("in-progress")}>In Progress</button>
      <button onClick={() => onStatusChange("done")}>Done</button>

      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;
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

      <button onClick={() => onStatusChange("To Do")}>To Do</button>
      <button onClick={() => onStatusChange("In Progress")}>In Progress</button>
      <button onClick={() => onStatusChange("Done")}>Done</button>

      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;
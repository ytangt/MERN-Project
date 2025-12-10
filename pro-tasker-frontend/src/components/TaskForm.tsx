import { useState } from "react";

function TaskForm({ onSubmit }: { onSubmit: (title: string, desc: string) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
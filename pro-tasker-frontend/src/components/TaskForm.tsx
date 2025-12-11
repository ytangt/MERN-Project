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
    <form className="border rounded p-3 bg-light mb-3" onSubmit={handleSubmit}>
      <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />

      <label className="form-label">Description</label>
        <input
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />

      <button className="btn btn-primary w-100 mt-3" type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { Link } from "react-router-dom";
import type { Project } from "../types";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/api/projects");
        console.log(res.data);
        setProjects(res.data);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-3xl text-white">Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await apiClient.post("/api/projects", { name, description });
      setProjects((prev) => [...prev, res.data]);
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
      setName("")
      setDescription("")
    }
  };
  return (
    <div>
      <h1>Projects</h1>

      <form
        onSubmit={handleSubmit}
      >
        <label htmlFor="project-name">Project Name: </label>
        <input
          type="text"
          name="project-name"
          className="border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="project-description">Project Description</label>
        <input
          type="text"
          name="project-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="submit"
          value="Create Project"
        />
      </form>

      {error && <div>{error}</div>}

      <div>
        {projects &&
          projects.map((project) => (
            <div
              key={project._id}
            >
              <div>{project.name}</div>
              <div>{project.description}</div>
              <Link
                to={`/projects/${project._id}`}
              >
                See Project
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
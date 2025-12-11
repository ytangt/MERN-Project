import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import type { Project } from "../types";
import ProjectCard from "../components/ProjectCard";

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //Fetch all projects
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

  //Create Project
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
  
  //Delete Porject
  const handleDelete = async (projectId: string) => {
  try {
    await apiClient.delete(`/api/projects/${projectId}`);

    setProjects(prev => prev.filter(p => p._id !== projectId));
  } catch (err) {
    console.error("Delete failed", err);
    setError("Failed to delete project");
  }
};

  if (loading) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div>
      <h1 className="mb-4">Projects</h1>
      {/* ---------- CREATE PROJECT FORM ---------- */}
      <form className="border rounded p-3 bg-light mb-4"
      onSubmit={handleSubmit}
      >

        <label htmlFor="project-name">Project Name: </label>
      
        <div className="mb-2">
          <input
            type="text"
            name="project-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        
        <label htmlFor="project-description">Project Description</label>
        <div className="mb-2">
            <input
            type="text"
            name="project-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 mt-2" type="submit">
            Create Project
        </button>
      </form>

      {error && <div>{error}</div>}

      <div>
        {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          onDelete={handleDelete}
        />
      ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
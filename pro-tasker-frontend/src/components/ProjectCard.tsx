import { Link } from "react-router-dom";
import type { Project } from "../types";

function ProjectCard({ project,onDelete, }: { project: Project;onDelete: (id: string) => void; }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h3 className="card-title">{project.name}</h3>
        <p className="card-text text-muted">{project.description}</p>
        <Link to={`/projects/${project._id}`} className="btn btn-primary me-2">
        Open
        </Link>
      
        <button
            className="btn btn-danger "
            onClick={() => onDelete(project._id)}
          >
            Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;
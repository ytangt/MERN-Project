import { Link } from "react-router-dom";
import type { Project } from "../types";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <Link to={`/projects/${project._id}`}>Open</Link>
    </div>
  );
}

export default ProjectCard;
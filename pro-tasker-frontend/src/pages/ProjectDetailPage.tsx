import { useEffect, useState } from "react";
import { apiClient } from "../clients/api";
import { useParams } from "react-router-dom";
import type { Project } from "../types";

function ProjectDetailsPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/api/projects/${projectId}`);
        console.log(res.data);
        setProject(res.data);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);


  useEffect(() => {
  }, [projectId]);


  if (loading) return <div >Loading...</div>;

  if (error) return <div >Error loading Project</div>;

  return (
    <div >
      <h1 >Project Details</h1>

      <div >
        <div >{project?.name}</div>
        <div >{project?.description}</div>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
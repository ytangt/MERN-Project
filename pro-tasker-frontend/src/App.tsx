import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

//Pages
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailPage";
import AuthPage from "./pages/AuthPage";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <>
      <div>
      <Navbar />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/projects/:projectId/tasks/:taskId" element={<TaskPage />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
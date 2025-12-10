import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailPage";
import LoginPage from "./pages/AuthPage";
import RegisterPage from "./pages/AuthPage"; 

import NavBar from "./components/Navbar";


function App() {
  return (
    <>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage />} />

          {/* <Route path='/projects' element={
            <AuthenticatedRoute>
            <ProjectsPage/> 
            </AuthenticatedRoute>
          }
          /> */}
          <Route path="/projects" element={<ProjectPage />} />

          {/* <Route path='/projects/:projectId' element={ 
            <AuthenticatedRoute>
            <ProjectDetailsPage/>
            </AuthenticatedRoute>
          }
          /> */}
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
         
        </Routes>
      </div>
    </>
  );
}

export default App;
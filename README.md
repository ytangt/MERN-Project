# Pro-Tasker — MERN Project Management App

Pro-Tasker is a full-stack MERN application that allows users to register, log in, create projects, and manage tasks. The app implements JWT authentication, protected routes, and full CRUD operations for both projects and tasks.

## Tech Stack
Frontend

React 19 + TypeScript
React Router
Axios
Bootstrap
Vite

Backend

Node.js + Express
MongoDB + Mongoose
JWT Authentication
bcrypt for password hashing
CORS, Morgan

## REST API Documentation
Auth ( /api/users )
POST /api/users/register — Register user
POST /api/users/login — Login & return JWT
GET /api/users — Get all users (protected)
GET /api/users/:id — Get user by ID

Projects ( /api/projects )
(All project routes require JWT)
GET /api/projects — Get all projects for logged-in user
POST /api/projects — Create project
GET /api/projects/:projectId — Get project by ID
PUT /api/projects/:projectId — Update project
DELETE /api/projects/:projectId — Delete project (+ related tasks)

Tasks ( /api/projects/:projectId/tasks )
(All task routes require JWT)

GET /api/projects/:projectId/tasks — Get tasks for project
POST /api/projects/:projectId/tasks — Create task
GET /api/projects/:projectId/tasks/:taskId — Get task by ID
PUT /api/projects/:projectId/tasks/:taskId — Update task
DELETE /api/projects/:projectId/tasks/:taskId — Delete task

Auth Header
All protected routes require: Authorization: Bearer <token>

## Frontend → Backend Data Flow
[User Input in Form]
       ↓
AuthPage.tsx → AuthProvider
       ↓
axios (apiClient)
       ↓ attaches JWT automatically
HTTP Request to Express API
       ↓
authMiddleware verifies JWT
       ↓
Controller Logic (Users / Projects / Tasks)
       ↓
MongoDB via Mongoose
       ↓
Response JSON sent back to client
       ↓
React updates UI and state
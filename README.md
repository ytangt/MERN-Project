backend api:

Login
POST /api/users/login

Register
POST /api/users/register

Projects
GET /api/projects
GET /api/projects/:projectId
POST /api/projects
PATCH /api/projects/:projectId
DELETE /api/projects/:projectId

Tasks
GET /api/projects/:projectId/tasks
POST /api/projects/:projectId/tasks
PUT /api/projects/:projectId/tasks/:taskId
DELETE /api/projects/:projectId/tasks/:taskId
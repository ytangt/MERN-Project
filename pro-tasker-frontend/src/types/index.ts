export interface Project {
  name: string;
  description: string;
  _id: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
}

export type TaskStatus = "todo" | "in-progress" | "done";
export interface Task {
  _id: string;
  title: string;
  description?: string;
  status?: TaskStatus;
  project: string;     // projectId
}
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// attach token dymically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("pt_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


import axios from 'axios'



export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzBiN2NmY2E2NzEzNjIzY2VhNWNjOSIsInVzZXJuYW1lIjoiYWJlIiwiZW1haWwiOiJhYmVAZ21haWwuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzY0OTczOTI4LCJleHAiOjE3NjUwNjAzMjh9.MFxTJXff4S1WLGGlnYbz7sr3mDfVu02EDD8kEME3PWM"
    }
});
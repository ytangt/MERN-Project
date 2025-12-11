import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types";
import { apiClient } from "../clients/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  register: (data: { username: string; email: string; password: string }) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

//context
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem("pt_token") || null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  const navigate = useNavigate();

  // --------------------------
  // Restore session on refresh
  // --------------------------
  useEffect(() => {
    const savedToken = localStorage.getItem("pt_token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // --------------------------
  // Register
  // --------------------------
  const register = async (data: {
    username: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      await apiClient.post("/api/users/register", data);
      navigate("/auth");
      return true;
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    }
  };

  // --------------------------
  // Login
  // --------------------------
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await apiClient.post("/api/users/login", { email, password });

      const { token, user } = res.data;

      // Save local session
      localStorage.setItem("pt_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setToken(token);
      setIsAuthenticated(true);

      navigate("/projects");

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  // --------------------------
  // Logout
  // --------------------------
  const logout = () => {
    localStorage.removeItem("pt_token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
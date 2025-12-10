import { createContext, useState, useEffect } from "react";
import type { User } from "../types";
import { apiClient } from "../clients/api";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  logIn: (username: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logOut: () => void;
  token: string | null;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  //restore user form localStorage if available 
  const [user, setUser] = useState<User | null>(() => {
    try {
      const value = localStorage.getItem("user");
      if (value) {
        return JSON.parse(value);
      } else return null;
    } catch (error) {
      console.error(error);
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      const value = localStorage.getItem("token");
      if (value) {
        return JSON.parse(value);
      } else return null;
    } catch (error) {
      console.error(error);
    }
  });

//Login
  const logIn = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await apiClient.post("/users/login", { username, password });

      const { user, token } = res.data;

      setUser(user);
      setToken(token);

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };
//Register
  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await apiClient.post("/users/register", {
        username,
        email,
        password,
      });

      const { user, token } = res.data;

      setUser(user);
      setToken(token);

      return true;
    } catch (err) {
      console.error("Register failed:", err);
      return false;
    }
  };
//Logout
  const logOut = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logIn, register, logOut, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
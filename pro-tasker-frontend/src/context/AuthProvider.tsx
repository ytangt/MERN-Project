import { createContext, useState } from "react";
import type { User } from "../types";
import { apiClient } from "../clients/api";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;

  logIn: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;

  logOut: () => void;

  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const value = localStorage.getItem("user");
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
  try {
    return localStorage.getItem("pt_token") || null; 
  } catch (error) {
    console.error(error);
    return null;  
  }
});

//Login
  const logIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await apiClient.post("/api/users/login", { email, password });

      const { user, token } = res.data;

      setUser(user);
      setToken(token);

      //token key 
      localStorage.setItem("pt_token", token);
      localStorage.setItem("user", JSON.stringify(user));

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
      const res = await apiClient.post("/api/users/register", {
        username,
        email,
        password,
      });

      const { user, token } = res.data;

    setUser(user);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("pt_token", token);

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
    localStorage.removeItem("pt_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logIn, register, logOut, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
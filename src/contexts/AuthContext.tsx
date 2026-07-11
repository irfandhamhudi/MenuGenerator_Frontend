import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { User } from "../types";
import * as api from "../services/api";
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const checkAuth = useCallback(async () => {
    try {
      const res = await api.getMe();
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    setUser(res.user);
  };
  const register = async (username: string, email: string, password: string) => {
    const res = await api.register({ username, email, password });
    setUser(res.user);
  };
  const logout = async () => {
    await api.logout();
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

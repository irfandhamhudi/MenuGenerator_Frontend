import axios from "axios";
import type { Menu, MenuItem, TemplateType, User } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});

// Auth
export const register = async (
  data: Record<string, string>
): Promise<{ user: User }> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (
  data: Record<string, string>
): Promise<{ user: User }> => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getMe = async (): Promise<{ user: User }> => {
  const res = await api.get("/auth/me");
  return res.data;
};

// Menus
export const getMenus = async (): Promise<{ menus: Menu[] }> => {
  const res = await api.get("/menus");
  return res.data;
};

export const getMenu = async (id: string): Promise<{ menu: Menu }> => {
  const res = await api.get(`/menus/${id}`);
  return res.data;
};

export const createMenu = async (data: {
  title: string;
  template: TemplateType;
  categories: string[];
  items: MenuItem[];
}): Promise<{ menu: Menu }> => {
  const res = await api.post("/menus", data);
  return res.data;
};

export const updateMenu = async (
  id: string,
  data: {
    title: string;
    template: TemplateType;
    categories: string[];
    items: MenuItem[];
  }
): Promise<{ menu: Menu }> => {
  const res = await api.put(`/menus/${id}`, data);
  return res.data;
};

export const deleteMenu = async (id: string): Promise<void> => {
  await api.delete(`/menus/${id}`);
};

export const getTrashedMenus = async (): Promise<{ menus: Menu[] }> => {
  const res = await api.get("/menus/trashed");
  return res.data;
};

export const restoreMenu = async (id: string): Promise<{ menu: Menu }> => {
  const res = await api.post(`/menus/${id}/restore`);
  return res.data;
};

export const permanentDeleteMenu = async (id: string): Promise<void> => {
  await api.delete(`/menus/${id}/permanent`);
};

// Upload
export const uploadImage = async (
  file: File
): Promise<{ url: string; public_id: string }> => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await api.post("/upload", formData);
  return res.data;
};

export default api;

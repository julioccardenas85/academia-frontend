import axios from "axios";

export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => !!getToken();

export const api = axios.create({
  baseURL: "https://localhost:7185/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

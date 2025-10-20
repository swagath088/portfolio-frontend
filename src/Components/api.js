import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

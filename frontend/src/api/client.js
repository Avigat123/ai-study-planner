import axios from "axios";

const BASE_URL = "https://ai-study-planner-iktk.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});

// Attach JWT token to every request dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

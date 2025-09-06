import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:60354/api", // 👈 pon aquí tu base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Ejemplo de interceptor para token
api.interceptors.request.use((config:any) => {
  const token = '';
  if (!config.headers) {
    config.headers = {};
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

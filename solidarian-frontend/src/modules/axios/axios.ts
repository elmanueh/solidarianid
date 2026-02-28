import { authResponseInterceptor } from "@/modules/auth/interceptors/response.interceptor";
import axios from "axios";

// FIXME: Poner URL del backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use((response) => response, authResponseInterceptor);

export default api;

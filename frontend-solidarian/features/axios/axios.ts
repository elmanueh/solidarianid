import axios from "axios"

// FIXME: Poner URL del backend
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export default api

import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://newportfolio-production-53d4.up.railway.app",
  withCredentials:true,
  headers: {
    "Content-Type": "application/json",
  },
  maxContentLength: 50 * 1024 * 1024,
  maxBodyLength: 50 * 1024 * 1024,
});

// Optional: interceptors for debugging
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     console.error("API error:", err?.response || err);
//     return Promise.reject(err);
//   }
// );
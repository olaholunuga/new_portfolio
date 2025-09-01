import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptors for debugging
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     console.error("API error:", err?.response || err);
//     return Promise.reject(err);
//   }
// );
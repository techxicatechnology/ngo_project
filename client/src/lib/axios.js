import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Log the baseURL in development to help debug
if (import.meta.env.DEV) {
  console.log("API Base URL:", baseURL);
  console.log("VITE_API_URL env:", import.meta.env.VITE_API_URL);
}

export const axiosInstance  = axios.create({
    baseURL: baseURL,
    withCredentials:true
})

// Add request interceptor to log requests in development
axiosInstance.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
      console.log("Full URL:", config.baseURL + config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
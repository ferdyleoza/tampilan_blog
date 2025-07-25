import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backendblog.up.railway.app/api",
});

// Interceptor agar token selalu disisipkan sebelum request dikirim
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;

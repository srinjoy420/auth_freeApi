import axios from "axios";
const api = axios.create({
  baseURL: "https://auth-freeapi.onrender.com/api/v1/users",
  withCredentials: true,
});
export const googleAuth = (code) => api.get(`/google?code=${code}`);

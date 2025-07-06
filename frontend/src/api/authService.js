import axiosInstance from "./axios";
import { StorageKeys } from "../utils/constaints.js";

const authService = {
  register: async (userdata) => {
    const response = await axiosInstance.post("/users/register", userdata);
    return response.data;
  },

  login: async (userdata) => {
    const response = await axiosInstance.post("/users/login", userdata);

    const accessToken = response.data?.data?.accessToken;
    const refreshToken = response.data?.data?.refreshToken;

    if (accessToken) {
      localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken);
    }

    if (refreshToken) {
      localStorage.setItem(StorageKeys.REFRESH_TOKEN, refreshToken);
    }

    return response.data;
  },

  currentuser: async () => {
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN); // ✅ get correctly
    if (!token) throw new Error("Token not found");

    const response = await axiosInstance.get("/users/current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};

export default authService;

import axiosInstance from "./axios";
import { StorageKeys } from "../utils/constaints.js";

const authService = {
  register: async (userdata) => {
    const response = await axiosInstance.post("/users/register", userdata);
    return response.data;
  },
  login: async (userdata) => {
    const response = await axiosInstance.post("/users/login", userdata);
    if (response.data?.data?.accessToken) {
      localStorage.setItem(
        StorageKeys.ACESS_TOKEN,
        response.data.data.accessToken
      );
    }

    if (response.data?.data?.refreshToken) {
      localStorage.setItem(
        StorageKeys.REFRESH_TOKEN,
        response.data.data.refreshToken
      );
    }
    return response.data;
  },
  currentuser: async (userdata) => {
    const response = await axiosInstance.get("/users/current-user");
    return response.data;
  },
  emailVerification: async (userdata) => {
    const response = await axiosInstance.get(`/users/verify-email/${token}`);
    return response.data;
  },
};
export default authService;

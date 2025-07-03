import axiosInstance from "./axios";

const authService = {
  register: async (userdata) => {
    const response = await axiosInstance.post("/users/register", userdata);
    return response.data;
  },
};
export default authService;

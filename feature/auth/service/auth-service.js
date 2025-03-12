/** @format */

import { axiosInstance } from "@/config/axios-config";

export const authLogin = async (body) => {
  try {
    const data = await axiosInstance.post("/auth/login", body);
    if (data.success) {
      localStorage.setItem("token", data.token);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: data.message,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

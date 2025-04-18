/** @format */

import { axiosInstance } from "@/config/axios-config";

export const authLogin = async (body) => {
  try {
    const response = await axiosInstance.post("/auth/login", body);
    const data = response.data;

    if (data.success) {
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
      message: error.response.data.message || error.message,
    };
  }
};

export const authRegister = async (body) => {
  try {
    const response = await axiosInstance.post("/auth/register", body);
    const data = response.data;

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
    console.log("ERR", error.response.data.message);
    return {
      success: false,
      message: error.response.data.message || error.message,
    };
  }
};

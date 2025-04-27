/** @format */

import { axiosInstance } from "@/config/axios-config";

export const authLogin = async (body) => {
  try {
    const response = await axiosInstance.post("/auth/login", body, {
      withCredentials: true,
    });
    const data = response.data;

    if (response.status == 200) {
      return {
        success: true,
        message: data.message,
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
    if (response.status == 201) {
      return {
        success: true,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.log("ERR", error.response);
    return {
      success: false,
      message: error.response.data.message || error.message,
    };
  }
};

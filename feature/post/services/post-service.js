/** @format */

import { axiosInstance } from "@/config/axios-config";
import axios from "axios";

export const getPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");

    const data = response.data;

    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message || error.message,
    };
  }
};

/** @format */

import { axiosInstance } from "@/config/axios-config";

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

export const postPost = async (body) => {
  try {
    const response = await axiosInstance.post("/posts", body);

    //eger formdata problemi yaraandarsa axiosInstanceWithFormData istifadeet

    const data = response.data;

    return data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.response.data.message || error.message,
    };
  }
};

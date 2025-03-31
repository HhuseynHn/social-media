/** @format */

import {
  axiosInstance,
  axiosInstanceWithFormData,
} from "@/config/axios-config";

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
    const response = await axiosInstanceWithFormData.post("/posts", body);

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

export const deletePost = async (postId) => {
  try {
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

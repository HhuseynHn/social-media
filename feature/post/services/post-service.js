/** @format */

import {
  axiosInstance,
  axiosInstanceWithFormData,
} from "@/config/axios-config";

export const getPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");

    const data = response.data;
    console.log("Post_SERVICE-----xxx ");
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

    const data = response.data;

    return data;
  } catch (error) {
    console.log("Post-service postPost error", error);
    return {
      success: false,
      message: error.response.data.message || error.message,
    };
  }
};

export const deletePost = async (postId) => {
  try {
    console.log("servs-ID", postId);
    const response = await axiosInstance.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

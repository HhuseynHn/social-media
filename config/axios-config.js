/** @format */

import axios from "axios";
import { config } from "dotenv";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceWithFormData = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response Interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Your session has expired. Please log in again");
    }
    return Promise.reject(error);
  }
);

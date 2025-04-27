/** @format */

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Replace with your API URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosInstanceWithFormData = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Replace with your API URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Request Interceptor

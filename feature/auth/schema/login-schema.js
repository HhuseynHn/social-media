/** @format */

import * as yup from "yup";

const loginSchema = yup.object().shape({
  userName: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default loginSchema;

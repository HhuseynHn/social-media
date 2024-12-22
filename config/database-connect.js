/** @format */

import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/social-media");
    console.log("Database connection established");
  } catch (err) {
    console.log("Error connecting to Mongo");
  }
};

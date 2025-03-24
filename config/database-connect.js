/** @format */

import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("Database connection established");
  } catch (err) {
    console.log("Error connecting to Mongo");
  }
};

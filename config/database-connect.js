/** @format */

import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hhuseyn573:aOd6nSaaswLaN9oQ@social-media.jgqct.mongodb.net/?retryWrites=true&w=majority&appName=social-media"
    );
    
    console.log("Database connection established");
  } catch (err) {
    console.log("Error connecting to Mongo");
  }
};

/** @format */

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: Number,
      default: 0,
    },
  },
  { collation: { locale: "en_US", strength: 1 } }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;

/** @format */

import mongoose from "mongoose";
const { Schema } = mongoose;

const likesSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    collation: "likes",
    timestamps: true,
  }
);

const likesModel = mongoose.model("Like", likesSchema);
export default likesModel;

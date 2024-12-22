/** @format */

import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
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
    collation: "comment",
    timestamps: true,
  }
);

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;

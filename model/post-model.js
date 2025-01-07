/** @format */

import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
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
  },
  {
    collation: "posts",
    timestamps: true,
  }
);

const postModel = mongoose.postModel.Post || mongoose.postModel("Post", postSchema);
export default postModel;

// const postModel = mongoose.model("Post", postSchema);
// export default postModel;

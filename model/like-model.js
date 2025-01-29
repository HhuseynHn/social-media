/** @format */

import mongoose from "mongoose";
const { Schema } = mongoose;

const likeSchema = new Schema(
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
    collation: { locale: "en_US", strength: 1 },
  }
);

const likeModel = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default likeModel;

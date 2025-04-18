/** @format */

import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { collation: { locale: "en_US", strength: 1 } }
);

const postModel = mongoose.models.Post || mongoose.model("Post", postSchema);
export default postModel;

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
  { collation: { locale: "en_US", strength: 1 } }
);

const postModel = mongoose.models.Post || mongoose.model("Post", postSchema);
export default postModel;



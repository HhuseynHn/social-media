/** @format */

import { dbConnect } from "@/config/database-connect";
import likeModel from "@/model/like-model";
import postModel from "@/model/post-model";
import { NextResponse } from "next/server";
dbConnect();
// Get All likes
export async function GET(request, { params }) {
  const id = (await params).id;

  try {
    const data = await likeModel
      .find({
        post: {
          _id: id,
        },
      })
      .populate({
        path: "user",
        select: "-password -__v -email",
      });

    return NextResponse.json({
      success: true,
      message: "Likes gets successfuly",
      data: data,
    });
  } catch (error) {
    console.log("Error like", error.message);
    return NextResponse.json(
      {
        success: false,
        details: error,
        error: "Error to be happen",
      },
      {
        status: 500,
      }
    );
  }
}

// like created
export async function POST(request, { params }) {
  const postId = (await params).id;
  const existPost = await postModel.findById(postId);
  const user = request.headers.get("user-id");
  if (!existPost) {
    return NextResponse(
      {
        success: false,
        messagge: "Post not found",
      },
      { status: 404 }
    );
  }

  const existLike = await likeModel.findOne({
    post: {
      _id: postId,
    },
    user: {
      _id: user,
    },
  });

  if (existLike) {
    await likeModel.findOneAndDelete(existLike._id);
    return NextResponse.json({
      success: true,
      messagge: "Like to Unlike",
    });
  }

  try {
    const data = await likeModel.create({
      user,
      post: postId,
    });

    return NextResponse.json({
      success: true,
      message: "Like created successfuly",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Error to be happen",
      },
      {
        status: 500,
      }
    );
  }
}

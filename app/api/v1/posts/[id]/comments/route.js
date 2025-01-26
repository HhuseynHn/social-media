/** @format */

import { dbConnect } from "@/config/database-connect";
import commentModel from "@/model/comment-model";
import Comment from "@/model/comment-model";
import postModel from "@/model/post-model";
import { NextResponse } from "next/server";
dbConnect();
// Get All comments
export async function GET(request, { params }) {
  const id = (await params).id;

  try {
    const data = await commentModel
      .find({
        post: {
          _id: id,
        },
      })
      .populate({
        path: "user",
        // // select: "-password -__v -email",
      });

    return NextResponse.json({
      success: true,
      message: "Comments listed successfuly",
      data: data,
    });
  } catch (error) {
    console.log("Error comments", error.message);
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

// comment created
export async function POST(request, { params }) {
  const postId = (await params).id;
  const existPost = await postModel.findById(postId);

  if (!existPost) {
    return NextResponse(
      {
        success: false,
        messagge: "Post not found",
      },
      { status: 404 }
    );
  }

  try {
    const user = request.headers.get("user-id");
    const data = await request.json();
    const savedComment = await commentModel.create({
      ...data,
      user,
      post: postId,
    });

    return NextResponse.json({
      success: true,
      message: "Comment created successfuly",
      data: savedComment,
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

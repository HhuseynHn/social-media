/** @format */
import { dbConnect } from "@/config/database-connect";
import postModel from "@/model/post-model";
import { Types } from "mongoose";

import { NextResponse } from "next/server";
dbConnect();
// Get only one post
export async function GET(request, { params }) {
  const id = (await params).id;
  try {
    const data = await postModel
      .findOne({
        _id: id,
      })
      .populate({
        path: "user",
        select: "-password -__v -email",
      });
    if (!data) {
      return NextResponse.json(
        {
          success: false,
          messagge: "Post not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      messagge: "Fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        details: error,
        error: "Error to be Happen, post cant't fetched",
      },
      { status: 500 }
    );
  }
}

// Delete post
export async function DELETE(request, { params }) {
  const postId = (await params).id;
  console.log("POST__ID", postId);
  const id = new Types.ObjectId(postId);
  console.log("ID", id);
  const user = request.headers.get("user-id");

  try {
    const data = await postModel.findOne({
      _id: id,
      user: {
        _id: user,
      },
    });

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          messagge: "Post not found",
        },
        {
          status: 404,
        }
      );
    }
    await postModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      messagge: "Delete successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        details: error,
        error: "Error to be Happen, post can't deleted",
      },
      { status: 500 }
    );
  }
}

// Update post
export async function PATCH(request, { params }) {
  const id = (await params).id;
  const user = request.headers.get("user-id");
  const body = await request.json();
  console.log("PATCH", body);
  try {
    const data = await postModel.findOne({
      _id: id,
      user: {
        _id: user,
      },
    });

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          messagge: "Post not found",
        },
        {
          status: 404,
        }
      );
    }

    const updateData = await postModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return NextResponse.json({
      success: true,
      messagge: "Update successfully",
      data: updateData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        details: error,
        error: "Error to be Happen, post can't updated",
      },
      { status: 500 }
    );
  }
}

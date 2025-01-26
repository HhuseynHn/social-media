/** @format */

import { dbConnect } from "@/config/database-connect";
import commentModel from "@/model/comment-model";
import { NextResponse } from "next/server";
dbConnect();

// Get only one commet
export async function GET(request, { params }) {
  const id = (await params).id;

  try {
    const data = await commentModel
      .findOne({
        _id: id,
      })
      .populate({
        path: "user",
        select: "title user post",
      });
    if (!data) {
      return NextResponse.json(
        {
          success: false,
          messagge: "Comment not found",
        },
        { status: 404 }
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
        error: "To be happen error",
      },
      { status: 500 }
    );
  }
}

//Delete comment

export async function DELETE(request, { params }) {
  const id = (await params).id;
  const userId = request.headers.get("user-id");
  console.log("user-id=>", userId);
  try {
    const data = await commentModel.findOne({
      _id: id,
      user: {
        _id: userId,
      },
    });

    if (!data) {
      return NextResponse.json({
        success: false,
        messagge: "Comment not found",
      });
    }
    await commentModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Delete successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        details: error,
        error: "To be happen error",
      },
      { status: 500 }
    );
  }
}

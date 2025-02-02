/** @format */
import { dbConnect } from "@/config/database-connect";
import postModel from "@/model/post-model";
import { NextResponse } from "next/server";
dbConnect();

// Get All Posts
export async function GET() {
  try {
    const data = await postModel.find({}).populate([
      {
        path: "user",
        select: "-password -__v -email",
      },
      // {
      //   path: "comments",
      // },
      // {
      //   path: "likes", // Like məlumatlarını gətiririk
      //   populate: {
      //     path: "user",
      //     select: "name", // Yalnız istifadəçi adını göstəririk
      //   },
      // },
    ]);

    return NextResponse.json({
      success: true,
      messagge: "Post listed successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        details: error,
        error: "Error to be Happen",
      },
      { status: 500 }
    );
  }
}

// Create post
export async function POST(request) {
  try {
    const user = request.headers.get("user-id");

    const data = await request.json();
    const savedPost = await postModel.create({ ...data, user });

    return NextResponse.json({
      success: true,
      messagge: "Post created successfully",
      data: savedPost,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Error to be Happen",
      },
      { status: 500 }
    );
  }
}

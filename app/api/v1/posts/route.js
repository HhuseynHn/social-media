/** @format */
import cloudinary from "@/config/cloudinary-config";
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
    const formData = await request.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    let imageUrl = null;

    console.log("_______________________-----");
    console.log(file);
    //If recieve the file from server also to write the cloud for don't send null
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // The Buffer converting to Base64 form send to Cloudinary
      const base64Image = `data:${file.type};base64,${buffer.toString(
        "base64"
      )}`;

      try {
        const uploadResponse = await cloudinary.v2.uploader.upload(
          base64Image,
          {
            folder: "uploads",
          }
        );

        imageUrl = uploadResponse.secure_url;

        console.log(
          "Cloudinary bağlantısı uğurludur:",
          uploadResponse.secure_url
        );
      } catch (error) {
        console.error("Cloudinary bağlantı xətası:", error);
      }
    }

    const savedPost = await postModel.create({
      title,
      imageUrl: imageUrl,
      user,
    });

    return NextResponse.json({
      success: true,
      messagge: "Post created successfully",
      data: savedPost,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Error to be Happen",
      },
      { status: 500 }
    );
  }
}

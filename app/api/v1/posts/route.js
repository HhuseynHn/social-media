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

    //Ger file gelirse ( bunuda clouda yazirig deye null getmesin)
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Buffer-i Base64 formatına çevirərək Cloudinary-yə göndərmək
      const base64Image = `data:${file.type};base64,${buffer.toString(
        "base64"
      )}`;

      // Cloudinary-yə yüklə
      imageUrl = await cloudinary.v2.uploader.upload(base64Image, {
        folder: "uploads",
      });
    }

    const savedPost = await postModel.create({
      title,
      imageUrl: imageUrl.secure_url,
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

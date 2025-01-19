/** @format */
import { dbConnect } from "@/config/database-connect";
import postModel from "@/model/post-model";

import { NextResponse } from "next/server";
dbConnect();
export async function GET(request, { params }) {
  const id = (await params).id;
  try {
    const data = await postModel.findOne({
      _id: id,
    });

    console.log("ID =>", id);
    console.log("DATA", data);
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
        error: "Error to be Happen",
      },
      { status: 500 }
    );
  }
}

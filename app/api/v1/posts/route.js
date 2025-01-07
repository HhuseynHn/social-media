/** @format */

import postModel from "@/model/post-model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await postModel.find({});
  } catch (error) {
    console.log("ERROR: ", error);
  }

  return NextResponse.json({
    success: true,
    messagge: "Hello",
    data: data,
  });
}

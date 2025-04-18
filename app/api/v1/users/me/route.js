/** @format */

import { UserDto } from "@/dtos/user-dto";
import userModel from "@/model/user-model";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
//Get user
export async function GET(request) {
  try {
    const user = request.headers.get("user-id");
    const data = await userModel.findById(new Types.ObjectId(user));

    return NextResponse.json({
      success: true,
      data: new UserDto(data),
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Error to be Happen Users gets",
      },
      { status: 500 }
    );
  }
}

// Delete
export async function DELETE(request) {
  try {
    const user = request.headers.get("user-id");
    const data = await userModel.findByIdAndDelete(new Types.ObjectId(user));

    return NextResponse.json({
      success: true,
      data: new UserDto(data),
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Error to be Happen Users delete",
      },
      { status: 500 }
    );
  }
}

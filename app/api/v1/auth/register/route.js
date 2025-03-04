/** @format */

import { dbConnect } from "@/config/database-connect";
import { NextResponse } from "next/server";
import userModel from "@/model/user-model";
import * as bcrypt from "bcrypt";
dbConnect();
export async function POST(request) {
  try {
    const data = await request.json();
    const find = await userModel.findOne({
      email: data.email,
    });

    if (find) {
      return NextResponse.json(
        {
          success: false,
          message: "This email already available",
        },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const saveUser = await userModel.create({
      ...data,
      password: passwordHash,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User successfully registered",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

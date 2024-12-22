/** @format */

import { dbConnect } from "@/config/database-connect";
import { NextResponse } from "next/server";
import userModel from "@/model/user-model";
import * as bcrypt from "bcrypt";
dbConnect();
export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data.email);

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const saveUser = await userModel.create({
      ...data,
      password: passwordHash,
    });

    return NextResponse.json({
      success: true,
      data: saveUser,
      message: "User successfully registered",
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}

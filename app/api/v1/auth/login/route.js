/** @format */

import { dbConnect } from "@/config/database-connect";
import { NextResponse } from "next/server";
import userModel from "@/model/user-model";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dbConnect();
export async function POST(request) {
  try {
    const data = await request.json();
    const find = await userModel.findOne({
      email: data.email,
    });

    if (!find) {
      return NextResponse.json(
        {
          success: false,
          message: "This email isn't avialable, please register",
        },
        { status: 404 }
      );
    }

    const isMacth = await bcrypt.compare(data.password, find.password);
    if (!isMacth) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is wrong",
        },
        { status: 401 }
      );
    }
    const payload = {
      id: find._id,
      email: find.email,
    };

    const secret = "social_media_secret"; // sign
    const time = {
      expiresIn: "2h",
    };
    const token = jwt.sign(payload, secret, time); // token hazrlyr

    return NextResponse.json(
      {
        success: true,
        message: "User successfully login",
        token,
      },
      { status: 200 }
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

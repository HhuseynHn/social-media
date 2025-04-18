/** @format */

import { dbConnect } from "@/config/database-connect";
import { NextResponse } from "next/server";
import userModel from "@/model/user-model";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Import this helper

dbConnect();

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("DATA =", data);

    const find = await userModel.findOne({ email: data.email });

    if (!find) {
      return NextResponse.json(
        {
          success: false,
          message: "This email isn't available, please register",
        },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(data.password, find.password);
    if (!isMatch) {
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

    const secret = "social_media_secret";
    const time = { expiresIn: "2h" };

    const token = jwt.sign(payload, secret, time);

    // Set the token in cookies
    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 2 * 60 * 60, // 2 hours in seconds
    });

    return NextResponse.json(
      {
        success: true,
        message: "User successfully logged in",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

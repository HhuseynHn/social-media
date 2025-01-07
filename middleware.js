/** @format */

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  runtime: "nodejs",
  matcher: ["/api/v1/hello"],
};

export function middleware(request) {
  const token = request.headers.get("authorization");

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
  console.log("roken", token);
  try {
    const payload = jwt.verify(token, "social_media_secret");
    return NextResponse.next();
  } catch (error) {
    console.log("Mesg: ", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
}
// export const config = {
// };

//only hello

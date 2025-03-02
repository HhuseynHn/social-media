/** @format */

import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
export async function middleware(request) {
  const token = request.headers.get("Authorization");
console.log("TOKEN", token);
  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
  const secret = new TextEncoder().encode("social_media_secret");

  try {
    const { payload } = await jwtVerify(token, secret);

    // Add new header
    const newHeaders = new Headers(request.headers);
    newHeaders.set("user-id", payload.id);

    // To create new request with header
    const modifiedRequest = new Request(request, {
      headers: newHeaders,
    });

    return NextResponse.next({ request: modifiedRequest });
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
//   runtime: "nodejs", // Keep the edge runtime
//   matcher: ["/api/v1/posts*", "/api/v1/posts/:id", "/api/v1/comments"], // id dinamic
// };

export const config = {
  matcher: [
    "/api/v1/posts", // Matches /api/v1/posts
    "/api/v1/posts/:path*", // Matches dynamic routes like /api/v1/posts/something
  ],
};

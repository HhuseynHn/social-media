/** @format */

import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
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

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("Payload - ", payload.id);

    // Yeni başlıq əlavə edin
    const newHeaders = new Headers(request.headers);
    newHeaders.set("user-id", payload.id);

    // Başlıq ilə yeni sorğu yaradın
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
export const config = {
  runtime: "nodejs", // Keep the edge runtime
  matcher: ["/api/v1/hello"],
};
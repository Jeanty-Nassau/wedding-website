import { NextRequest, NextResponse } from "next/server";

import { DEMO_COOKIE_NAME } from "../../../server/demo";

export function GET(request: NextRequest) {
  const destination = request.nextUrl.clone();
  destination.pathname = "/home";
  destination.search = "";
  const response = NextResponse.redirect(destination);

  response.cookies.set(DEMO_COOKIE_NAME, "true", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

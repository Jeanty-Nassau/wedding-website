import { authMiddleware } from "@clerk/nextjs";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const clerkMiddleware = authMiddleware({
  publicRoutes: ["/", "/home", "/rsvp", "/api/demo(.*)", "/api/trpc(.*)"],
});

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  if (process.env.E2E_DEMO_MODE === "true") {
    return NextResponse.next();
  }

  return clerkMiddleware(request, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

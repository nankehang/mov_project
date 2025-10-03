import { NextResponse } from "next/server";

export function middleware(request) {
  // Basic middleware - auth will be checked in page components
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

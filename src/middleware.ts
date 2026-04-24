import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Study-only middleware: narrow `matcher` so the rest of the app is unchanged.
 * Sets headers consumed by `/studies/next-server/middleware` (see that page + README).
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-study-middleware", "1");
  response.headers.set("x-study-path", request.nextUrl.pathname);
  response.headers.set("x-study-search", request.nextUrl.searchParams.toString());
  return response;
}

export const config = {
  // Exact page + optional deeper segments under the same study folder
  matcher: ["/studies/next-server/middleware", "/studies/next-server/middleware/:path*"],
};

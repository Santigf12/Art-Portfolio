import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // don’t interfere with API or Next internals
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  res.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'self' http://localhost:1337;"
  );
  return res;
}

export const config = { matcher: ["/((?!_next).*)"] };
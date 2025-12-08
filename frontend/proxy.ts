// proxy.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const STRAPI_ORIGIN =
  process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL?.replace(/\/$/, "") ||
  "http://localhost:1337";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // don’t interfere with API or Next internals
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  // Allow Strapi admin to iframe this site (Preview)
  // In prod this should be: https://cms.art.fuentes.it.com
  res.headers.set(
    "Content-Security-Policy",
    `frame-ancestors 'self' ${STRAPI_ORIGIN};`
  );

  return res;
}

export const config = { matcher: ["/((?!_next).*)"] };
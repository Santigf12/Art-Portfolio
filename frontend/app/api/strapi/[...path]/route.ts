import type { NextRequest } from "next/server";

const BASE = process.env.STRAPI_INTERNAL_URL || "http://backend:1337";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(req, ctx);
}
export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(req, ctx);
}
export async function PUT(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(req, ctx);
}
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(req, ctx);
}
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return forward(req, ctx);
}

async function forward(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const url = new URL(req.url);

  // forward to Strapi API
  const target = `${BASE}/api/${path.join("/")}${url.search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");

  const res = await fetch(target, {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.arrayBuffer(),
    redirect: "manual",
  });

  return new Response(res.body, { status: res.status, headers: res.headers });
}
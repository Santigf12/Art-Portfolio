// frontend/app/api/exit-preview/route.ts
import { cookies, draftMode } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();

  // extra safety: delete both cookies explicitly
  const c = await cookies();
  c.delete("__prerender_bypass");
  c.delete("__next_preview_data");

  return Response.redirect(new URL("/", request.url), 307);
}
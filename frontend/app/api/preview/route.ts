// frontend/app/api/preview/route.ts
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  const url = searchParams.get("url") || "/";
  const status = searchParams.get("status");

  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const dm = await draftMode();

  if (status === "published") {
    dm.disable();
  } else {
    dm.enable();
  }

  redirect(url);
}
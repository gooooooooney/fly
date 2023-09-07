import { deletePage } from "@/prisma/services/pages/pages-services";
import { z } from "@/lib/zod";
import { NextResponse } from "next/server";
const schema = z.string().nonempty()
export async function GET(request: Request) {
  const pageId = new URL(request.url).searchParams.get("pageId")
  const res =  await deletePage(pageId!)

  if (!schema.safeParse(pageId).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  return NextResponse.json(res)
}
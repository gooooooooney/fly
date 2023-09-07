import { z } from "@/lib/zod";
import { getAllPage } from "@/prisma/services/pages/pages-services";
import { NextResponse } from "next/server";
const schema = z.string().nonempty()
export async function GET(request: Request) {
  const pageId = new URL(request.url).searchParams.get("pageId")
  if (!schema.safeParse(pageId).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const res = await getAllPage(pageId!)
  return NextResponse.json(res)
}
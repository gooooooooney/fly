import { getAllPage } from "@/prisma/services/pages/pages-services";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const pageId = new URL(request.url).searchParams.get("pageId")
  const res = await getAllPage(pageId!)
  return NextResponse.json(res)
}
import { z } from "@/lib/zod";
import { findAncestors, getAllPage, getPageById } from "@/prisma/services/pages/pages-services";
import { NextResponse } from "next/server";


export type MenusResponse = HttpRequestData<ReturnTypePromiseFunc<typeof findAncestors>>
const schema = z.string().nonempty()
export async function GET(request: Request) {

  const pageId = new URL(request.url).searchParams.get("pageId")
  if (!schema.safeParse(pageId).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const res = await findAncestors(pageId!)
  return NextResponse.json({
    head: {},
    body: res
  } as MenusResponse)
}
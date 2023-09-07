import { z } from "@/lib/zod";
import { getAllPage, getPageById } from "@/prisma/services/pages/pages-services";
import { NextResponse } from "next/server";


export type PageResponse = HttpRequestData<ReturnTypePromiseFunc<typeof getPageById>>
const schema = z.string().nonempty()

export async function GET(request: Request) {
  const pageId = new URL(request.url).searchParams.get("pageId")
  if (!schema.safeParse(pageId).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const res = await getPageById(pageId!)
  return NextResponse.json({
    head: {},
    body: res
  } as PageResponse)
}
import { findAncestors, getAllPage, getPageById } from "@/prisma/services/pages/pages-services";
import { NextResponse } from "next/server";


export type PageResponse = HttpRequestData<ReturnTypePromiseFunc<typeof getPageById>>

export async function GET(request: Request) {
  const pageId = new URL(request.url).searchParams.get("pageId")
  const res = await findAncestors(pageId!)
  return NextResponse.json({
    head: {},
    body: res
  } as PageResponse)
}
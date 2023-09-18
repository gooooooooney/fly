import { deletePage, removePage } from "@/prisma/services/pages/pages-services";
import { z } from "@/lib/zod";
import { NextResponse } from "next/server";

export type RemoveResponse = HttpRequestData<ReturnTypePromiseFunc<typeof removePage>>


const schema = z.object({
  pageId: z.string().nonempty(),
  spaceId: z.string()
})

export async function POST(request: Request) {
  const reqData = await request.json()

  if (!schema.safeParse(reqData.head).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const res =  await removePage(reqData.head)

  return  NextResponse.json({
    head: {},
    body: res
  } as RemoveResponse)
}
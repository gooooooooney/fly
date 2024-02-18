import { addNewPage } from "@/prisma/services/pages/pages-services";
import { NextResponse } from "next/server";
import { z } from "@/lib/zod";
import { getUserAuth } from "@/lib/auth/utils";

const schema = z.object({
  head: z.object({
    blockId: z.string().nonempty(),
    spaceId: z.string().nonempty(),
    pageId: z.string().nonempty(),
  })
})

export async function POST(request: Request) {
  const userAuth = await getUserAuth();
  if (!userAuth.session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const { head } = await request.json()
  if (!schema.safeParse({ head }).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const page = await addNewPage({
    blockId: head.blockId!,
    spaceId: head.spaceId!,
    parentId: head.pageId!,
    userId: userAuth.session.user.id,
  })
  if (!page) {
    return NextResponse.json({
      head: {
        
      },
      body: { error: "Something went wrong" }
    })
  }
  return NextResponse.json({
    head: {},
    body: page
  })
}
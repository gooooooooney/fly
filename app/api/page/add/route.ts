import { addNewPage } from "@/prisma/services/pages/pages-services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { z } from "@/lib/zod";

const schema = z.object({
  head: z.object({
    blockId: z.string().nonempty(),
    spaceId: z.string().nonempty(),
    pageId: z.string().nonempty(),
  })
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const { head } = await request.json()
  if (!schema.safeParse({ head }).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const page = addNewPage({
    blockId: head.blockId!,
    spaceId: head.spaceId!,
    parentId: head.pageId!,
    userId: session.user.id,
  })
  return NextResponse.json({
    head: {},
    body: page
  })
}
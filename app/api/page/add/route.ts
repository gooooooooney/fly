import { addNewPage } from "@/prisma/services/pages/pages-services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const { head, body } = await request.json()
  if (!head || !body) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const page = addNewPage({
    blockId: head.blockId!,
    spaceId: head.spaceId!,
    parentId: head.pageId!
  })
  return NextResponse.json({
    head: {},
    body: page
  })
}
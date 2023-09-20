import { z } from "@/lib/zod";
import { getAllPage, getPageById } from "@/prisma/services/pages/pages-services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";


export type PageResponse = HttpRequestData<ReturnTypePromiseFunc<typeof getPageById>> & {body: {isOwner: boolean}}
const schema = z.string().nonempty()

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const pageId = new URL(request.url).searchParams.get("pageId")
  if (!schema.safeParse(pageId).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const res = await getPageById(pageId!)

  const isOwner = res?.sharePage?.ownerUserId === session?.user.id
  return NextResponse.json({
    head: {},
    body: {
      ...res,
      isOwner
    }
  } as PageResponse)
}
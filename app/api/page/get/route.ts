import { getUserAuth } from "@/lib/auth/utils";
import { z } from "@/lib/zod";
import { getAllPage, getPageById } from "@/prisma/services/pages/pages-services";
import { NextResponse } from "next/server";


export type PageResponse = HttpRequestData<ReturnTypePromiseFunc<typeof getPageById>> & {body: {isOwner: boolean}}
const schema = z.string().nonempty()

export async function GET(request: Request) {
  const userAuth = await getUserAuth();
  const pageId = new URL(request.url).searchParams.get("pageId")
  if (!schema.safeParse(pageId).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const res = await getPageById(pageId!)

  if (!res) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const isOwner = res?.sharePage?.ownerUserId === userAuth.session?.user.id
  return NextResponse.json({
    head: {},
    body: {
      ...res,
      isOwner
    }
  } as PageResponse)
}
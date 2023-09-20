import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { z } from "@/lib/zod";
import { setSharePageSetting } from "@/prisma/services/pages/pages-services";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const schema = z.object({
  head: z.object({
    pageId: z.string().nonempty(),
  }),
  body: z.object({
    enabled: z.boolean().optional(),
    permission: z.enum(["READ", "EDIT"]).optional(),
    url: z.string().optional(),
  })
})

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const reqData = await request.json()
  if (!schema.safeParse(reqData).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const res = await setSharePageSetting({
    pageId: reqData.head.pageId,
    userId: session.user.id,
    url: reqData.body.url,
    enabled: reqData.body.enabled,
    permission: reqData.body.permission,
  })
  return NextResponse.json({
    head: {},
    body: res
  })
}
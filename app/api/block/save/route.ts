import { NextResponse } from "next/server";
import { SaveBlocksParams, SaveParams } from "@/types";
import { save, saveBlocks } from "@/prisma/services/pages/pages-services";
import { z } from "@/lib/zod";
import { getUserAuth } from "@/lib/auth/utils";


const schema = z.object({
  head: z.object({
    pageId: z.string().nonempty(),
  }),
  body: z.object({
    operations: z.array(z.object({
      command: z.enum(["insert", "delete", "update"]),
      data: z.array(z.any())
    }))
  })

})           

export async function POST(request: Request) {
  const userAuth = await getUserAuth();
  if (!userAuth.session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const requestBody = await request.json();

  if (!schema.safeParse(requestBody).success) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  // if (!requestBody.head.pageId) {
  //   return new NextResponse("Bad Request", { status: 400 });
  // }
  const res = await save({
    pageId: requestBody.head.pageId,
    operations: requestBody.body.operations,
  })
  if (res) {
    return NextResponse.json({
      head: {},
      body: res
    }, { status: 200 });
  }
  return new NextResponse("Internal Server Error", { status: 500 });
}
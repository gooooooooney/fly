import { NextResponse } from "next/server";
import { saveBlocks } from "@/prisma/services/pages/pages-services";
import { getUserAuth } from "@/lib/auth/utils";


export async function POST(request: Request) {
  const userAuth = await getUserAuth();
  if (!userAuth.session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const requestBody = await request.json();


  if (!requestBody.head.pageId) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  try {
    const count = await saveBlocks({
      pageId: requestBody.head.pageId,
      blocks: requestBody.body.blocks,
    })
    return NextResponse.json({
      head: {},
      body: count
    }, { status: 200 });
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SaveBlocksParams } from "@/types";
import { saveBlocks } from "@/prisma/services/pages/pages-services";


export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
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
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { save } from "@/prisma/services/pages/pages-services";
import { SaveRequestData } from "@/types";


export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const requestBody = await request.json() as HttpRequestData<SaveRequestData>;
  console.log(requestBody)

  if (!requestBody.head.pageId) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  try {
    const count = await save({
      pageId: requestBody.head.pageId,
      command: requestBody.body.operations[0].command,
      block: requestBody.body.operations[0].arg,
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
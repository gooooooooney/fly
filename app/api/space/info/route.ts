import { NextResponse } from "next/server";
import { updateWorkspaceInfo } from "@/prisma/services/workspace/workspcae-services";
import { getUserAuth } from "@/lib/auth/utils";

export async function POST(request: Request) {
  const userAuth = await getUserAuth();
  if (!userAuth.session) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  const requestBody = await request.json();
  try {
    const spaceId = new URL(request.url).searchParams.get("workspaceId")
    const res = await updateWorkspaceInfo({
      workspaceId: spaceId,
      ...requestBody
    })
    
    return NextResponse.json({
      head: {},
      body: res
    })
  } catch (error) {
    return NextResponse.json({
      head: {

      },
      body: { error: "Something went wrong" }
    })
  }
}
import { getRootPageMenus } from "@/prisma/services/pages/pages-services"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const workspaceId = searchParams.get("spaceId")
  const blockId = searchParams.get("blockId")
  
  if (!workspaceId) {
    return new NextResponse("spaceId is required", { status: 400 })
  }
  try {
    const menus = await getRootPageMenus(workspaceId, blockId || "")
    return NextResponse.json({
      head: {},
      body: menus,
    })
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 })
  }
}
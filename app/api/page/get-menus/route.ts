import { getChildrenMenus, getRootPageMenus } from "@/prisma/services/pages/pages-services"
import { NextResponse } from "next/server"



export type ChildrenMenusResponse = HttpRequestData<ReturnTypePromiseFunc<typeof getChildrenMenus>>

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const workspaceId = searchParams.get("workspaceId")
  const pageId = searchParams.get("pageId")
  
  if (!workspaceId) {
    return new NextResponse("workspaceId is required", { status: 400 })
  }
  if (!pageId) {
    return new NextResponse("pageId is required", { status: 400 })
  }
  try {
    const menus = await getChildrenMenus(workspaceId, pageId )
    return NextResponse.json({
      head: {},
      body: menus,
    })
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 })
  }
}
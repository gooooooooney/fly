import { getMenusByRootPageId } from "@/prisma/services/pages/menu.services"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const pageId = new URL(request.url).searchParams.get("pageId")
    const res = await getMenusByRootPageId(pageId!)
    return NextResponse.json(res)
}
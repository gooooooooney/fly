import { deletePage } from "@/prisma/services/pages/pages-services";

export async function GET(request: Request) {
  const pageId = new URL(request.url).searchParams.get("pageId")
  const res =  await deletePage(pageId!)
  return new Response(JSON.stringify(res))
}
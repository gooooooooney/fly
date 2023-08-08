
import { client } from "@/lib/pexles";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const res = await client.photos.search({ query: searchParams.get("query")!, 
  page: +searchParams.get("page")! || 1,
  per_page: +searchParams.get("pageSize")! || 20 })
  return NextResponse.json(res)
}
import { getCollections } from "@/lib/unsplash/getCollections";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const res = await getCollections(searchParams.get("query")!)
  return NextResponse.json(res)

}
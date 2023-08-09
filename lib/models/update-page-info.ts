import { PageInfo, db } from "./db";

export async function UpdatePageInfo(id: string, pageInfo: Partial<PageInfo>) {
  return await db.pageInfo.update(id, pageInfo)
}
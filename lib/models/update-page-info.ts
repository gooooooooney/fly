import { type } from "os";
import { PageInfo, db } from "./db";

type UpdatePageInfo = Partial<Omit<PageInfo, "properties">> | Partial<{
  "properties.icon": PageInfo["properties"]["icon"]
  "properties.title": PageInfo["properties"]["title"]
  "properties.cover": PageInfo["properties"]["cover"]
}>

export async function UpdatePageInfo(id: string, pageInfo: UpdatePageInfo) {
  db.pageInfo.update(id, pageInfo).then(res => {
    // update parent block
    db.transaction("rw", db.pageInfo, async () => {
      const res = await db.pageInfo.get(id)
      if (!res) return
      const parentRes = await db.pageInfo.get(res.parentId)
      if (!parentRes) return
      const parentBlock = parentRes.blocks.find(block => block.id === id) as any
      parentBlock!.props["title"] = res.properties.title || "Untitled"
      parentBlock!.props["icon"] = res.properties.icon || "📄"
      await db.pageInfo.update(res.parentId, {
        blocks: parentRes.blocks
      })
    })
  })
}
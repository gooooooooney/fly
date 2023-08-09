import { useBoundStore } from "@/hooks/store/useBoundStore";
import { db } from "@/lib/models/db";

export async function initDb(id: string) {
  
  const pageInfo = await db.pageInfo.get(id)
  if (!pageInfo) {
    await db.pageInfo.add({
      id,
      title: "Untitled",
      icon: "",
      cover: "",
      editable: true,
      blocks: []
    })
  } else {
    useBoundStore.setState({
      pageId: pageInfo.id,
      title: pageInfo.title,
      icon: pageInfo.icon,
      cover: pageInfo.cover,
      editable: pageInfo.editable,
      blocks: pageInfo.blocks
    })
  }
}
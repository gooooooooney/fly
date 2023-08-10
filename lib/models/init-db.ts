import { useBoundStore } from "@/hooks/store/useBoundStore";
import { db } from "@/lib/models/db";

export async function initDb(id: string) {

  const pageInfo = await db.pageInfo.get(id)
  console.log(id, pageInfo)
  if (!pageInfo) {
    await db.pageInfo.add({
      id,
      parentId: "root",
      properties: {
        title: "",
        icon: "",
        cover: "",
      },
      editable: true,
      blocks: []
    })
    useBoundStore.setState({
      pageId: id,
    })
  } else {
    useBoundStore.setState({
      pageId: id,
      title: pageInfo.properties.title,
      icon: pageInfo.properties.icon,
      cover: pageInfo.properties.cover,
      editable: pageInfo.editable,
      blocks: pageInfo.blocks
    })
  }
}

export async function addPageInfo({id, parentId}:{id: string, parentId?: string}) {
  const pageInfo = await db.pageInfo.get(id)
  if (!pageInfo) {
    await db.pageInfo.add({
      id,
      parentId: parentId || "root",
      properties: {
        title: "",
        icon: "",
        cover: "",
      },
      editable: true,
      blocks: []
    })
  }
}
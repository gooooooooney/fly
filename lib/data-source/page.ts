import { SaveBlocksParams, SaveParams, SavePropertyParams } from "@/types";
import { fetcher } from "../utils";



export function saveBlocks(params: SaveBlocksParams) {
  const { pageId, blocks } = params

  return fetcher("/api/block/saveBlocks", {
    method: "POST",
    body: JSON.stringify({
      head: {
        pageId
      },
      body: {
        blocks,
      }
    })
  })
}

export function save(params: SaveParams) {
  return fetcher("/api/block/save", {
    method: "POST",
    body: JSON.stringify({
      head: {
        pageId: params.pageId
      },
      body: params
    })
  })
}

export async function saveProperty(data: SavePropertyParams) {
  return await fetcher("/api/block/saveProperty", {
    method: "POST",
    body: JSON.stringify({
      head: {
        pageId: data.pageId
      },
      body: data,
    })
  })
}

export function addNewPage({
  blockId,
  spaceId,
  pageId
}: { blockId: string, spaceId: string, pageId: string }) {
  return fetcher("/api/page/add", {
    method: "POST",
    body: JSON.stringify({
      head: {
        blockId,
        spaceId,
        pageId
      },
      body: {}
    })
  })
}
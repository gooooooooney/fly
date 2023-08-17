import { SaveRequestData } from "@/types";
import { fetcher } from "../utils";

interface ClientSaveRequestData extends SaveRequestData {
  pageId: string
}

export function saveData(params: ClientSaveRequestData) {
  const { pageId, operations } = params

  return fetcher("/api/block/save", {
    method: "POST",
    body: JSON.stringify({
      head: {
        pageId
      },
      body: {
        operations,
      } as SaveRequestData
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
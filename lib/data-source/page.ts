import { SaveBlocksParams, SaveParams, SavePropertyParams } from "@/types";
import { fetcher } from "../utils";
import { RemoveResponse } from "@/app/api/page/remove/route";
import { $Enums } from "@prisma/client";



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

export function removePage({
  spaceId,
  pageId
}: { pageId: string, spaceId: string }): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    fetcher("/api/page/remove", {
      method: "POST",
      body: JSON.stringify({
        head: {
          pageId,
          spaceId
        },
        body: {}
      })
    }).then(res => {
      if (res.body) {
        resolve(true)
      } else {
        reject(false)
      }
    }).catch(err => {
      reject(false)
    })
  })
}


export function shareSetting({
  pageId,
  enabled,
  url,
  permission
}: {
  pageId: string,
  enabled?: boolean,
  url?: string,
  permission?: $Enums.Permission
}) {
  return fetcher<{body: boolean}>("/api/page/share/setting", {
    method: "POST",
    body: JSON.stringify({
      head: {
        pageId
      },
      body: {
        enabled,
        url,
        permission
      }
    })
  })
}
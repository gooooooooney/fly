export async function getPageById(pageId: string) {
  const page = prisma?.page.findUnique({
    where: {
      id: pageId
    },
    include: {
      pageInfos: true
    }
  })
  return page
}

export async function getPageMenus(workspaceId: string, blockId?: string) {
  const page = await prisma?.page.findUnique({
    where: {
      id: blockId,
      workspace: {
        id: workspaceId
      },
    },
    include: {
      pageInfos: {
        include: {
          properties: true,
          blocks: true
        }
      }
    },
  })
  return page?.pageInfos.map((pageInfo) => ({
    ...pageInfo,
    hasChildren: pageInfo.blocks.some((block) => block.type === "page")
  }))
}

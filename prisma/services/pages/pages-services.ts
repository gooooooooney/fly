import { SaveBlocksParams, SavePropertyParams } from "@/types"

export async function getPageById(pageId: string) {
  const page = await prisma?.page.findUnique({
    where: {
      id: pageId
    },
    include: {
      properties: true,
      children: true,
      blocks: {
        select: {
          id: true,
          type: true,
          props: true,
          content: true,
          children: true,
        }
      },
    }
  })
  return page
}

export async function getAllPage(pageId: string) {
  return await prisma?.page.findMany({
    where: {
      id: pageId
    },
    include: {
      children: {
        include: {
          properties: true,
        }
      },
      properties: true,
    }
  })
}

export async function getPageMenus(workspaceId: string, blockId?: string) {
  const where: any = {
    workspace: {
      id: workspaceId
    },
  }
  if (blockId) {
    where.id = blockId
  }
  const pages = await prisma?.page.findMany({
    where,
    include: {
      properties: true,
      children: {
        include: {
          properties: true,
        }
      }
    },
  })
  if (!pages) {
    return []
  }

  return pages.map(page => {
    return {
      id: page.id,
      title: page.properties?.title,
      emoji: page.properties?.emoji,
      children: page.children?.map(child => {
        return {
          id: child.id,
          title: child.properties?.title,
          emoji: child.properties?.emoji,
          children: []
        }
      })
    }
  })
}

export async function addNewPage({
  blockId,
  spaceId,
  parentId
}: {
  blockId?: string
  spaceId: string
  parentId?: string
}) {
  try {
    return await prisma?.page.create({
      data: {
        id: blockId,
        parentId,
        workspaceId: spaceId,
        properties: {
          create: {

          },
        },

      }
    })
    // return await prisma?.workspace.update({
    //   where: {
    //     id: spaceId
    //   },
    //   data: {
    //     pages: {
    //       create: {
    //         id: blockId,
    //         parentId,
    //       }
    //     }
    //   }
    // })
  } catch (error) {
    console.log(error)
    return null
  }
}


export async function updateBlockProps({ pageId, data }: SavePropertyParams) {
  // 查询当前页面是否是子页面
  const subPage = await prisma?.block.findUnique({
    where: {
      id: pageId
    },
  })
  if (subPage) {
    const res = await prisma?.block.update({
      where: {
        id: pageId
      },
      data: {
        props: {
          ...subPage.props as any,
          title: data.title,
          emoji: data.emoji,
          cover: data.cover,
        }
      }
    })
  }
}

export async function saveProperty({ pageId, data }: SavePropertyParams) {
  try {
    return await prisma?.$transaction(async tx => {

      updateBlockProps({ pageId, data })
      return await tx.properties.upsert({
        where: {
          pageId: pageId,
        },
        create: {
          pageId: pageId,
          title: data.title,
          emoji: data.emoji,
          cover: data.cover,
        },
        update: {
          title: data.title,
          emoji: data.emoji,
          cover: data.cover,
        }
      })
      // 更新页面属性
      // return await tx.page.upsert({
      //   where: {
      //     id: pageId,
      //   },
      //   create: {

      //   },
      //   update: {
      //     properties: {
      //       update: {
      //         title: data.title,
      //         emoji: data.emoji,
      //         cover: data.cover,
      //       }
      //     }
      //   }
      // })

    })
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function saveBlocks({
  pageId,
  blocks
}: SaveBlocksParams) {


  return prisma?.$transaction(async tx => {

    const ids = blocks.map(b => b.id)
    await tx.block.deleteMany({
      where: {
        pageId,
        id: {
          notIn: ids
        }
      }
    })

    try {
      await Promise.all(blocks.map(async (block) => {
        await tx.block.upsert({
          where: {
            pageId,
            id: block.id
          },
          create: {
            id: block.id,
            type: block.type,
            props: block.props,
            content: block.content,
            children: block.children,
            pageId,
          },
          update: {
            type: block.type,
            props: block.props,
            children: block.children,
            content: block.content,
          }
        })
      }))
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  })
}

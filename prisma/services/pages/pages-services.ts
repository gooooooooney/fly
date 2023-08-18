import { SaveParams } from "@/types"

export async function getPageById(pageId: string) {
  const page = await prisma?.page.findUnique({
    where: {
      id: pageId
    },
    include: {
      properties: true,
      children: true,
      blocks: true,
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
      title: page.properties?.title,
      emoji: page.properties?.emoji,
      children: page.children?.map(child => {
        return {
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
  blockId: string
  spaceId: string
  parentId?: string
}) {
  return await prisma?.page.create({
    data: {
      id: blockId,
      workspaceId: spaceId,
      parentId,
      properties: {
        create: {

        },
      },
    }
  })
}



export async function save({
  pageId,
  operations
}: SaveParams) {


  return prisma?.$transaction(async tx => {
    const saveBlocks = async (blocks: BlockNoteEditor["topLevelBlocks"]) => {
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
    }

    const type = operations.type
    switch (type) {
      case "block":
        return await saveBlocks(operations.arg)
      case "property":
        return await tx.page.upsert({
          where: {
            id: pageId
          },
          create: {
            properties: {
              create: {
                title: operations.arg.title,
                emoji: operations.arg.emoji,
                cover: operations.arg.cover,
              }
            }
          },
          update: {
            properties: {
              update: {
                title: operations.arg.title,
                emoji: operations.arg.emoji,
                cover: operations.arg.cover,

              },

            },
            parent: {
              update: {
                blocks: {
                  update: {
                    where: {
                      id: pageId,
                    },
                    data: {
                      props: {
                        title: operations.arg.title,
                        emoji: operations.arg.emoji,
                        cover: operations.arg.cover,
                      }
                    }
                  }
                }
              }
            }
          }
        })
    }

  })
}

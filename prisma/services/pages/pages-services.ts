import { SaveBlocksParams, SaveParams, SavePropertyParams } from "@/types"
import prisma from "@/lib/prisma"

async function getNestedComments(id: string) {
  const blocks = await prisma.block.findUnique({
    where: { id: id },
    include: { children: true },
  });

  if (!blocks) {
    return null;
  }

  const nestedComment = {
    ...blocks,
    children: [] as typeof blocks['children'],
  };

  for (const childComment of blocks.children) {
    const nestedChild = await getNestedComments(childComment.id);

    nestedChild && nestedComment.children.push(nestedChild);
  }

  return nestedComment;
}


export async function getPageById(pageId: string) {
  const page = await prisma?.page.findUnique({
    where: {
      id: pageId,
    },
    include: {
      properties: true,
      children: true,
      blocks: {
        select: {
          id: true,
          type: true,
          props: true,
          children: true,
          content: true,
          prevBlockId: true,
          nextBlockId: true,
        }
      },
    },
    
  })
  if (!page) return null
  if (!page.blocks) return null
  

  for (const block of page.blocks) {
    const children = await getNestedComments(block.id);
    block.children = children?.children || [];
  }

  

  const dataArray = page.blocks
  // Create a map with IDs as keys for faster access
  const idMap = dataArray.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {} as Record<string, typeof page['blocks'][number]>);

  // Initialize an array to store nodes without incoming edges (prevBlockId === null)
  const startNodes = dataArray.filter(item => item.prevBlockId === null && item.nextBlockId !== null);

  // Perform topological sort
  const sortedArray = [];
  const queue = [...startNodes];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    sortedArray.push(currentNode);

    const nextNodeId = currentNode?.nextBlockId;
    if (nextNodeId && idMap[nextNodeId]) {
      queue.push(idMap[nextNodeId]);
    }
  }
  // console.log(sortedArray)
  return {
    ...page,
    blocks: sortedArray.map(b => ({
      id: b?.id,
      type: b?.type,
      props: b?.props,
      content: b?.content,
      children: b?.children,
    }))
  }
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
    const props = {} as any
    if (data.cover) {
      props["cover"] = data.cover
    }
    if (data.emoji) {
      props["emoji"] = data.emoji
    }
    if (data.title) {
      props["title"] = data.title
    }

    const res = await prisma?.block.update({
      where: {
        id: pageId
      },
      data: {
        props: {
          ...subPage.props as any,
          ...props
        }
      }
    })
  }
}

export async function saveProperty({ pageId, data }: SavePropertyParams) {
  try {
    return await prisma?.$transaction(async tx => {

      await updateBlockProps({ pageId, data })
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
      // await Promise.all(blocks.map(async (block) => {
      //   await tx.block.upsert({
      //     where: {
      //       pageId,
      //       id: block.id
      //     },
      //     create: {
      //       id: block.id,
      //       type: block.type,
      //       props: block.props,
      //       content: block.content,
      //       children: block.children,
      //       pageId,
      //     },
      //     update: {
      //       type: block.type,
      //       props: block.props,
      //       children: block.children,
      //       content: block.content,
      //     }
      //   })
      // }))
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  })
}

export async function save({
  pageId,
  operations,
  parentId
}: SaveParams) {
  return await prisma.$transaction(async tx => {
    try {
      await Promise.all(operations.map(async (operation) => {
        if (operation.command === "delete") {
          await Promise.all(operation.data.map(async (block) => {
           const del = await tx.block.delete({
              where: {
                pageId,
                id: block.id
              },
              include: {
                children: true
              }
            })
            if (del.children.length) {
              console.log(del.children)
              save({
                pageId,
                operations: [{
                  command: operation.command,
                  data: del.children as any,
                }]
              })
            }
          }))
        }
        if (operation.command === "update" || operation.command === "insert") {
          await Promise.all(operation.data.map(async (block) => {
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
                parentId: parentId ? parentId : null,
                prevBlockId: parentId ? undefined : block.prevBlockId,
                nextBlockId: parentId ? undefined : block.nextBlockId,
                pageId,
              },
              update: {
                content: block.content,
                type: block.type,
                parentId: parentId ? parentId : null,
                props: block.props,
                prevBlockId: parentId ? undefined : block.prevBlockId,
                nextBlockId: parentId ? undefined : block.nextBlockId,
              }
            })
            if (block.children.length) {
               save({
                pageId,
                parentId: block.id,
                operations: [{
                  command: operation.command,
                  data: block.children,
                }]
              })
            }
          }))
        }

      }))
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  })
}

import { SaveBlocksParams, SaveParams, SavePropertyParams } from "@/types"
import prisma from "@/lib/prisma"
import { Nullable } from "unsplash-js/dist/helpers/typescript";
import { getPageMenusWithoutPageId, getSortArray } from "../utils";
import { MenuProp } from "@/hooks/store/create-content-slice";
import { sortMenus } from "@/lib/menus";
import { $Enums } from "@prisma/client";



async function getNestedBlocks(id: string) {
  const blocks = await prisma.block.findUnique({
    where: { id: id },
    include: { children: true },
  });

  if (!blocks) {
    return null;
  }

  const nestedBlock = {
    ...blocks,
    children: [] as typeof blocks['children'],
  };

  for (const childBlock of blocks.children) {
    const nestedChild = await getNestedBlocks(childBlock.id);

    nestedChild && nestedBlock.children.push(nestedChild);
  }

  return nestedBlock;
}


export async function getPageById(pageId: string) {
  return await prisma.$transaction(async tx => {
    const page = await tx.page.findUnique({
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
        sharePage: true
      },

    })
    if (!page) return null
    if (!page.blocks) return null


    for (const block of page.blocks) {
      const children = await getNestedBlocks(block.id);
      block.children = children?.children.length ? children.children : block.children;
    }



    // const dataArray = page.blocks
    // // Create a map with IDs as keys for faster access
    // const idMap = dataArray.reduce((map, item) => {
    //   map[item.id] = item;
    //   return map;
    // }, {} as Record<string, typeof page['blocks'][number]>);

    // // Initialize an array to store nodes without incoming edges (prevBlockId === null)
    // const startNodes = dataArray.filter(item => item.prevBlockId === null && item.nextBlockId !== null);

    // // Perform topological sort
    // const sortedArray = [];
    // const queue = [...startNodes];

    // while (queue.length > 0) {
    //   const currentNode = queue.shift();
    //   sortedArray.push(currentNode);

    //   const nextNodeId = currentNode?.nextBlockId;
    //   if (nextNodeId && idMap[nextNodeId]) {
    //     queue.push(idMap[nextNodeId]);
    //   }
    // }
    const sortedArray = getSortArray(page.blocks)
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
  }, {
    maxWait: 5000, // default: 2000
    timeout: 20000, // default: 5000
  })
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


export async function getChildrenMenus(spaceId: string, pageId: string) {
  const page = await prisma?.page.findUnique({
    where: {
      id: pageId,
      workspaceId: spaceId,
    },
    include: {
      children: {
        include: {
          properties: true,
          children: {
            include: {
              properties: true,
            }
          }
        }
      },
      blocks: {
        where: {
          type: "page"
        }
      },
      properties: true,
    }
  })
  if (!page) {
    return []
  }
  page.children = sortMenus(page.children, page.blocks.map(b => b.id))
  return getPageMenusWithoutPageId(page.children)

}

export async function getRootPageMenus(workspaceId: string, blockId?: string) {

  const where: NonNullable<Parameters<typeof prisma["page"]["findMany"]>[number]>["where"] = {
    workspace: {
      id: workspaceId,
    },
    parentId: null,
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
  parentId,
  userId
}: {
  blockId?: string
  spaceId: string
  parentId?: string
  userId: string
}) {
  try {
    return await prisma.$transaction(async tx => {
      const user = await tx.user.findUniqueOrThrow({
        where: {
          id: userId,
        }
      })

      const page = await tx?.page.create({
        data: {
          id: blockId,
          parentId,
          workspaceId: spaceId,
          properties: {
            create: {

            },
          },
          sharePage: {
            create: {
              ownerUserId: user.id
            }
          }

        }
      })
      return page
    }, {
      maxWait: 5000, // default: 2000
      timeout: 20000, // default: 5000
    })
  } catch (error) {
    return null
  }
}




export async function saveProperty({ pageId, data }: SavePropertyParams) {
  try {
    return await prisma?.$transaction(async tx => {

      // 查询当前页面是否是子页面
      const subPage = await tx?.block.findUnique({
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
        if (data.editable) {
          props["editable"] = data.editable
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

      return await tx.properties.upsert({
        where: {
          pageId: pageId,
        },
        create: {
          pageId: pageId,
          title: data.title,
          emoji: data.emoji,
          cover: data.cover,
          editable: data.editable,
          pageWidth: data.pageWidth,
        },
        update: {
          title: data.title,
          emoji: data.emoji,
          cover: data.cover,
          editable: data.editable,
          pageWidth: data.pageWidth,
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

export async function deletePage(pageId: string) {
  try {

    return await prisma?.page.delete({
      where: {
        id: pageId
      },
    })
  } catch (error) {
    console.log(error)
    return null
  }
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
            if (block.type === "page") {
              deletePage(block.id)
            }
            const del = await tx.block.delete({
              where: {
                pageId,
                id: block.id
              },
              include: {
                children: true
              }
            })
            // if (del.children.length) {
            //   save({
            //     pageId,
            //     operations: [{
            //       command: operation.command,
            //       data: del.children as any,
            //     }]
            //   })
            // }
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
                prevBlockId: parentId ? undefined : block.prevBlockId ? block.prevBlockId : null,
                nextBlockId: parentId ? undefined : block.nextBlockId ? block.nextBlockId : null,
                pageId,
              },
              update: {
                content: block.content,
                type: block.type,
                parentId: parentId ? parentId : null,
                props: block.type === "page" ? undefined : block.props,
                // when block.prevBlockId is null, it means the block is the first block
                // so we need to set prevBlockId to null
                prevBlockId: parentId ? undefined : block.prevBlockId ? block.prevBlockId : null,
                nextBlockId: parentId ? undefined : block.nextBlockId ? block.nextBlockId : null,
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

export async function removePage({ pageId, spaceId }: { pageId: string, spaceId: string }) {
  return await prisma.$transaction(async tx => {
    try {
      const block = await tx.block.findUnique({ where: { id: pageId } })
      await deletePage(pageId)
      if (block) {
        const pre = block.prevBlockId
        const next = block.nextBlockId
        // update prev and next block
        if (pre) {
          await tx.block.update({
            where: {
              id: pre
            },
            data: {
              nextBlockId: next
            }
          })
        }
        if (next) {
          await tx.block.update({
            where: {
              id: next
            },
            data: {
              prevBlockId: pre
            }
          })
        }
        await tx.block.delete({
          where: {
            id: block.id
          },
          include: {
            children: true
          }
        })
      }
      return true
    } catch (error) {
      return false
    }

  })

}

export async function setSharePageSetting({
  pageId,
  enabled,
  userId,
  permission,
  url,
}: {
  pageId: string
  enabled?: boolean
  userId: string
  permission?: $Enums.Permission
  url?: string,
}) {
  return await prisma.$transaction(async tx => {
    try {
      await tx.sharePage.update({
        where: {
          pageId,
          ownerUserId: userId,
        },
        data: {
          enabled,
          url,
          permission
        }
      })
      return true
    } catch (error) {
      return false
    }
  })
}

export async function getSharePageSetting({
  pageId,
  // userId,
}: {
  pageId: string
  // userId: string
}) {
  return prisma.sharePage.findUnique({
    where: {
      pageId,
      // ownerUserId: userId,
    }
  })
}






export async function findAncestors(nodeId: string, tree: any[] = []): Promise<MenuProp[]> {
  const node = await prisma.page.findUnique({ where: { id: nodeId }, include: { properties: true } });

  if (!node) {
    return tree;
  }

  const currentNode: MenuProp = {
    id: node.id,
    title: node.properties?.title ?? "",
    icon: node.properties?.emoji ?? "",
    hasChildren: await prisma.page.count({
      where: {
        parentId: node.id,
      }
    }) > 0,
    isActive: false,
    children: tree,
  };

  if (node.parentId !== null) {
    return findAncestors(node.parentId, [currentNode]);
  }

  return [currentNode];
}
import { SaveParams } from "@/types"

export async function getPageById(pageId: string) {
  const page = prisma?.page.findUnique({
    where: {
      id: pageId
    },
    include: {
      properties: true
    }
  })
  return page
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
      blocks: {
        include: {
          page: {
            include: {
              properties: true
            }
          }
        }
      },
    },
  })
  if (!pages) {
    return []
  }

  return pages.map((page) => ({
    ...page.properties,
    children: page.blocks!.filter((block) => block.type === "page").map(b => {
      return {
        ...b.page.properties,
        children: [] as any[]
      }
    })
  }))
}


export async function deleteBlocks() {
  await prisma?.block.deleteMany
}



export async function save({
  pageId,
  block,
  command,
}: SaveParams) {

  return prisma?.$transaction(async tx => {

    switch (command) {
      case "create":
        return await tx.block.create({
          data: {
            id: block.id,
            type: block.type,
            props: JSON.stringify(block.props),
            content: JSON.stringify(block.content),
            pageId,
          }
        })
      case "update":
        return await tx.block.update({
          where: {
            pageId,
            id: block.id
          },
          data: {
            type: block.type,
            props: JSON.stringify(block.props),
            content: JSON.stringify(block.content),
          }
        })
      case "delete":
        return await tx.block.delete({
          where: {
            pageId,
            id: block.id
          }
        })
    }

  })
  // await prisma?.page.upsert({
  //   where: {
  //     id: pageId,
  //     workspaceId: "ckq6q6q6q0000q6q6q6q6q6q6"
  //   },
  //   create: {
  //     // workspace: {},
  //     blocks: {
  //       createMany: {
  //         data: data.map(b => ({
  //           id: b.id,
  //           type: b.type,
  //           props: JSON.stringify(b.props),
  //           content: JSON.stringify(b.content),
  //         }))
  //       }
  //     },
  //   },
  //   update: {
  //     blocks: {
  //       updateMany: data.map(b => {
  //         return {
  //           where: {
  //             id: b.id,
  //           },
  //           data: {
  //             type: b.type,
  //             props: JSON.stringify(b.props),
  //             content: JSON.stringify(b.content),
  //           }
  //         }
  //       })
  //     }
  //   }
  // })
}


import { MenuProp } from "@/hooks/store/create-content-slice"
import prisma from "@/lib/prisma"
import { getPageMenus, getSortArray } from "../utils"
import { sortMenus } from "@/lib/menus"

export type WorkspaceInfo = ReturnTypePromiseFunc<typeof getWorkspacesByUserId>

export async function getWorkspacesByUserId(userId: string) {
 try {
  const user = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      workspaces: {
        include: {
          pages: {}
        }
      }
    }
  })
  return user?.workspaces || []
 } catch (error) {
  return []
 }
}


export async function getWorkspaces(userId: string, pageId: string) {
  return await prisma?.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: {
        externalUserId: userId,
      },
      include: {
        workspaces: {
          include: {
            pages: {
              where: {
                // parent equals null means it's a root page
                parent: null,
              },
              select: {
                id: true,
                children: {
                  select: {
                    id: true,
                    properties: true,
                  }
                },
                blocks: {
                  where: {
                    type: "page"
                  }
                },
                properties: true,
              }
            }
          }
        }
      }
    })
    if (!user?.workspaces) {
      return {
        activeWorkspace: null,
        workspaces: [],
      }
    }
    const workspaces = await Promise.all(user.workspaces.map(async workspace => {
      workspace.pages = workspace.pages.map(page => {
        return {
          ...page,
          // 根据block对page进行排序
          children: sortMenus(page.children, getSortArray(page.blocks).filter(item => item.type === "page").map(item => item.id)),
        }
      })
      return {
        ...workspace,
        pages: await getPageMenus(workspace.pages, pageId)
      }
    }))
  
    return {
      activeWorkspace: workspaces.find(space => space.isActive)!,
      workspaces,
    }
  }, {
    maxWait: 5000, // default: 2000
    timeout: 20000, // default: 5000
  })
}



export async function getWorkspaceById(workspaceId: string) {
  const workspace = await prisma?.workspace.findUnique({
    where: {
      id: workspaceId,
    },

  })
  return workspace
}

export async function updateWorkspaceInfo(params: {
  name?: string,
  avatar?: string,
  workspaceId: string
}) {
  return await prisma?.workspace.update({
    where: {
      id: params.workspaceId,
    },
    data: {
      name: params.name,
      avatar: params.avatar,
    }
  })

}


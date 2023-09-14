
import { MenuProp } from "@/hooks/store/create-content-slice"
import prisma from "@/lib/prisma"
import { getPageMenus } from "../utils"
import { sortMenus } from "@/lib/menus"

export type WorkspaceInfo = ReturnTypePromiseFunc<typeof getWorkspacesByUserId>

export async function getWorkspacesByUserId(userId: string) {
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
  if (!user?.workspaces) {
    return []
  }
  return user.workspaces
}


export async function getWorkspaces(userId: string, pageId: string) {
  const user = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      workspaces: {
        include: {
          pages: {
            where: {
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
        children: sortMenus(page.children, page.blocks.map(v => v.id))
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
}

export async function getWorkspaceById(workspaceId: string) {
  const workspace = await prisma?.workspace.findUnique({
    where: {
      id: workspaceId,
    },

  })
  return workspace
}


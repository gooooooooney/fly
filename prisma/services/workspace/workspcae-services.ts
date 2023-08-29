
import { MenuProp } from "@/hooks/store/create-content-slice"
import prisma from "@/lib/prisma"
import { getPageMenus } from "../utils"

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


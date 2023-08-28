
import { MenuProp } from "@/hooks/store/create-content-slice"
import prisma from "@/lib/prisma"

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

type Page = {
  properties: {
    pageId: string;
    id: string;
    cover: string;
    title: string;
    emoji: string;
    editable: boolean;
  } | null;
  id: string;
  children: Page[]
}

function getPageMenus(list: any[], pageId: string): MenuProp[] {
  return list.map(item => {
    return {
      id: item.id,
      title: item.properties?.title ?? "",
      icon: item.properties?.emoji ?? "",
      isActive: item.id === pageId,
      children: item.children && item.children.length ? getPageMenus(item.children, pageId) : [],
    }
  })

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
  const workspaces = user.workspaces.map(workspace => {
    return {
      ...workspace,
      pages: getPageMenus(workspace.pages, pageId)
    }
  })

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


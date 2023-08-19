

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

export async function getWorkspaceById(workspaceId: string) {
  const workspace = await prisma?.workspace.findUnique({
    where: {
      id: workspaceId,
      
    },
    
  })
  return workspace
}


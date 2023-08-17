export async function getWorkspacesByUserId(userId: string) {
  const user = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      workspaces: {
        include: {
          pages: {
            include: {
              properties: true
            }
          }
        }
      }
    }
  })
  if (!user?.workspaces) {
    return []
  }
  return user.workspaces
}



export async function getPageById(pageId: string) {
  const page = prisma?.page.findUnique({
    where: {
      id: pageId
    }
  })
  
  return page
}

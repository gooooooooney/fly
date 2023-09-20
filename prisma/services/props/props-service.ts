import prisma from "@/lib/prisma"

export function getPropsByPageId(pageId: string) {
  return prisma.properties.findUnique({
    where: { pageId },
    select: {
      title: true,
      editable: true,
      emoji: true,
      cover: true,
      pageWidth: true,
    }
  })
}
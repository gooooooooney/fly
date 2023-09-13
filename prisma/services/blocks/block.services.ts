import prisma from "@/lib/prisma"

export async function getBlockPages(pageId: string) {
    const item = await prisma.block.findMany({
        where: {
            pageId,
            type: "page"
        },
        include: {
            children: {
                where: {
                    type: "page"
                }
            }
        }
    })
}
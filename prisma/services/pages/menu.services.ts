import prisma from "@/lib/prisma"
import { getSortArray } from "../utils"

export async function getMenusByRootPageId(rootPageId: string) {
    return await prisma.$transaction(async (tx) => {
        const page = await tx.page.findUnique({
            where: {
                id: rootPageId,
                parent: null,
            },
            select: {
                blocks: true
            }
        })
        if (!page) return []
        const sortedArray = getSortArray(page.blocks)
        return sortedArray.filter(item => item.type === "page") as typeof page["blocks"]
    })
}
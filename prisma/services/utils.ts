import { MenuProp } from "@/hooks/store/create-content-slice"
import prisma from "@/lib/prisma"

export async function getPageMenusWithoutPageId(list: any[]): Promise<MenuProp[]> {
  const menuProps = await Promise.all(list.map(async item => {
    return {
      id: item.id,
      title: item.properties?.title ?? "",
      icon: item.properties?.emoji ?? "",
      hasChildren: await prisma.page.count({
        where: {
          parentId: item.id,
        }
      }) > 0,
      isActive: false,
      children: item.children && item.children.length ? await getPageMenusWithoutPageId(item.children) : [],
    }
  }))
  return menuProps
}

export async function getPageMenus(list: any[], pageId: string): Promise<MenuProp[]> {
  const menuProps = await Promise.all(list.map(async item => {
    return {
      id: item.id,
      title: item.properties?.title ?? "",
      icon: item.properties?.emoji ?? "",
      hasChildren: await prisma.page.count({
        where: {
          parentId: item.id,
        }
      }) > 0,
      isActive: item.id === pageId,
      children: item.children && item.children.length ? await getPageMenus(item.children, pageId) : [],
    }
  }))
  return menuProps
}
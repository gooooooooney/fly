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

export function getSortArray(blocks: any[]) {
  const dataArray = blocks
  // Create a map with IDs as keys for faster access
  const idMap = dataArray.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {} as Record<string, any>);
  const startNodes = dataArray.filter(item => item.prevBlockId === null && item.nextBlockId !== null);

  // Perform topological sort
  const sortedArray = [];
  const queue = [...startNodes];

  while (queue.length > 0) {
    const currentNode = queue.shift();
    sortedArray.push(currentNode);

    const nextNodeId = currentNode?.nextBlockId;
    if (nextNodeId && idMap[nextNodeId]) {
      queue.push(idMap[nextNodeId]);
    }
  }
  return sortedArray
}
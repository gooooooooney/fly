import { ChildrenMenusResponse } from "@/app/api/page/get-menus/route";
import { fetcher } from "../utils";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { MenusResponse } from "@/app/api/page/findAncestors/route";

export async function getChildrenMenus(pageId: string) {
    try {
      const res = await fetcher(`/api/page/get-menus?workspaceId=${useBoundStore.getState().workspaceId}&pageId=${pageId}`) as ChildrenMenusResponse;
      return res.body
    } catch (error) {
      console.log(error)
      return []
    }
}

export async function findCurrentPagePath(pageId: string) {
  try {
    const res = await fetcher(`/api/page/findAncestors?pageId=${pageId}`) as MenusResponse;
    return res.body
  } catch (error) {
    console.log(error)
    return []
  }
}
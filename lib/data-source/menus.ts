import { ChildrenMenusResponse } from "@/app/api/page/get-menus/route";
import { fetcher } from "../utils";
import { useBoundStore } from "@/hooks/store/useBoundStore";

export async function getChildrenMenus(pageId: string) {
    try {
      const res = await fetcher(`/api/page/get-menus?workspaceId=${useBoundStore.getState().workspaceId}&pageId=${pageId}`) as ChildrenMenusResponse;
      return res.body
    } catch (error) {
      console.log(error)
      return []
    }
}
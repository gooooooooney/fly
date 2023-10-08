import { AddSpaceResponse, SpaceResponse } from "@/app/api/space/route";
import { fetcher } from "../utils";
import { useBoundStore } from "@/hooks/store/useBoundStore";

export async function getSpaceInfo() {
  try {
    const  res =  await fetcher(`/api/space?pageId=${location.pathname.split("/")[1]}`) as SpaceResponse
    return res.body
  } catch (error) {
    console.log(error)
  }

}

export function getRootMenus(spaceId: string) {
  return fetcher(`/api/page/root-menus?spaceId=${spaceId}`)
}

export const addSpace = (url: string, {arg}: {arg: {avatar: string, name?: string}}) => {
  return fetcher<AddSpaceResponse>(url, {
    method: "POST",
    body: JSON.stringify(arg)
  })
}

export const updateSpaceInfo = (url:string, {arg}: {arg:{avatar?: string, name?: string}}) => {
  const spaceId = useBoundStore.getState().workspaceId
  return fetcher(`/api/space/info?workspaceId=${spaceId}`, {
    method: "POST",
    body: JSON.stringify(arg)
  })

}
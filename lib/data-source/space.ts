import { SpaceResponse } from "@/app/api/space/route";
import { fetcher } from "../utils";

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
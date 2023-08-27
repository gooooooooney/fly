import { fetcher } from "../utils";

export function getSpaceInfo(spaceId: string) {
  return fetcher(`/api/space/get?spaceId=${spaceId}`)
}

export function getRootMenus(spaceId: string) {
  return fetcher(`/api/page/root-menus?spaceId=${spaceId}`)
}
import { fetcher } from "../utils";

export function getSpaceInfo(spaceId: string) {
  return fetcher(`/api/space/get?spaceId=${spaceId}`)
}
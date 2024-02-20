import { SpaceResponse } from "@/app/api/space/route";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export async function getSpaceInfo(url: string) {
  return await fetcher(url+ `?pageId=${location.pathname.split("/")[2]}`) as SpaceResponse
}
export function useSpace() {


  const res = useSWR("/api/space", getSpaceInfo);

  return res
} 
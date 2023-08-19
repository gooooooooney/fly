import { GetSpaceResponse } from "@/app/api/space/route";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export async function getSpaceInfo(spaceId: string) {
    return await fetcher(`/api/space/get?spaceId=${spaceId}`) as GetSpaceResponse
  }
export function useSpace(spaceId: string) {

    
  return useSWR(spaceId ? () => "/api/space/get?spaceId=" + spaceId : null, getSpaceInfo);
} // Compare this snippet from lib/data-source/workspace.ts:
import { SpaceResponse } from "@/app/api/space/route";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export async function getSpaceInfo(url: string) {
  return await fetcher(url) as SpaceResponse
}
export function useSpace() {

  const res = useSWR("/api/space", getSpaceInfo);
  if (!res.data) {
    return {
      spaces: null,
      isLoading: true,
      swrData: res,
    }
  }
  return {
    spaces: res.data.body,
    isLoading: false,
    swrData: res,
  }
} 
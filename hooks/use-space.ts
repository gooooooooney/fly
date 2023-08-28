import { SpaceResponse } from "@/app/api/space/route";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { useStore } from "zustand";
import { useBoundStore } from "./store/useBoundStore";
import { useEffect } from "react";

export async function getSpaceInfo(url: string) {
  return await fetcher(url+ `?pageId=${location.pathname.split("/")[1]}`) as SpaceResponse
}
export function useSpace() {
  const [items, setItems] = useStore(useBoundStore, (state) => [
    state.menus,
    state.setMenus,
  ])!;

  const res = useSWR("/api/space", getSpaceInfo);
  useEffect(() => {
    if (res.data) {
      console.log(res.data)
      setItems(res.data.body.activeWorkspace?.pages ?? []);
    }
  }, [res.data?.body.activeWorkspace?.pages])
  return res
} 
import { PageResponse } from "@/app/api/page/get/route"
import { fetcher } from "@/lib/utils"
import { usePathname } from "next/navigation"
import useSWR from "swr"
import { useBoundStore } from "./store/useBoundStore"
import useStore from "./use-store"
import { useEffect } from "react"


export const init = async (url: string) => {
  return await fetcher(url) as PageResponse
}


export function usePageInit() {
  // const id = usePathname().split("/").pop()
  const pageId = useStore(useBoundStore, s => s.pageId)
  return useSWR(() => "/api/page/get?pageId="+pageId, init)

}

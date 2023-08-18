import { PageResponse } from "@/app/api/page/get/route"
import { fetcher } from "@/lib/utils"
import { usePathname, useSearchParams } from "next/navigation"
import useSWR from "swr"


const init = async (url: string, id: string) => {
  return await fetcher(url + id) as PageResponse
}


export function usePageInit() {
  const id = usePathname().split("/").pop()
  return useSWR(id ? ["/api/page/get?pageId=", id] : null, ([url, id]) => init(url, id))
}

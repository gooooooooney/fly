import { PageResponse } from "@/app/api/page/get/route"
import { fetcher } from "@/lib/utils"
import { usePathname } from "next/navigation"
import useSWR from "swr"
import { useUuidPathname } from "./useUuidPathname"
import { useEffect, useRef } from "react"


export const init = async (url: string) => {
  return await fetcher(url) as PageResponse
}


export function usePageInit() {
  const id = usePathname().split("/").pop()
  useUuidPathname()
    
  const res = useSWR(id ? () => "/api/page/get?pageId="+id : null, init, {
    revalidateOnFocus: false,
  })


  return res

}

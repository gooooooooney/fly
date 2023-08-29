import { PageResponse } from "@/app/api/page/get/route"
import { fetcher } from "@/lib/utils"
import useSWR from "swr"
import { useUuidPathname } from "./useUuidPathname"


export const init = async (url: string) => {
  return await fetcher(url) as PageResponse
}


export function usePageInit() {
  const id = useUuidPathname()
  
    
  const res = useSWR(id ? () => "/api/page/get?pageId="+id : null, init, {
    revalidateOnFocus: false,
  })


  return res

}

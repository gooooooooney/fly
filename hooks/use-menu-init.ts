import { fetcher } from "@/lib/utils"
import useSWR from "swr"
import { useUuidPathname } from "./useUuidPathname"
import { MenusResponse } from "@/app/api/page/findAncestors/route"
import { useBoundStore } from "./store/useBoundStore"
import { useEffect } from "react"


export const initMenus = async (url: string) => {
  return await fetcher(url) as MenusResponse
}


export function useMenusInit() {
  const id = useUuidPathname()
  
    
  const res = useSWR(id ? () => "/api/page/findAncestors?pageId="+id : null, initMenus)
  useEffect(() => {
    if (res.data) {
        useBoundStore.setState({
            menus: res.data.body,
        })
      }
  }, [res.data])


  return res

}

import { PageResponse } from "@/app/api/page/get/route"
import { fetcher } from "@/lib/utils"
import useSWR from "swr"
import { useUuidPathname } from "./useUuidPathname"
import { useEffect } from "react"
import { setPageId } from "./store/create-content-slice"


export const init = async (url: string) => {
  const data = await fetcher(url) as PageResponse
  const getEditable = () => {
    if (data.body.isOwner) {
      return !!data.body?.properties?.editable
    }
    if (data.body.sharePage?.enabled && data.body.sharePage?.permission === "EDIT") {
      return true
    }
    return false
  }
  return {
    blocks: (data?.body?.blocks as any) || [],
    editable: getEditable(),
    pageWidth: data.body?.properties?.pageWidth || "default",
    icon: data.body?.properties?.emoji || "",
    cover: data.body?.properties?.cover || "",
    title: data.body?.properties?.title || "",
    workspaceId: data.body?.workspaceId || "",
    isOwner: data.body.isOwner,
    shareSetting: data.body.sharePage
  }
}


export function usePageInit() {
  const id = useUuidPathname()
  useEffect(() => {
    setPageId(id);
  }, [id]);

  const res = useSWR(id ? () => "/api/page/get?pageId=" + id : null, init, {
    revalidateOnFocus: false,
  })


  return res

}

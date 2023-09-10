import { PageWidth } from "@/types"
import { StateCreator } from "zustand"
import { useBoundStore } from "./useBoundStore"

export interface LayoutSlice {
  collapsed: boolean
  pageWidth: PageWidth


  workspaceId: string
}
export const createLayoutSlice: StateCreator<
  LayoutSlice,
  [],
  [],
  LayoutSlice
> = (set) => ({
  pageWidth: "default",
  workspaceId: "",
  collapsed: false,
})

export const setPageWidth = (pageWidth: PageWidth) => useBoundStore.setState(s => {
  s.pageWidth = pageWidth
})
export const setCollapsed = (bol: boolean) => useBoundStore.setState(s => {
  s.collapsed = bol
}
)
export const setWorkspaceId = (workspaceId: string) => useBoundStore.setState(s => {
  s.workspaceId = workspaceId
}
)

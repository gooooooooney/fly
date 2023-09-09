import { PageWidth } from "@/types"
import { StateCreator } from "zustand"

export interface LayoutSlice {
  collapsed: boolean
  pageWidth: PageWidth
  setPageWidth: (pageWidth: PageWidth) => void
  setCollapsed: (bol: boolean) => void
  workspaceId: string
  setWorkspaceId: (workspaceId: string) => void
}
export const createLayoutSlice: StateCreator<
  LayoutSlice,
  [],
  [],
  LayoutSlice
  > = (set) => ({
    pageWidth: "default",
    setPageWidth: (pageWidth) => set((state) => ({ ...state,  pageWidth })),
    workspaceId: "",
    setWorkspaceId: (workspaceId) => set((state) => ({ ...state,  workspaceId })),
    collapsed: false,
    setCollapsed: (bol: boolean) => set((state) => ({ ...state,  collapsed: bol })),
  })

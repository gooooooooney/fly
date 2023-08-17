import { StateCreator } from "zustand"

export interface LayoutSlice {
  collapsed: boolean
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
    workspaceId: "",
    setWorkspaceId: (workspaceId) => set((state) => ({ ...state, workspaceId })),
    collapsed: false,
    setCollapsed: (bol: boolean) => set((state) => ({ ...state, collapsed: bol })),
  })

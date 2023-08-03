import { StateCreator } from "zustand"

export interface LayoutSlice {
  collapsed: boolean
  setCollapsed: (bol: boolean) => void
}
export const createLayoutSlice: StateCreator<
  LayoutSlice,
  [],
  [],
  LayoutSlice
  > = (set) => ({
    collapsed: false,
    setCollapsed: (bol: boolean) => set((state) => ({ ...state, collapsed: bol })),
  })

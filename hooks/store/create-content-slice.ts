import { StateCreator } from "zustand"

export interface ContentSlice {
  icon: string
  title: string
  cover: string
  editable: boolean
  setEditable: (editable: boolean) => void
  setCover: (cover: string) => void
  setTitle: (title: string) => void
  setIcon: (icon: string) => void
}
export const createContentSlice: StateCreator<
  ContentSlice,
  [],
  [],
  ContentSlice
  > = (set) => ({
    icon: "",
    title: "",
    cover: "",
    editable: true,
    setEditable: (editable) => set((state) => ({ ...state, editable })),
    setCover: (cover) => set((state) => ({ ...state, cover })),
    setTitle: (title) => set((state) => ({ ...state, title })),
    setIcon: (icon) => set((state) => ({ ...state, icon })),
  })

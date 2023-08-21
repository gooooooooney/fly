import { StateCreator } from "zustand"
import _ from "lodash"
import { saveProperty } from "@/lib/data-source/page"



export interface ContentSlice {
  pageId: string
  icon: string
  title: string
  cover: string
  editable: boolean
  blocks: BlockNoteEditor['topLevelBlocks']
  setEditable: (editable: boolean) => void
  setCover: (cover: string) => void
  setTitle: (title: string) => void
  setIcon: (icon: string) => void
  setPageId: (pageId: string) => void
}
export const createContentSlice: StateCreator<
  ContentSlice,
  [],
  [],
  ContentSlice
> = (set) => {
  return ({
    blocks: [],
    pageId: "",
    icon: "",
    title: "",
    cover: "",
    editable: true,
    setPageId: (pageId) => set((state) => ({ ...state, pageId })),
    setEditable: (editable) => set((state) => {
      return ({ ...state, editable })
    }),
    setCover: (cover) => set((state) => {
      return ({ ...state, cover })
    }),
    setTitle: (title) => set((state) => {
      return ({ ...state, title })
    }),
    setIcon: (icon) => set((state) => {
      return ({ ...state, icon })
    }),
  })
}

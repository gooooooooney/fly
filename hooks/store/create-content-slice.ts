import { StateCreator } from "zustand"
import _ from "lodash"
import { BlockNoteEditor } from "@blocknote/core"
import { UpdatePageInfo } from "@/lib/models/update-page-info"

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
> =  (set) => {
  return ({
    blocks: [],
    pageId: "",
    icon: "",
    title: "",
    cover: "",
    editable: true,
    setPageId: (pageId) => set((state) => ({ ...state, pageId })),
    setEditable: (editable) => set((state) => {
      
      UpdatePageInfo(state.pageId, { editable })
      return ({ ...state, editable })
    }),
    setCover: (cover) => set((state) => {
      UpdatePageInfo(state.pageId, { cover })
      return ({ ...state, cover })
    }),
    setTitle: (title) => set((state) => {
      _.debounce(() => {
        UpdatePageInfo(state.pageId, { title })
      }, 1000)()
      return ({ ...state, title })
    }),
    setIcon: (icon) => set((state) => {
      UpdatePageInfo(state.pageId, { icon })

      return ({ ...state, icon })
    }),
  })
}

import { StateCreator } from "zustand"
import _ from "lodash"
import { UpdatePageInfo } from "@/lib/models/update-page-info"
import { saveData } from "@/lib/data-source/page"



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
      saveData({
        pageId: state.pageId,
        operations: {
          type: "property",
          arg: {
            editable
          }
        }
      })
      UpdatePageInfo(state.pageId, { editable })
      return ({ ...state, editable })
    }),
    setCover: (cover) => set((state) => {
      saveData({
        pageId: state.pageId,
        operations: {
          type: "property",
          arg: {
            cover
          }
        }
      })
      UpdatePageInfo(state.pageId, { "properties.cover": cover })
      return ({ ...state, cover })
    }),
    setTitle: (title) => set((state) => {
      saveData({
        pageId: state.pageId,
        operations: {
          type: "property",
          arg: {
            title
          }
        }
      })
      UpdatePageInfo(state.pageId, { "properties.title": title })
      return ({ ...state, title })
    }),
    setIcon: (icon) => set((state) => {
      saveData({
        pageId: state.pageId,
        operations: {
          type: "property",
          arg: {
            emoji: icon
          }
        }
      })
      UpdatePageInfo(state.pageId, { "properties.icon": icon })

      return ({ ...state, icon })
    }),
  })
}

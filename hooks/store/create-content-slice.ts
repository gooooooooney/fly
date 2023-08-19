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
      saveProperty({
        pageId: state.pageId,
        data: {
          editable,
        }
      })
      return ({ ...state, editable })
    }),
    setCover: (cover) => set((state) => {
      saveProperty({
        pageId: state.pageId,
        data: {
          cover
        }
      })
      return ({ ...state, cover })
    }),
    setTitle: (title) => set((state) => {
      console.log(state)
      saveProperty({
        pageId: state.pageId,
        data: {
          title
        }
      })
      return ({ ...state, title })
    }),
    setIcon: (icon) => set((state) => {
      saveProperty({
        pageId: state.pageId,
        data: {
          emoji: icon
        }
      })

      return ({ ...state, icon })
    }),
  })
}

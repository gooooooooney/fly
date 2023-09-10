import { StateCreator } from "zustand"
import _ from "lodash"
import { saveProperty } from "@/lib/data-source/page"
import { useBoundStore } from "./useBoundStore";
import { findMenu } from "@/lib/menus";

export interface MenuProp {
  id: string;
  title: string;
  icon: string;
  hasChildren: boolean;
  isActive: boolean;
  children: MenuProp[];
}

function setActiveMenu(menus: MenuProp[], { title, icon }: { title?: string, icon?: string }) {

  for (const menu of menus) {
    if (menu.isActive) {
      if (title) {
        menu.title = title
      }
      if (icon) {
        menu.icon = icon
      }
    } else {
      setActiveMenu(menu.children, { title, icon })
    }
  }
}

export interface ContentSlice {
  pageId: string
  icon: string
  title: string
  cover: string
  editable: boolean
  menus: MenuProp[]
  blocks: BlockNoteEditor['topLevelBlocks']
  // setBlocks: (blocks: BlockNoteEditor['topLevelBlocks']) => void
  // setMenus: (menus: MenuProp[]) => void
  // setEditable: (editable: boolean) => void
  // setCover: (cover: string) => void
  // setTitle: (title: string) => void
  // setIcon: (icon: string) => void
  // setPageId: (pageId: string) => void
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
    editable: false,
    menus: [],
    // setMenus: (menus) => set((state) => {
    //   return ({ ...state, menus })
    // }),
    // setBlocks: (blocks) => set((state) => {
    //   return ({ ...state, blocks })
    // }),
    // setPageId: (pageId) => set((state) => ({ ...state, pageId })),
    // setEditable: (editable) => set((state) => {
    //   return ({ ...state, editable })
    // }),
    // setCover: (cover) => set((state) => {
    //   return ({ ...state, cover })
    // }),
    // setTitle: (title) => set((state) => {
    //   const menus = _.cloneDeep(state.menus)
    //   setActiveMenu(menus, { title })
    //   return ({ ...state, title, menus })
    // }),
    // setIcon: (icon) => set((state) => {
    //   const menus = _.cloneDeep(state.menus)
    //   setActiveMenu(menus, { icon })
    //   return ({ ...state, icon, menus })
    // }),
  })
}

export const setMenus =   (menus: MenuProp[]) => useBoundStore.setState(s => {
  s.menus = menus
})
export const setBlocks =  (blocks: BlockNoteEditor['topLevelBlocks']) => useBoundStore.setState(s => {
  s.blocks = blocks
})
export const setPageId =  (pageId: string) => useBoundStore.setState(s => {
  s.pageId = pageId
})
export const setEditable =  (editable: boolean) => useBoundStore.setState(s => {
  s.editable = editable
})
export const setCover =  (cover: string) => useBoundStore.setState(s => {
  s.cover = cover
})
export const setTitle =  (title: string) => useBoundStore.setState(s => {
  s.title = title
})
export const setIcon =  (icon: string) => useBoundStore.setState(s => {
  s.icon = icon
})

export const setMenu = (menu: MenuProp) => {
  useBoundStore.setState(s => {

    const item = findMenu(s.menus, menu.id)
    if (item) {
      item.title = menu.title
      item.icon = menu.icon
      item.hasChildren = menu.hasChildren
      item.isActive = menu.isActive
      item.children = menu.children
    }
  })
}
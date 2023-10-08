import { StateCreator } from "zustand"
import { saveProperty } from "@/lib/data-source/page"
import { findMenu } from "@/lib/menus";
import { useBoundStore } from "./useBoundStore";




export interface MenuProp extends IdObj {
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
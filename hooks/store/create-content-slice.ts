import { StateCreator } from "zustand"
import _ from "lodash"
import { saveProperty } from "@/lib/data-source/page"

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
  setMenus: (menus: MenuProp[]) => void
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
    menus: [],
    setMenus: (menus) => set((state) => {
      console.log(menus, "menus set")
      return ({ menus })
    }),
    setPageId: (pageId) => set((state) => ({ pageId })),
    setEditable: (editable) => set((state) => {
      return ({ editable })
    }),
    setCover: (cover) => set((state) => {
      return ({ cover })
    }),
    setTitle: (title) => set((state) => {
      const menus = _.cloneDeep(state.menus)
      setActiveMenu(menus, { title })
      return ({ title, menus })
    }),
    setIcon: (icon) => set((state) => {
      const menus = _.cloneDeep(state.menus)
      setActiveMenu(menus, { icon })
      return ({ icon, menus })
    }),
  })
}

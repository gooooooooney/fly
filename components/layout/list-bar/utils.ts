import { MenuProp } from "@/hooks/store/create-content-slice";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { getChildrenMenus } from "@/lib/data-source/menus";
import _ from "lodash";
import { useStore } from "zustand";
function setMenus(menus: MenuProp[], item: MenuProp) {

  for (const menu of menus) {
    if (menu.id === item.id) {
      menu.children = item.children
    } else {
      setMenus(menu.children, item)
    }
  }
}

export function initMenus() {
  const {menus: items, setMenus: setItems} = useBoundStore.getState()
  const newMenus = _.cloneDeep(items)

  for (const menu of items) {
    if (menu.hasChildren && menu.children.length === 0) {
      menu.children = []
    }
  }

  Promise.all(items
    .filter(v => v.hasChildren && v.children.length === 0)
    .map(async (v) =>
      v && getChildrenMenus(v.id).then(res => {
        const newMenu = _.cloneDeep(v)
        newMenu.children = res
        return newMenu
      })))
    .then(res => {
      res.forEach(v => {
        setMenus(newMenus, v)
      })
      res.length && setItems(newMenus)
    })
}
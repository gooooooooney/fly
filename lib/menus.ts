import { MenuProp } from "@/hooks/store/create-content-slice";

export function findMenu(menus: MenuProp[], id: string): MenuProp | undefined {
  for (const menu of menus) {
    if (menu.id === id) return menu
    if (menu.children) {
      const foundInChildren = findMenu(menu.children, id)
      if (foundInChildren) return foundInChildren
    }
  }
return void 0
}
export function setMenus(menus: MenuProp[], item: MenuProp) {

  for (const menu of menus) {
    if (menu.id === item.id) {
      menu.children = item.children
    } else {
      setMenus(menu.children, item)
    }
  }
}
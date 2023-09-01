import { MenuProp } from "@/hooks/store/create-content-slice";
import _ from "lodash";

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

export function mergeMenus(
  targetMenus: MenuProp[],
  sourceMenus: MenuProp[]
): MenuProp[] {
  // 创建一个新的数组，避免修改原始数组
  const mergedMenus: MenuProp[] = _.cloneDeep(targetMenus);

  for (const sourceMenu of sourceMenus) {
    // 根据ID查找目标数组中对应的菜单项
    const targetMenu = mergedMenus.find((menu) => menu.id === sourceMenu.id);

    if (targetMenu) {
      // 更新目标菜单项的属性
      targetMenu.title = sourceMenu.title;
      targetMenu.icon = sourceMenu.icon;
      targetMenu.hasChildren = sourceMenu.hasChildren;
      targetMenu.isActive = sourceMenu.isActive;

      // 递归合并子菜单项
      targetMenu.children = mergeMenus(
        targetMenu.children,
        sourceMenu.children
      );
    } else {
      // 如果目标数组中不存在对应的菜单项，则将源菜单项添加到目标数组中
      mergedMenus.push(sourceMenu);
    }
  }

  return mergedMenus;
}
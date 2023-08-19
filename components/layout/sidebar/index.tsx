"use client";
import { Menu } from "react-pro-sidebar";
import { MenuItem } from "./menuItem";
import { SidebarRoot } from "./sidebar-root";
import useStore from "@/hooks/use-store";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import SidebarHeader from "./sidebar-header";
import { Icons } from "@/components/icons";
import { FC } from "react";
import { SubMenu } from "./submenu";
import { useSpace } from "@/hooks/use-space";
import { WorkspaceInfo } from "@/prisma/services/workspace/workspcae-services";

interface MenuProps {
  title: string;
  emoji: string;
  id: string;
  children: MenuProps[];
}

interface SidebarProps {
  // name: string;
  // avatar: string;
  wps: WorkspaceInfo;
  email: string;
  // menus: MenuProps[]
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const collapsed = useStore(useBoundStore, (state) => state.collapsed);

  // const spaceId = document.querySelector("#spaceid")?.getAttribute("data-spaceid")!
  // console.log(spaceId)
  // const {data, isLoading, error} = useSpace(spaceId)
  // if (!data) {
  //   return null
  // }
  const activeWp = props.wps.find(wp => wp.isActive)!
  const renderChildren = (menus: MenuProps[]) => {
    return menus.map((menu) => {
      if (menu.children.length === 0) {
        return <MenuItem key={menu.id}  >
          <span>{menu.emoji}</span>
          <span className="ml-1">{menu.title}</span>
        </MenuItem>;
      } else {
        return (
          <SubMenu key={menu.id} label={menu.title} >
            {renderChildren(menu.children)}
          </SubMenu>
        );
      }
    });
  }


  return (
    <SidebarRoot collapsed={collapsed} collapsedWidth="0">
      <SidebarHeader
        name={activeWp.name}
        avatar={activeWp.avatar || ""}
        email={props.email}
      />
      <Menu>
        <SubMenu icon={<Icons.HomeIcon />} label="我的主页">
          {/* {
            renderChildren(props.menus)
          } */}
        </SubMenu>
        <MenuItem icon={<Icons.QuestionMarkIcon />}>帮助中心</MenuItem>
      </Menu>
    </SidebarRoot>
  );
};

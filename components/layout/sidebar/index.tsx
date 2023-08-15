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

interface MenuProps {
  name: string;
  hasChildren: boolean;
}

interface SidebarProps {
  name: string;
  avatar: string;
  email: string;
  menus: MenuProps[]
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const collapsed = useStore(useBoundStore, (state) => state.collapsed);


  return (
    <SidebarRoot collapsed={collapsed} collapsedWidth="0">
      <SidebarHeader
        name={props.name}
        avatar={props.avatar}
        email={props.email}
      />
      <Menu>
        <SubMenu icon={<Icons.HomeIcon />} label="我的主页">
          {
            props.menus.map((menu) => {
              return menu.hasChildren ? (
                <SubMenu key={menu.name} label={menu.name}>
                  
                </SubMenu>
              ) : (
                <MenuItem key={menu.name}>{menu.name}</MenuItem>
              );
                
              
            })
          }
        </SubMenu>
        <MenuItem icon={<Icons.QuestionMarkIcon />}>帮助中心</MenuItem>
      </Menu>
    </SidebarRoot>
  );
};

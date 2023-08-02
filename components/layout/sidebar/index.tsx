"use client"
import { useIsSSR } from '@react-aria/ssr';
import { useTheme } from 'next-themes';
import { Menu } from 'react-pro-sidebar';
import { MenuItem } from './menuItem';
import { SubMenu } from './submenu';
import { SidebarRoot } from './sidebar-root';
import useStore from '@/hooks/use-store';
import { useBoundStore } from '@/hooks/store/useBoundStore';

export const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const collapsed =useStore(useBoundStore, (state) => state.collapsed)

  return (
    <SidebarRoot collapsed={collapsed}>
      <Menu>
        <SubMenu label="Charts">
          <MenuItem > Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <MenuItem> Documentation </MenuItem>
        <MenuItem> Calendar </MenuItem>
      </Menu>
    </SidebarRoot>
  )
}
"use client"
import { useIsSSR } from '@react-aria/ssr';
import { useTheme } from 'next-themes';
import { Menu, } from 'react-pro-sidebar';
import { MenuItem } from './menuItem';
import { SubMenu } from './submenu';
import { SidebarRoot } from './sidebar-root';
import useStore from '@/hooks/use-store';
import { useBoundStore } from '@/hooks/store/useBoundStore';
import SidebarHeader from './sidebar-header';
import { Icons } from '@/components/icons';


export const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const collapsed = useStore(useBoundStore, (state) => state.collapsed)

  return (
    <SidebarRoot collapsed={collapsed} collapsedWidth='0'>
      <SidebarHeader />
      <Menu>
        <MenuItem icon={<Icons.HomeIcon />}>
          我的主页
        </MenuItem>
        <MenuItem icon={<Icons.QuestionMarkIcon />}>帮助中心</MenuItem>
      </Menu>
    </SidebarRoot>
  )
}
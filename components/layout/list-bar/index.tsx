"use client";
import React, { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import SidebarHeader from "./header";
import { MenuProp, setMenus } from "@/hooks/store/create-content-slice";
import { getSpaceInfo } from "@/lib/data-source/space";
import { Menus } from "./menu";
import { findCurrentPagePath } from "@/lib/data-source/menus";
import { findMenu, mergeMenus } from "@/lib/menus";
import { setCollapsed } from "@/hooks/store/create-layout-slice";
import { useMount } from "react-use";
import { changePageIcon, changePageTitle } from "@/lib/page-meta";
import { usePageInit } from "@/hooks/use-page-init";
import { setAvatar, setName } from "@/hooks/store/create-user-slice";
import { useSession } from "@/hooks/use-session";



export function ListBar(props: { email: string, spaceName:string }) {
  const pageId = useUuidPathname();
  const session = useSession()

  const [actSpace, setActSpace] = useState<null | any>(null);
  const [items] = useBoundStore( (state) => [
    state.menus,
  ])!;
  const [collapsed, avatar, name] = useBoundStore( (state) => [
    state.collapsed,
    state.avatar,
    state.name
  ])!;

  const getItems = (list: MenuProp[]): MenuProp[] => {
    return list.map((item) => {
      return {
        id: item.id,
        isActive: item.id === pageId,
        title: item.title,
        icon: item.icon,
        hasChildren: item.hasChildren,
        children:
          item.children && item.children.length ? getItems(item.children) : [],
      };
    });
  };

  useEffect(() => {
    
    if (!session) return

    // 避免当进入子页面时，刷新页面导致breadcrumbs不正确
    Promise.all([getSpaceInfo(), findCurrentPagePath(pageId)]).then(
      ([res, currentPagePath]) => {
        if (res && currentPagePath) {
          setActSpace(res?.activeWorkspace);
          setName(res.activeWorkspace?.name)
          setAvatar(res.activeWorkspace?.avatar || "")
          setMenus(
            mergeMenus(res.activeWorkspace?.pages ?? [], currentPagePath ?? [])
          );
          useBoundStore.setState(s => {
            const item = findMenu(s.menus, pageId)
            if (item) {
              item.isActive = true
            }
          })
        }
      }
    );
  }, [session]);
  useEffect(() => {
    
    // setMenus(getItems(items));
    useBoundStore.setState(s => {
      const item = findMenu(s.menus, pageId)
      if (item) {
        item.isActive = true
        changePageTitle(item.title)
        changePageIcon(item.icon)
      }
    })
    return () => {
      useBoundStore.setState(s => {
        const item = findMenu(s.menus, pageId)
        if (item) {
          item.isActive = false
        }
      })
    }
  }, [pageId]);


  if (!actSpace) return null;

  // sign in but current space is not the spaceName
  if (actSpace.name !== props.spaceName) return null

  return (
    <Transition
      show={!collapsed}
      enter="transition-width transition-opacity duration-300"
      enterFrom="w-0 opacity-0"
      enterTo="w-60 opacity-100"
      leave="transition-width transition-opacity duration-300"
      leaveFrom="w-60 opacity-100"
      leaveTo="w-0 opacity-0"
    >
      <section className="max-w-[240px]">
        <div className="flex w-60  justify-between items-center mt-3 mb-9">
          <SidebarHeader
            avatar={avatar}
            name={name ?? ""}
            email={props.email}
          />
          <div>
            <Button
              variant="light"
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              isIconOnly
            >
              <Icons.DoubleArrowLeftIcon
                className={cn(
                  "transition-transform",
                  collapsed ? "transform rotate-180" : "transform rotate-0"
                )}
              />
            </Button>
          </div>
        </div>
        <Menus items={items} />
      </section>
    </Transition>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { useStore } from "zustand";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import SidebarHeader from "./header";
import { MenuProp } from "@/hooks/store/create-content-slice";
import { getSpaceInfo } from "@/lib/data-source/space";
import _ from "lodash";
import { Menus } from "./menu";




export function ListBar(props: { email: string }) {
  const pageId = useUuidPathname();
  const [actSpace, setActSpace] = useState<null | any>(null)
  const [items, setItems] = useStore(useBoundStore, (state) => [
    state.menus,
    state.setMenus,
  ])!;
  const [collapsed, setCollapsed] = useStore(useBoundStore, (state) => [
    state.collapsed,
    state.setCollapsed,
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
    getSpaceInfo().then(res => {
      if (res) {
        setActSpace(res?.activeWorkspace)
        setItems(res?.activeWorkspace?.pages ?? [])
      }
    })
  }, [])
  useEffect(() => {
    setItems(getItems(items))
  }, [pageId])

  if (!actSpace) return null;
  const activeWp = actSpace;


  return (
    <Transition
      show={!collapsed}
      enter="transition-width transition-opacity duration-300"
      enterFrom="w-0 opacity-0"
      enterTo="w-80 opacity-100"
      leave="transition-width transition-opacity duration-300"
      leaveFrom="w-80 opacity-100"
      leaveTo="w-0 opacity-0"
      className="w-80"
    >
      <div className="flex justify-between items-center mt-3 mb-9">
        <SidebarHeader
          avatar={activeWp?.avatar!}
          name={activeWp?.name ?? ""}
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
    </Transition>
  );
}





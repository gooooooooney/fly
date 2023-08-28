"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Listbox,
  ListboxItem,
  ListboxItemProps,
  ListboxProps,
  ListboxSection,
} from "@nextui-org/listbox";
import { Icons } from "@/components/icons";
import { Button, useAccordion, useDisclosure } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import _, { get, set } from "lodash";
import { Disclosure, Transition } from "@headlessui/react";
import { useSpace } from "@/hooks/use-space";
import Link from "next/link";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { useStore } from "zustand";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import SidebarHeader from "./header";
import useForceUpdate from "@/hooks/use-force-update";
import { usePathname, useRouter } from "next/navigation";
import { MenuProp } from "@/hooks/store/create-content-slice";

function Toggle({ open, item }: { open: boolean; item: MenuProp }) {
  return (
    <div
      className={cn(
        [
          "hover:bg-default-100/80",
          "flex",
          "group",
          "items-center",
          "justify-between",
          "relative",
          "py-1.5",
          "w-full",
          "box-border",
          "subpixel-antialiased",
          "cursor-pointer",
          "tap-highlight-transparent",
          "outline-none",
          "data-[focus-visible=true]:z-10",
          "data-[focus-visible=true]:outline-2",
          "data-[focus-visible=true]:outline-focus",
          "data-[focus-visible=true]:outline-offset-2",
          "data-[focus-visible=true]:dark:ring-offset-background-content1",
          "data-[hover=true]:text-default-foreground",
          "data-[selectable=true]:focus:bg-default",
          "data-[selectable=true]:focus:text-default-foreground",
          "px-3",
          "h-8",
          "rounded-md",
        ],
        {
          "bg-default-100/80": item.isActive,
        }
      )}
    >
      <Disclosure.Button
        onClick={() => {
          console.log("click");
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            className="text-lg"
            key={open ? "less" : "more"}
            initial={{
              rotate: open ? -90 : 90,
            }}
            animate={{
              zIndex: 1,
              rotate: 0,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circOut",
              },
            }}
            exit={{
              zIndex: 0,
              rotate: open ? -90 : 90,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "circIn",
              },
            }}
          >
            {open ? <Icons.TriangleDownIcon /> : <Icons.TriangleRightIcon />}
          </motion.div>
        </AnimatePresence>

        {/* <motion.div
        className="mr-1"
        animate={{
          rotate: open ? 90 : 0,
        }}
        transition={{
          duration: 0.1,
        }}
      >
        <Icons.ChevronRightIcon />
      </motion.div> */}
      </Disclosure.Button>
      <Link href={`/${item.id}`} className="flex-1">
        <span className="mr-1 inline-block w-5 h-5">{item.icon || "📄"}</span>
        {item.title || "Untitled"}
      </Link>
    </div>
  );
}

export function ListBar(props: { email: string }) {
  const { data, mutate } = useSpace();
  const pageId = useUuidPathname();
  const [items, setItems] = useStore(useBoundStore, (state) => [
    state.menus,
    state.setMenus,
  ])!;
  const [title, icon] = useStore(useBoundStore, (state) => [
    state.title,
    state.icon,
  ])!;
  const [collapsed, setCollapsed] = useStore(useBoundStore, (state) => [
    state.collapsed,
    state.setCollapsed,
  ])!;

  const getItems = (list: MenuProp[], {title, icon}: {title: string, icon: string}): MenuProp[] => {
    return list.map((item) => {
      return {
        id: item.id,
        isActive: item.id === pageId,
        title:  item.id === pageId ? title : item.title,
        icon:  item.id === pageId ? icon : item.icon,
        children:
          item.children && item.children.length ? getItems(item.children, {title, icon}) : [],
      };
    });
  };
  useEffect(() => {
    if (!data?.body) return;
    // if (!activeWp.pages) return;

    mutate(
      {
        ...data,
        body: {
          ...data.body,
          activeWorkspace: {
            ...data.body.activeWorkspace,
            pages: getItems(data.body?.activeWorkspace?.pages ?? [], {title, icon}),
          }
        },
        isUpdated: true,
      },
      {
        // 不重新请求
        revalidate: false,
        
      }
    );
    // setItems(data.body.activeWorkspace?.pages ?? [])
  }, [pageId, title, icon]);

  if (!data) return null;
  if (!data?.body) return null;
  const activeWp = data?.body?.activeWorkspace;
  


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

function SubMenu({ item }: { item: MenuProp }) {
  // const fn = useForceUpdate()
  // fn()
  return (
    <Disclosure.Panel
      as={Menus}
      unmount={false}
      className={cn(
        "p-0 gap-0 pl-4 pt-[1px]   dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible "
      )}
      itemWithoutChildClassName="pl-[12px]"
      items={item.children}
    />
  );
}

export function Menus({
  items,
  itemWithoutChildClassName,
  ...props
}: ListboxProps & { items: MenuProp[]; itemWithoutChildClassName?: string }) {
  return (
    <Listbox
      aria-label="User Menu"
      // onAction={(key) => alert(key)}
      className="px-1 gap-0   divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible"
      items={items}
      itemClasses={{
        base: "rounded-md",
      }}
      {...props}
    >
      {(item: MenuProp) => {
        if (_.isArray(item.children) && item.children.length > 0) {
          return (
            <ListboxItem
              className="px-0 py-0    data-[hover=true]:bg-transparent h-fit"
              key={item.id}
            >
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <Toggle open={open} item={item} />
                    <SubMenu item={item} />
                  </>
                )}
              </Disclosure>
            </ListboxItem>
          );
        }
        return (
          <ListboxItem
            className={cn(
              "px-3 pl-[26px]   h-8 data-[hover=true]:bg-default-100/80",
              itemWithoutChildClassName,
              {
                "bg-default-100/80": item.isActive,
              }
            )}
            key={item.id}
            // startContent={<span className="w-5 h-5">{item.emoji}</span>}
          >
            <Link href={`/${item.id}`} className="flex-1 py-1.5 block">
              <span className="mr-1 inline-block w-5 h-5">
                {item.icon || "📄"}
              </span>
              {item.title || "Untitled"}
            </Link>
          </ListboxItem>
        );
      }}
    </Listbox>
  );
}

"use client";
import React, { useState } from "react";
import {
  Listbox,
  ListboxItem,
  ListboxItemProps,
  ListboxProps,
  ListboxSection,
} from "@nextui-org/listbox";
import { Icons } from "@/components/icons";
import { useAccordion, useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import _ from "lodash";
import { Disclosure } from "@headlessui/react";

export interface MenuProps {
  title: string;
  emoji: string;
  id: string;
  itemProps?: Omit<ListboxItemProps, "key">;
  children: MenuProps[];
}

export function MenuItem({ item }: { item: MenuProps }): React.ReactNode {
  return (
    <ListboxItem {...item.itemProps} key={item.id}>
      {item.title}
    </ListboxItem>
  );
}

export function ExpandableMenuItem({
  item,
}: {
  item: MenuProps;
}): React.ReactNode {
  // const { isOpen, onOpenChange } = useDisclosure();
  // useAccordion(props.id, isOpen, onClose, onOpen)
  return (
    <ListboxItem
      className={cn({
        // "bg-default-100/80": isOpen,
        // "h-fit": isOpen,
      })}
      key={item.id}
      startContent={
        <motion.div
          // onClick={onOpenChange}
          animate={
            {
              // rotate: isOpen ? 90 : 0,
            }
          }
          transition={{
            duration: 0.3,
          }}
        >
          <Icons.ChevronRightIcon />
        </motion.div>
      }
      {...item.itemProps}
    >
      {item.title}
      {/* {children} */}
      {/* {isOpen && <Menu items={item.children} />} */}
    </ListboxItem>
  );
}

export function Menu({ items }: { items: MenuProps[] }) {
  // console.log(ListboxItem.type)
  const { isOpen, onOpenChange } = useDisclosure();
  return (
    <Listbox items={items}>
      {
        ((item: MenuProps) => {
          if (_.isArray(item.children) && item.children.length > 0) {
            return <ExpandableMenuItem item={item} />;
            return (
              <ListboxItem
                className={cn({
                  "bg-default-100/80": isOpen,
                  "h-fit": isOpen,
                })}
                key={item.id}
                startContent={
                  <motion.div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenChange();
                    }}
                    animate={{
                      rotate: isOpen ? 90 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <Icons.ChevronRightIcon />
                  </motion.div>
                }
                {...item.itemProps}
              >
                {item.title}
                {/* {children} */}
                {isOpen && <Menu items={item.children} />}
              </ListboxItem>
            );
          }
          return <MenuItem item={item} />;
          // return (
          //   <ListboxItem {...item.itemProps} key={item.id}>
          //     {item.title}
          //   </ListboxItem>
          // );
        }) as any
      }
    </Listbox>
  );
}

export function Menus() {
  const menus = [
    {
      title: "我的主页",
      emoji: "🏠",
      id: "home",
      children: [
        {
          title: "我的主页",
          emoji: "🏠",
          id: "home",
          children: [
            {
              title: "我的主页",
              emoji: "🏠",
              id: "home",
              children: [
                {
                  title: "我的主页",
                  emoji: "🏠",
                  id: "home",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return <Menu items={menus} />;
}

const menus = [
  {
    title: "我的主页",
    emoji: "🏠",
    id: "home",
    children: [
      {
        title: "我的主页",
        emoji: "🏠",
        id: "home",
        children: [
          {
            title: "我的主页",
            emoji: "🏠",
            id: "home",
            children: [
              {
                title: "我的主页",
                emoji: "🏠",
                id: "home",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

export function ListBar({
  items,
  ...props
}: ListboxProps & { items: MenuProps[] }) {
  // const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <Listbox
      aria-label="User Menu"
      // onAction={(key) => alert(key)}
      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small"
      items={items}
      itemClasses={
        {
          // base: "px-3  rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }
      }
      {...props}
    >
      {(item: MenuProps) => {
        if (_.isArray(item.children) && item.children.length > 0) {
          return (
            <ListboxItem
              className="px-0 py-0  rounded-none gap-3 data-[hover=true]:bg-transparent h-fit"
              key="issues"
            >
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <div className="hover:bg-default-100/80 flex items-centerflex group items-center justify-between relative  py-1.5 w-full box-border subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:dark:ring-offset-background-content1 data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-default data-[selectable=true]:focus:text-default-foreground px-3 rounded-none gap-3 h-12 ">
                      <Disclosure.Button>
                        <motion.div
                          className=""
                          animate={{
                            rotate: open ? 90 : 0,
                          }}
                          transition={{
                            duration: 0.1,
                          }}
                        >
                          <Icons.ChevronRightIcon />
                        </motion.div>
                      </Disclosure.Button>
                      <div className="flex-1">
                        <span className="mr-2">{item.emoji}</span>
                        {item.title}
                      </div>
                    </div>

                    <Disclosure.Panel
                      as={ListBar}
                      className={cn(
                        {
                          hidden: !open,
                        },
                        "p-0 gap-0 divide-y  dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small "
                      )}
                      itemClasses={{
                        // base: "pr-3 !pl-7  rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                      }}
                      items={item.children}
                    />
                    {/* <Disclosure.Panel
                      as={ListBar}
                      className={cn(
                        {
                          hidden: !isOpen,
                        },
                        "p-0 gap-0 divide-y  dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small "
                      )}
                      itemClasses={{
                        base: "pr-3 pl-7  rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                      }}
                      items={item.children}
                    /> */}
                  </>
                )}
              </Disclosure>

              {/* <ListBar
                className={cn({
                  hidden: !isOpen,
                },
                "p-0 gap-0 divide-y  dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small "
                )}
                itemClasses={{
                  base: "pr-3 pl-7  rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
                items={item.children}
              /> */}
              {/* <Listbox
                aria-label="User Menu"
                onAction={(key) => alert(key)}
                className="p-0 gap-0 divide-y  dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small "
                itemClasses={{
                  base: "pr-3 pl-7  rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
              >
                <ListboxSection
                  className={cn({
                    hidden: !isOpen,
                  })}
                >
                  <ListboxItem
                    key="issues"
                    startContent={<Icons.ChevronRightIcon />}
                  >
                    Issues
                  </ListboxItem>
                  <ListboxItem
                    key="pull_requests"
                    startContent={<Icons.ChevronRightIcon />}
                  >
                    Pull Requests
                  </ListboxItem>
                  <ListboxItem
                    key="discussions"
                    startContent={<Icons.ChevronRightIcon />}
                  >
                    Discussions
                  </ListboxItem>
                  <ListboxItem
                    key="actions"
                    startContent={<Icons.ChevronRightIcon />}
                  >
                    Actions
                  </ListboxItem>
                  <ListboxItem
                    key="projects"
                    startContent={<Icons.ChevronRightIcon />}
                  >
                    Projects
                  </ListboxItem>
                </ListboxSection>
              </Listbox> */}
            </ListboxItem>
          );
        }
        return (
          <ListboxItem
            className="px-3  rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80"
            key="pull_requests"
            startContent={item.emoji}
          >
            {item.title}
          </ListboxItem>
        );
      }}
      {/* <ListboxItem
        className="px-0 py-0  rounded-none gap-3 data-[hover=true]:bg-transparent h-fit"
        key="issues"
      >
        <div className="hover:bg-default-100/80 flex items-centerflex group items-center justify-between relative  py-1.5 w-full box-border subpixel-antialiased cursor-pointer tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:dark:ring-offset-background-content1 data-[hover=true]:text-default-foreground data-[selectable=true]:focus:bg-default data-[selectable=true]:focus:text-default-foreground px-3 rounded-none gap-3 h-12 ">
          <motion.div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenChange();
            }}
            animate={{
              rotate: isOpen ? 90 : 0,
            }}
            transition={{
              duration: 0.1,
            }}
          >
            <Icons.ChevronRightIcon />
          </motion.div>
          <div className="flex-1">issues111</div>
        </div>
        <Listbox
          aria-label="User Menu"
          onAction={(key) => alert(key)}
          className="p-0 gap-0 divide-y  dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small "
          itemClasses={{
            base: "pr-3 pl-7  rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
          }}
        >
          <ListboxSection
            className={cn({
              hidden: !isOpen,
            })}
          >
            <ListboxItem key="issues" startContent={<Icons.ChevronRightIcon />}>
              Issues
            </ListboxItem>
            <ListboxItem
              key="pull_requests"
              startContent={<Icons.ChevronRightIcon />}
            >
              Pull Requests
            </ListboxItem>
            <ListboxItem
              key="discussions"
              startContent={<Icons.ChevronRightIcon />}
            >
              Discussions
            </ListboxItem>
            <ListboxItem
              key="actions"
              startContent={<Icons.ChevronRightIcon />}
            >
              Actions
            </ListboxItem>
            <ListboxItem
              key="projects"
              startContent={<Icons.ChevronRightIcon />}
            >
              Projects
            </ListboxItem>
          </ListboxSection>
        </Listbox>
      </ListboxItem>
      <ListboxItem
        className="px-3  rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80"
        key="pull_requests"
        startContent={<Icons.ChevronRightIcon />}
      >
        Pull Requests
      </ListboxItem> */}
    </Listbox>
  );
}

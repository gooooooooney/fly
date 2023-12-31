"use client";
import { SlashMenuProps } from "@blocknote/react";
import { FC, Fragment, use, useEffect, useState } from "react";
import groupBy from "lodash/groupBy";
import toArray from "lodash/toArray";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,

} from "@nextui-org/dropdown";
import { CustomBlockSchema } from "../blocks/custom-block-schema";

export const CustomSlashMenu = (props: SlashMenuProps<CustomBlockSchema>) => {
  let index = 0;
  const groups = groupBy(props.filteredItems, (i) => i.group);
  const list = toArray(groups)
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true)
  }, [props.filteredItems])

  return (
    <Dropdown isOpen={open} onOpenChange={bol => {
      setOpen(bol)
    }} placement="left" classNames={{
      base: "w-fit"
    }}>
      <DropdownTrigger>
        Hidden
      </DropdownTrigger>
      <DropdownMenu
        items={list}
        onAction={(key) => {
          const item = props.filteredItems.find(i => i.name === key)
          if (item) {
            props.itemCallback(item)
          }
        }} aria-labelledby="menu" variant="faded">
        {
          (group: any) => (
            <DropdownSection items={group} key={group[0].group} title={group[0].group}>
              {
                ((item: any) => (
                  <DropdownItem
                    classNames={{
                      shortcut: "w-fit whitespace-nowrap"
                    }}
                    startContent={<span className="text-xl text-default-500 pointer-events-none flex-shrink-0">
                      {item.icon}
                    </span>}
                    description={item.hint}
                    shortcut={item.shortcut}
                    key={item.name} >
                    {item.name}
                  </DropdownItem>
                )) as any
              }
            </DropdownSection>
          )
        }
      </DropdownMenu>
    </Dropdown>
  );
};

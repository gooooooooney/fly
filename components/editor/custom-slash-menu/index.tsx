"use client";
import { SlashMenuProps } from "@blocknote/react";
import { FC, Fragment } from "react";
import { CustomBlockSchema } from "../block-schema";
import _ from "lodash";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { SlashMenuItem } from "./slash-menu-item";

export const CustomSlashMenu = (props: SlashMenuProps<CustomBlockSchema>) => {
  let index = 0;

  const groups = _.groupBy(props.filteredItems, (i) => i.group);
  console.log(groups);
  return (
    <Dropdown defaultOpen key="drop">
      {/* <DropdownTrigger key="trigger">
        <div>Custom</div>
      </DropdownTrigger> */}
      {/* <DropdownMenu key="slidmenu" variant="faded">
        {_.map(groups, (group) => (
          <DropdownSection key={group[0].group} title={group[0].group}>
            {group.map((item) => {
              index++;
              return (
                <Fragment key={item.name}>
                  <SlashMenuItem
                    name={item.name}
                    icon={item.icon}
                    hint={item.hint}
                    shortcut={item.shortcut}
                    isSelected={props.keyboardHoveredItemIndex === index}
                    set={() => props.itemCallback(item)}
                  />
                </Fragment>
              );
            })}
          </DropdownSection>
        ))}
      </DropdownMenu> */}
    </Dropdown>
  );
  // return (
  //   <Dropdown defaultOpen >
  //     <DropdownMenu key="fff" variant="faded" aria-label="Dropdown menu with icons">
  //       <DropdownItem
  //         key="new"
  //         shortcut="⌘N"

  //       >
  //         New file
  //       </DropdownItem>
  //       <DropdownItem
  //         key="copy"
  //         shortcut="⌘C"

  //       >
  //         Copy link
  //       </DropdownItem>
  //       <DropdownItem
  //         key="edit"
  //         shortcut="⌘⇧E"

  //       >
  //         Edit file
  //       </DropdownItem>
  //       <DropdownItem
  //         key="delete"
  //         className="text-danger"
  //         color="danger"
  //         shortcut="⌘⇧D"

  //       >
  //         Delete file
  //       </DropdownItem>
  //     </DropdownMenu>
  //   </DropdownTrigger>
  // );
};

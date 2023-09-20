import {
  BaseSlashMenuItem,
  DefaultBlockSchema,
  formatKeyboardShortcut,
} from "@blocknote/core";
import { ReactSlashMenuItem } from "@blocknote/react";
import {
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiListOrdered,
  RiListUnordered,
  RiText,
} from "react-icons/ri";
import { getDefaultSlashMenuItems } from "./default-slash-menu-items";
import { CustomBlockSchema } from "../blocks/custom-block-schema";
import { SlashMenuPageItem } from "./slash-menu-page-item";
import { SlashMenuDividerItem } from "./slash-menu-divider-item";
import { SlashMenuCalloutItem } from "./slash-menu-callout-item";
import { SlashMenuTodoItem } from "./slash-menu-todo-item";
import { SlashMenuCodeBlockItem } from "./slash-menu-code-block-item";
import { SlashMenuCustomItem } from "./slash-menu-custom.item";

const extraFields: Record<
  string,
  Omit<
    ReactSlashMenuItem<DefaultBlockSchema>,
    keyof BaseSlashMenuItem<DefaultBlockSchema>
  >
> = {
  Heading: {
    group: "Headings",
    icon: <RiH1 size={18} />,
    hint: "Used for a top-level heading",
    shortcut: formatKeyboardShortcut("Mod-Alt-1"),
  },
  "Heading 2": {
    group: "Headings",
    icon: <RiH2 size={18} />,
    hint: "Used for key sections",
    shortcut: formatKeyboardShortcut("Mod-Alt-2"),
  },
  "Heading 3": {
    group: "Headings",
    icon: <RiH3 size={18} />,
    hint: "Used for subsections and group headings",
    shortcut: formatKeyboardShortcut("Mod-Alt-3"),
  },
  "Heading 4": {
    group: "Headings",
    icon: <RiH4 size={18} />,
    hint: "Used for subsections and group headings",
    shortcut: formatKeyboardShortcut("Mod-Alt-4"),
  },
  "Heading 5": {
    group: "Headings",
    icon: <RiH5 size={18} />,
    hint: "Used for subsections and group headings",
    shortcut: formatKeyboardShortcut("Mod-Alt-5"),
  },
  "Heading 6": {
    group: "Headings",
    icon: <RiH6 size={18} />,
    hint: "Used for subsections and group headings",
    shortcut: formatKeyboardShortcut("Mod-Alt-6"),
  },
  "Numbered List": {
    group: "Basic blocks",
    icon: <RiListOrdered size={18} />,
    hint: "Used to display a numbered list",
    shortcut: formatKeyboardShortcut("Mod-Alt-7"),
  },
  "Bullet List": {
    group: "Basic blocks",
    icon: <RiListUnordered size={18} />,
    hint: "Used to display an unordered list",
    shortcut: formatKeyboardShortcut("Mod-Alt-9"),
  },
  Paragraph: {
    group: "Basic blocks",
    icon: <RiText size={18} />,
    hint: "Used for the body of your document",
    shortcut: formatKeyboardShortcut("Mod-Alt-0"),
  },
};

export function getReactSlashMenuItems(
): ReactSlashMenuItem<CustomBlockSchema>[] {
  const slashMenuItems: BaseSlashMenuItem<CustomBlockSchema>[] =
    getDefaultSlashMenuItems(CustomBlockSchema);
  return [
    ...slashMenuItems.map((item) => ({
      ...item,
      ...extraFields[item.name],
    })),
    SlashMenuPageItem,
    SlashMenuDividerItem,
    SlashMenuCalloutItem,
    SlashMenuTodoItem,
    SlashMenuCodeBlockItem,
    // SlashMenuCustomItem,
  ];
}

export const slashMenuItems = [
  SlashMenuPageItem,
  SlashMenuDividerItem,
  SlashMenuCalloutItem,
  SlashMenuTodoItem,
  SlashMenuCodeBlockItem,
  // SlashMenuCustomItem,
]

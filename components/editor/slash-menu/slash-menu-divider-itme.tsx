import { ReactSlashMenuItem } from "@blocknote/react";
import { CustomBlockSchema } from "../blocks/custom-block-schema";
import { Icons } from "@/components/icons";
import { insertOrUpdateBlock } from "./slash-menu-page-item";

export const SlashMenuDividerItem: ReactSlashMenuItem<CustomBlockSchema> = {
  name: "Divider",
  execute: (editor) => {
    editor.insertBlocks([
      {
        type: "divider",
      }
    ],
    editor.getTextCursorPosition().block,
    "after"
    )
  },
  icon: <Icons.DividerHorizontal size={18} />,
  group: "Basic blocks",
  hint: "Insert a divider",
  aliases: ["divider", "separator"],
  shortcut: "",
}
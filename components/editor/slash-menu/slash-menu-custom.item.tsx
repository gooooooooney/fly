import { ReactSlashMenuItem } from "@blocknote/react";
import { CustomBlockSchema } from "../blocks/custom-block-schema";
import { Icons } from "@/components/icons";
import { insertOrUpdateBlock } from "./slash-menu-page-item";

export const SlashMenuCustomItem: ReactSlashMenuItem<CustomBlockSchema> = {
  name: "custom",
  execute: (editor) => {
    editor.insertBlocks([
      {
        // type: "custom",
      }
    ],
    editor.getTextCursorPosition().block,
    "after"
    )
  },
  icon: <Icons.DividerHorizontal size={18} />,
  group: "Basic blocks",
  hint: "Insert a divider",
  aliases: ["custom"],
  shortcut: "",
}
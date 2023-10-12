import { ReactSlashMenuItem } from "@blocknote/react";
import { CustomBlockSchema } from "../blocks/custom-block-schema";
import { Icons } from "@/components/icons";
import { insertOrUpdateBlock } from "../utils/insertOrUpdateBlock";

export const SlashMenuCodeBlockItem: ReactSlashMenuItem<CustomBlockSchema> = {
  name: "codeBlock",
  execute: (editor) => {
    // insertOrUpdateBlock(editor, {
    //   type: "codeBlock",
    // })
  },
  icon: <Icons.DividerHorizontal size={18} />,
  group: "Basic blocks",
  hint: "Insert a divider",
  aliases: ["code"],
  shortcut: "",
}
import { ReactSlashMenuItem } from "@blocknote/react";
import { CustomBlockSchema } from "../blocks/custom-block-schema";
import { Icons } from "@/components/icons";
import { insertOrUpdateBlock } from "./slash-menu-page-item";

export const SlashMenuCalloutItem: ReactSlashMenuItem<CustomBlockSchema> = {
  name: "Callout",
  execute: (editor) => {
    insertOrUpdateBlock(editor, {
      type: "callout",
      props: {
        title: "title",
        icon: "💡"
      }
    })
  },
  icon: <Icons.ChatBubble size={18} />,
  group: "Basic blocks",
  hint: "Insert a callout",
  aliases: ["callout", "call"],
  shortcut: "",
}
import { ReactSlashMenuItem } from "@blocknote/react";
import { CustomBlockSchema } from "../blocks/custom-block-schema";
import { Icons } from "@/components/icons";
import { insertOrUpdateBlock } from "./slash-menu-page-item";

export const SlashMenuTodoItem: ReactSlashMenuItem<CustomBlockSchema> = {
  name: "todo",
  execute: (editor) => {
    editor.insertBlocks(
      [
        {
          type: "todo",
          props: {
            completed: "0",
          },
          content: [
            {
              type: "text",
              text: "Todo",
              styles: {},
            }
          ]
        },
      ],
      editor.getTextCursorPosition().block,
    )
  },
  icon: <Icons.Checkbox size={18} />,
  group: "Basic blocks",
  hint: "Track tasks with a to-do list.",
  aliases: ["todo"],
  shortcut: "",
}
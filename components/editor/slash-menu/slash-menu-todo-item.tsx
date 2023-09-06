import { ReactSlashMenuItem } from "@blocknote/react";
import { CustomBlockSchema } from "../blocks/custom-block-schema";
import { Icons } from "@/components/icons";
import { insertOrUpdateBlock } from "../utils/insertOrUpdateBlock";

export const SlashMenuTodoItem: ReactSlashMenuItem<CustomBlockSchema> = {
  name: "todo",
  execute: (editor) => {
    insertOrUpdateBlock(
      editor,
      {
        type: "todo",
        props: {
          completed: "0",
        },
      },
    )
  },
  icon: <Icons.Checkbox size={18} />,
  group: "Basic blocks",
  hint: "Track tasks with a to-do list.",
  aliases: ["todo"],
  shortcut: "",
}
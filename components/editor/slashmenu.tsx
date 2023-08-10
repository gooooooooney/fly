import {  ReactSlashMenuItem } from "@blocknote/react"
import { Icons } from "../icons";
import { blockSchema } from "./block-schema";

function insertOrUpdateBlock(
    editor: BlockNoteEditor,
    block: any
  ) {
    const currentBlock = editor.getTextCursorPosition().block;
    if (
      (currentBlock.content.length === 1 &&
        currentBlock.content[0].type === "text" &&
        currentBlock.content[0].text === "/") ||
      currentBlock.content.length === 0
    ) {
      editor.updateBlock(currentBlock, block);
      editor.setTextCursorPosition(editor.getTextCursorPosition().nextBlock!);
    } else {
      editor.insertBlocks([block], currentBlock, "after");
      editor.setTextCursorPosition(editor.getTextCursorPosition().nextBlock!);
    }
  }


// Custom Slash Menu item which executes the above function.
export const insertPageItem: ReactSlashMenuItem<typeof blockSchema> = {
    name: "Page",
    execute: (editor) => {
        insertOrUpdateBlock(editor, {
            type: "page",
        })
        console.log(111)
    },
    aliases: ["page"],
    group: "Basic blocks",
    icon: <Icons.File size={18} />,
    hint: "Embed a sub-page inside this page.",
};
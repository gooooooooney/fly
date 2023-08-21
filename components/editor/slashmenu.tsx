import { ReactSlashMenuItem } from "@blocknote/react"
import { Icons } from "../icons";
import { blockSchema } from "./block-schema";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { addNewPage, saveBlocks } from "@/lib/data-source/page";
import OutHook from "../OutHook";

export function insertOrUpdateBlock(
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
    const childBlock = editor.getTextCursorPosition().block;
    const pageId = useBoundStore.getState().pageId
    insertOrUpdateBlock(editor, {
      type: "page",
    })
    saveBlocks({
      pageId,
      blocks: editor.topLevelBlocks
    })
    // OutHook.useRouter.push(`/${childBlock.id}`)
    // const spaceId = document.querySelector("#spaceid")?.getAttribute("data-spaceid")!
    addNewPage({
      pageId,
      blockId: childBlock.id,
      spaceId: useBoundStore.getState().workspaceId,
    })

  },
  aliases: ["page"],
  group: "Basic blocks",
  icon: <Icons.File size={18} />,
  hint: "Embed a sub-page inside this page.",
};
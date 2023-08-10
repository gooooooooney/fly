import { ReactSlashMenuItem } from "@blocknote/react"
import { Icons } from "../icons";
import { blockSchema } from "./block-schema";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { addPageInfo } from "@/lib/models/init-db";
import { UpdatePageInfo } from "@/lib/models/update-page-info";

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
    const childBlock = editor.getTextCursorPosition().block;
    const pageId = useBoundStore.getState().pageId
    insertOrUpdateBlock(editor, {
      type: "page",
    })
    // 避免editor onEditorContentChange时间未出发 导致blocks未更新
    UpdatePageInfo(pageId, {
      blocks: editor.topLevelBlocks
    })
    addPageInfo({
      parentId: pageId,
      id: childBlock.id
    })
    window.location.href = `/${childBlock.id}`

  },
  aliases: ["page"],
  group: "Basic blocks",
  icon: <Icons.File size={18} />,
  hint: "Embed a sub-page inside this page.",
};
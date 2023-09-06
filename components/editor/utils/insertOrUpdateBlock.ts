import { PartialBlock } from "@blocknote/core";
import { CustomBlockSchema } from "../blocks/custom-block-schema";

export function insertOrUpdateBlock(
  editor: BlockNoteEditor,
  block: PartialBlock<CustomBlockSchema>
) {
  const currentBlock = editor.getTextCursorPosition().block;

  if (currentBlock.content === undefined) {
    throw new Error(
      "Slash Menu open in a block that doesn't contain inline content."
    );
  }

  if (
    (currentBlock.content.length === 1 &&
      currentBlock.content[0].type === "text" &&
      currentBlock.content[0].text === "/") ||
    currentBlock.content.length === 0
  ) {
    editor.updateBlock(currentBlock, block);
  } else {
    editor.insertBlocks([block], currentBlock, "after");
    editor.setTextCursorPosition(editor.getTextCursorPosition().nextBlock!);
  }
}
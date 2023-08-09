import { BlockNoteEditor, Block, PartialBlock } from "@blocknote/core";
import { ReactSlashMenuItem, createReactBlockSpec } from "@blocknote/react"
import { Icons } from "../icons";

const insertPage = (editor: BlockNoteEditor) => {
    // Block that the text cursor is currently in.
    const currentBlock: Block = editor.getTextCursorPosition().block;

    // New block we want to insert.
    const PageBlock: PartialBlock = {
        type: "paragraph",
        id: "page",
        content: [
            { type: "text", text: "🥊", styles: {  } },
            { type: "text", text: "Untitle", styles: {  } }],
    };

    // Inserting the new block after the current one.
    editor.insertBlocks([PageBlock], currentBlock);
};

// Custom Slash Menu item which executes the above function.
export const insertPagetem: ReactSlashMenuItem = {
    name: "Page",
    execute: insertPage,
    aliases: ["page"],
    group: "Basic blocks",
    icon: <Icons.File size={18} />,
    hint: "Embed a sub-page inside this page.",
};
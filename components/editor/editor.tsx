"use client"; // this registers <Editor> as a Client Component
import { BlockNoteView, DragHandle, AddBlockButton, FormattingToolbarPositioner, HyperlinkToolbarPositioner, SideMenu, SideMenuButton, SideMenuPositioner, SideMenuProps, SlashMenuPositioner, getDefaultReactSlashMenuItems, useBlockNote } from "@blocknote/react";
import "./index.css"
import "@blocknote/core/style.css";
import { useStore } from "zustand";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import FormattingToolbar from "./formatting-toolbar";
import { useEffect, useState } from "react";
import { insertPageItem } from "./slashmenu";
import { CustomBlockSchema, blockSchema } from "./block-schema";
import { Icons } from "../icons";
import { CustomSideMenu } from "./CustomSideMenu";


let fn: (() => void) | null = null
interface EditorProps {
  editable: boolean
  theme: "light" | "dark"
  onEditorReady?: (editor: BlockNoteEditor | null) => void
  onEditorContentChange?: (editor: BlockNoteEditor) => void
}

export default function Editor({ editable, theme, onEditorReady, onEditorContentChange }: EditorProps) {
  const initialContent = useStore(useBoundStore, (state) => state.blocks)
  const [isReady, setIsReady] = useState(false)
  const editor = useBlockNote({
    theme,
    editable,
    blockSchema: blockSchema,
    slashMenuItems: [
      ...getDefaultReactSlashMenuItems(blockSchema),
      insertPageItem,
    ],
    initialContent: initialContent.length > 0 ? initialContent : undefined,
    editorDOMAttributes: {
      class: "!bg-background !ps-0 !pe-0",
    },
    onEditorReady: (editor) => {
      onEditorReady?.(editor)
    },
    onEditorContentChange,
    onTextCursorPositionChange(editor) {
      const currentBlock = editor.getTextCursorPosition().block
      if (currentBlock.type === "page") {
        // Retrieve all blocks before the current block and reverse them.
        const blocks = editor.topLevelBlocks.slice(0, editor.topLevelBlocks.indexOf(currentBlock)).reverse()
        // Then find the first block that is not a page block and set the cursor to the end of that block.

        let hasNotPageBlock = false
        for (let i = 0; i < blocks.length; i++) {
          const block = blocks[i];
          if (block.type !== "page") {
            hasNotPageBlock = true
            editor.setTextCursorPosition(block, "end")
            break
          }
        }
        // If there is no such block, blur the editor.
        if (!hasNotPageBlock) {
          editor._tiptapEditor.commands.blur()
        }
      }
    }
  }, [theme, initialContent]);

  useEffect(() => {
    if (editor) {
      setIsReady(true)

      editor.isEditable = editable;
    }
  }, [editable, editor]);


  return (

    <div className="flex-grow flex flex-col">
      <BlockNoteView
        className="w-full"
        editor={editor} >
        <FormattingToolbarPositioner
          editor={editor}
          formattingToolbar={FormattingToolbar}
        />
        <HyperlinkToolbarPositioner editor={editor} />
        <SlashMenuPositioner editor={editor} />
        <SideMenuPositioner
          editor={editor}
          sideMenu={CustomSideMenu}
        />
      </BlockNoteView>
      <div
        className="flex-grow"
        onClick={() => {
          const tailBlock = editor.topLevelBlocks[editor.topLevelBlocks.length - 1]
          // 确保点击空白处时，光标在最后一个block的末尾 
          if (tailBlock.type === "page") {
            editor.insertBlocks([{ type: "paragraph" }], editor.topLevelBlocks[editor.topLevelBlocks.length - 1], "after")
          }
          // https://stackoverflow.com/a/3866442
          function setEndOfContenteditable(
            contentEditableElement: HTMLElement,
          ) {
            var range, selection;
            range = document.createRange(); //Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection(); //get the selection object (allows you to change selection)
            selection?.removeAllRanges(); //remove any selections already made
            selection?.addRange(range); //make the range you have just created the visible selection 
          }
          const editable = document.querySelector<HTMLElement>(
            "[contenteditable=true]",
          );

          if (editable) {
            // editable[0] is title and editable[1] is content
            setEndOfContenteditable(editable);
          }
        }}
      ></div>
    </div>
  )
}
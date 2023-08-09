"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, FormattingToolbarPositioner, HyperlinkToolbarPositioner, SideMenuPositioner, SlashMenuPositioner, getDefaultReactSlashMenuItems, useBlockNote } from "@blocknote/react";
import "./index.css"
import "@blocknote/core/style.css";
import { useStore } from "zustand";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import FormattingToolbar from "./formatting-toolbar";
import { useEffect } from "react";
import { insertPagetem } from "./slashmenu";

interface EditorProps {
  editable: boolean
  theme: "light" | "dark"
  onEditorReady?: (editor: BlockNoteEditor | null) => void
  onEditorContentChange?: (editor: BlockNoteEditor) => void
}

export default function Editor({ editable, theme, onEditorReady, onEditorContentChange }: EditorProps) {
  const initialContent = useStore(useBoundStore, (state) => state.blocks)
  const editor: BlockNoteEditor | null = useBlockNote({
    theme,
    editable,
    slashMenuItems: [
      ...getDefaultReactSlashMenuItems(),
      insertPagetem,
    ],
    initialContent: initialContent.length > 0 ? initialContent : undefined,
    editorDOMAttributes: {
      class: "!bg-background !ps-0 !pe-0",
    },
    onEditorReady,
    onEditorContentChange
  }, [theme]);

  useEffect(() => {
    if (editor) {
      editor.isEditable = editable;
    }
  }, [editable, editor]);

  // registerExtensions(editor)

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
        <SideMenuPositioner editor={editor} />
      </BlockNoteView>
      <div
        className="flex-grow"
        onClick={() => {
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
          const editable = document.querySelectorAll<HTMLElement>(
            "[contenteditable=true]",
          );

          if (editable) {
            // editable[0] is title and editable[1] is content
            setEndOfContenteditable(editable[1]);
          }
        }}
      ></div>
    </div>
  )
}
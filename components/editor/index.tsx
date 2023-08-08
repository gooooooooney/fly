"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, DefaultFormattingToolbar, FormattingToolbarPositioner, HyperlinkToolbarPositioner, SideMenuPositioner, SlashMenuPositioner, useBlockNote } from "@blocknote/react";
import "./index.css"
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useStore } from "zustand";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import FormattingToolbar from "./formatting-toolbar";
import { registerExtensions } from "@/lib/extensions";

export default function Editor() {
  const { theme } = useTheme();
  const setEditor = useStore(useBoundStore, (state) => state.setEditor)
  const editor: BlockNoteEditor | null = useBlockNote({
    theme: theme as "light" | "dark",
    
    editorDOMAttributes: {
      class: "!bg-background !ps-0 !pe-0",
    },
    onEditorContentChange: (editor) => {
      // console.log(editor.topLevelBlocks)
    }
  }, [theme]);
  
  // registerExtensions(editor)
  setEditor(editor)

  return (
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
  )
}
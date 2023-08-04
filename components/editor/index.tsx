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

// Our <Editor> component that we can now use
export default function Editor() {
  const { theme } = useTheme();
  const setEditor = useStore(useBoundStore, (state) => state.setEditor)
  const editor: BlockNoteEditor | null = useBlockNote({
    theme: theme === "light" ? "light" : "dark",
    enableBlockNoteExtensions: true,
    editorDOMAttributes: {
      class: "!bg-background",
    },
  });
  registerExtensions(editor)
  setEditor(editor)
  return <BlockNoteView editor={editor} >
    <FormattingToolbarPositioner
      editor={editor}
      formattingToolbar={FormattingToolbar}
    />
    {/* <DefaultFormattingToolbar editor={editor} /> */}
    <HyperlinkToolbarPositioner editor={editor} />
    <SlashMenuPositioner editor={editor} />
    <SideMenuPositioner editor={editor} />
  </BlockNoteView>;
}
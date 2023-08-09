"use client"
import { useBoundStore } from "@/hooks/store/useBoundStore"
import { useStore } from "zustand"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic";
import { BlockNoteEditor } from "@blocknote/core";
import { useCallback } from "react";

const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false })
export const EditorWrapper = () => {
  const [editable, setEditor] = useStore(useBoundStore, (state) => [state.editable, state.setEditor])
  const { theme } = useTheme()
  const handleEditorRead = useCallback((editor: BlockNoteEditor | null) => {
    if (editor) {
      setEditor(editor)
    }
  }, [setEditor])
  return (
    <>
      <Editor
        theme={theme as "light" | "dark"}
        editable={editable}
        onEditorReady={handleEditorRead} />
    </>
  )
}
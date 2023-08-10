"use client"
import { useBoundStore } from "@/hooks/store/useBoundStore"
import { useStore } from "zustand"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic";
import { useCallback } from "react";
import { UpdatePageInfo } from "@/lib/models/update-page-info";
import _ from "lodash";

const Editor = dynamic(() => import("@/components/editor/editor"), { ssr: false })
export const EditorWrapper = () => {
  const [editable, setEditor, pageId] = useStore(useBoundStore, (state) => [state.editable, state.setEditor, state.pageId])
  const { theme } = useTheme()
  const handleEditorRead = useCallback((editor: BlockNoteEditor | null) => {
    if (editor) {
      setEditor(editor)
    }
  }, [setEditor])

  const handleOnEditorContentChange = _.debounce((editor: BlockNoteEditor) => {
    pageId && UpdatePageInfo(pageId, {
      blocks: editor.topLevelBlocks
    })
  }, 2000)
  return (
    <>
      <Editor
        theme={theme as "light" | "dark"}
        editable={editable}
        onEditorContentChange={handleOnEditorContentChange}
        onEditorReady={handleEditorRead} />
    </>
  )
}
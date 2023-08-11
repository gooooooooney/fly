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

  const handleTextCursorPositionChange = (editor: BlockNoteEditor) => {
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

  const handleOnEditorContentChange = _.debounce((editor: BlockNoteEditor) => {
    pageId && UpdatePageInfo(pageId, {
      blocks: editor.topLevelBlocks
    })
  }, 2000)
  return (
    <Editor
      theme={theme as "light" | "dark"}
      editable={editable}
      onEditorContentChange={handleOnEditorContentChange}
      onTextCursorPositionChange={handleTextCursorPositionChange}
      onEditorReady={handleEditorRead} />
  )
}
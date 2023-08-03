import { BlockNoteEditor } from "@blocknote/core"
import { StateCreator } from "zustand"

export interface EditorSlice {
  editor: BlockNoteEditor | null
  setEditor: (editor: BlockNoteEditor) => void
}
export const createEditorSlice: StateCreator<
  EditorSlice,
  [],
  [],
  EditorSlice
  > = (set) => ({
    editor: null,
    setEditor: (editor) => set((state) => {
      if (state.editor) {
        return state
      }
      return { ...state, editor }
    }),
  })

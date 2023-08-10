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
      return { ...state, editor }
    }),
  })

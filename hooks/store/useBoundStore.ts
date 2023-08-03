import { create } from 'zustand'
import { LayoutSlice, createLayoutSlice } from './create-layout-slice'
import { EditorSlice, createEditorSlice } from './create-editor-slice'


type BoundState = LayoutSlice & EditorSlice
export const useBoundStore = create<BoundState>()((...a) => ({
  ...createLayoutSlice(...a),
  ...createEditorSlice(...a)
}))
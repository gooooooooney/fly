import { create } from 'zustand'
import { LayoutSlice, createLayoutSlice } from './create-layout-slice'
import { EditorSlice, createEditorSlice } from './create-editor-slice'
import { ContentSlice, createContentSlice } from './create-content-slice'


type BoundState = LayoutSlice & EditorSlice & ContentSlice
export const useBoundStore = create<BoundState>()((...a) => ({
  ...createLayoutSlice(...a),
  ...createEditorSlice(...a),
  ...createContentSlice(...a),
}))
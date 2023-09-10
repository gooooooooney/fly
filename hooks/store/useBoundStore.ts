import { create } from 'zustand'
import { createWithEqualityFn } from 'zustand/traditional'
import {shallow} from 'zustand/shallow' 
import { immer } from 'zustand/middleware/immer'
import { LayoutSlice, createLayoutSlice } from './create-layout-slice'
import { EditorSlice, createEditorSlice } from './create-editor-slice'
import { ContentSlice, createContentSlice } from './create-content-slice'


type BoundState = LayoutSlice & ContentSlice  // & EditorSlice
// use createWithEqualityFn to avoid unnecessary re-renders
export const useBoundStore = createWithEqualityFn<BoundState>()(immer((...a) => ({
  ...createLayoutSlice(...a),
  // ...createEditorSlice(...a),
  ...createContentSlice(...a),
})), shallow)

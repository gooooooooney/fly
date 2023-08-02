import { create } from 'zustand'
import { LayoutSlice, createLayoutSlice } from './create-layout-slice'


type BoundState = LayoutSlice
export const useBoundStore = create<BoundState>()((...a) => ({
  ...createLayoutSlice(...a),
}))
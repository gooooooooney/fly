import { CustomBlockSchema } from "@/components/editor/block-schema";

declare global {
  type BlockNoteEditor = import("@blocknote/core").BlockNoteEditor<CustomBlockSchema>
}

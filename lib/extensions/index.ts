import { BlockNoteEditor } from "@blocknote/core";
import { registerCodeExtension } from "./code";
import type { Mark, Editor as TiptapEditor } from "@tiptap/core";

function findExtensionByName(editor: TiptapEditor, name: string) {
  return editor.extensionManager.extensions.find((extension: any) => extension.name === name)
}


export function registerExtensions(editor: BlockNoteEditor) {
  const coreEditor = editor._tiptapEditor as TiptapEditor
  const codeMark = findExtensionByName(coreEditor, "code") as Mark
  registerCodeExtension(codeMark)
}
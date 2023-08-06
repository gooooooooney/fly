import { BlockNoteEditor } from "@blocknote/core";
import { registerCodeExtension } from "./code";
import type { Mark, Editor as TiptapEditor } from "@tiptap/core";
import { Blockquote } from "@tiptap/extension-blockquote";

function findExtensionByName(editor: TiptapEditor, name: string) {
  return editor.extensionManager.extensions.find((extension: any) => extension.name === name)
}


export function registerExtensions(editor: BlockNoteEditor) {
  const coreEditor = editor._tiptapEditor as TiptapEditor
  coreEditor.extensionManager.extensions.push(Blockquote)
  console.log(coreEditor.extensionManager.extensions)
  const codeMark = findExtensionByName(coreEditor, "code") as Mark
  registerCodeExtension(codeMark)
}
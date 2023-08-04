import { BlockNoteEditor, ToggledStyle } from "@blocknote/core"
import { Toolbar, BlockTypeDropdown, ToggledStyleButton, TextAlignButton, ColorStyleButton, NestBlockButton, UnnestBlockButton, CreateLinkButton, ToolbarButton, useEditorContentChange, useEditorSelectionChange } from "@blocknote/react"
import { CodeIcon } from "../icons"
import { useState } from "react";
import { formatKeyboardShortcut } from "@/lib/utils";

function FormattingToolbar(props: { editor: BlockNoteEditor }) {

  return (
    <Toolbar>
      <BlockTypeDropdown {...props} />

      <ToggledStyleButton editor={props.editor} toggledStyle={"bold"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"italic"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"underline"} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"strike"} />

      <TextAlignButton editor={props.editor as any} textAlignment={"left"} />
      <TextAlignButton editor={props.editor as any} textAlignment={"center"} />
      <TextAlignButton editor={props.editor as any} textAlignment={"right"} />

      <ColorStyleButton editor={props.editor} />
      <ToggledStyleButton editor={props.editor} toggledStyle={"code"} />

      <NestBlockButton editor={props.editor} />
      <UnnestBlockButton editor={props.editor} />

      <CreateLinkButton editor={props.editor} />
    </Toolbar>
  )
}

export default FormattingToolbar
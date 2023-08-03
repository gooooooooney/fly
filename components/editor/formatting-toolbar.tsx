import { BlockNoteEditor, ToggledStyle } from "@blocknote/core"
import { Toolbar, BlockTypeDropdown, ToggledStyleButton, TextAlignButton, ColorStyleButton, NestBlockButton, UnnestBlockButton, CreateLinkButton, ToolbarButton, useEditorContentChange, useEditorSelectionChange } from "@blocknote/react"
import { CodeIcon } from "../icons"
import { useState } from "react";
import { formatKeyboardShortcut } from "@/lib/utils";

function FormattingToolbar(props: { editor: BlockNoteEditor }) {

  const textColor = "code"
  const backgroundColor = "code"
  const [isSelected, setIsSelected] = useState<boolean>(
    props.editor.getActiveStyles().textColor === textColor &&
    props.editor.getActiveStyles().backgroundColor === backgroundColor
  );

  // Updates state on content change.
  useEditorContentChange(props.editor, () => {
    props.editor.getSelection
    setIsSelected(
      props.editor.getActiveStyles().textColor === textColor &&
      props.editor.getActiveStyles().backgroundColor === backgroundColor
    );
  });

  // Updates state on selection change.
  useEditorSelectionChange(props.editor, () => {
    setIsSelected(
      props.editor.getActiveStyles().textColor === textColor &&
      props.editor.getActiveStyles().backgroundColor === backgroundColor
    );
  });

  const toggleStyle = () => {
    props.editor.focus();
    props.editor.toggleStyles({
      textColor: "code",
      backgroundColor: "code",
    });
  };
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
      <ToolbarButton
      
        mainTooltip="Mark as code"
        onClick={() => {
          toggleStyle()
        }}
        isSelected={isSelected}
        secondaryTooltip={formatKeyboardShortcut("Mod+K")}
        icon={CodeIcon}
      />

      <NestBlockButton editor={props.editor} />
      <UnnestBlockButton editor={props.editor} />

      <CreateLinkButton editor={props.editor} />
    </Toolbar>
  )
}

export default FormattingToolbar
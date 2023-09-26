"use client"; // this registers <Editor> as a Client Component
import {
  BlockNoteView,
  FormattingToolbarPositioner,
  HyperlinkToolbarPositioner,
  SideMenuPositioner,
  SlashMenuPositioner,
  getDefaultReactSlashMenuItems,
  // getDefaultReactSlashMenuItems,
  useBlockNote,
} from "@blocknote/react";
import "./index.css";
import "@blocknote/core/style.css";
import FormattingToolbar from "./formatting-toolbar";
import { DependencyList, memo, useEffect, useMemo, useRef } from "react";
import { CustomSideMenu } from "./custom-side-menu";
import { useTheme } from "next-themes";
import { useUuidPathname } from "@/hooks/useUuidPathname";
// import { getReactSlashMenuItems } from "./slash-menu";
import { CustomBlockSchema } from "./blocks/custom-block-schema";
import {  slashMenuItems } from "./slash-menu";

interface EditorProps {
  editable: boolean;
  initialContent: BlockNoteEditor["topLevelBlocks"];
  onEditorReady?: (editor: BlockNoteEditor | null) => void;
  onEditorContentChange?: (editor: BlockNoteEditor) => void;
  onTextCursorPositionChange?: (editor: BlockNoteEditor) => void;
}
let count = 0;
 function Editor({
  editable,
  initialContent,
  onEditorReady,
  onEditorContentChange,
  onTextCursorPositionChange,
}: EditorProps) {
  console.log("render editor", count++);
  // so many rerenders
  // const setEditor = useBoundStore.getState().setEditor
  const { theme } = useTheme();

  const editor = useBlockNote(
    {
      editable,
      blockSchema: CustomBlockSchema,
      slashMenuItems: [
        // ...getReactSlashMenuItems(),
        ...getDefaultReactSlashMenuItems(CustomBlockSchema),
        ...slashMenuItems,
      ],
      initialContent: initialContent.length === 0 ? undefined : initialContent,
      domAttributes: {
        blockContainer: {
          class: "!bg-background text-foreground",
        },
        editor: {
          class: "!bg-background !ps-0 !pe-0",
        },
      },
      onEditorReady: (editor) => {
        onEditorReady?.(editor);
      },
      onEditorContentChange,
      onTextCursorPositionChange,
    },
    [initialContent]
  );

  useEffect(() => {
    if (editor) {
      editor.isEditable = editable;
    }
    
  }, [editable, editor]);

  return (
    <div className="flex-grow flex flex-col">
      <BlockNoteView
        className="w-full"
        theme={theme as "light" | "dark"}
        editor={editor}
      >
        <FormattingToolbarPositioner
          editor={editor}
          formattingToolbar={FormattingToolbar}
        />
        <HyperlinkToolbarPositioner editor={editor} />
        <SlashMenuPositioner editor={editor} />
        <SideMenuPositioner editor={editor} sideMenu={CustomSideMenu} />
      </BlockNoteView>
      <div
        className="flex-grow"
        onClick={() => {
          const tailBlock =
            editor.topLevelBlocks[editor.topLevelBlocks.length - 1];
          // 确保点击空白处时，光标在最后一个block的末尾
          if (tailBlock.type === "page") {
            editor.insertBlocks(
              [{ type: "paragraph" }],
              editor.topLevelBlocks[editor.topLevelBlocks.length - 1],
              "after"
            );
          }
          // https://stackoverflow.com/a/3866442
          function setEndOfContenteditable(
            contentEditableElement: HTMLElement
          ) {
            var range, selection;
            range = document.createRange(); //Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
            range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection(); //get the selection object (allows you to change selection)
            selection?.removeAllRanges(); //remove any selections already made
            selection?.addRange(range); //make the range you have just created the visible selection
          }
          const editable = document.querySelector<HTMLElement>(
            "[contenteditable=true]"
          );

          if (editable) {
            // editable[0] is title and editable[1] is content
            setEndOfContenteditable(editable);
          }
        }}
      ></div>
    </div>
  );
}

export default memo(Editor)

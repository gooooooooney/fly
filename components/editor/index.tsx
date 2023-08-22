"use client";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useStore } from "zustand";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import _ from "lodash";
import { save, saveBlocks } from "@/lib/data-source/page";
import { usePageInit } from "@/hooks/use-page-init";
import Link from "next/link";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { Operation } from "@/types";
const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

interface EditorWrapperProps {
  // blocks: BlockNoteEditor["topLevelBlocks"]
}

let first = true;
let beforeBlocks = [] as BlockWithOrder[];

export const EditorWrapper = (props: EditorWrapperProps) => {
  const path = useUuidPathname();
  console.log(path);
  // const { blocks } = props
  const [editable] = useStore(useBoundStore, (state) => [state.editable]);
  const [setEditor, pageId] = useBoundStore((state) => [
    state.setEditor,
    state.pageId,
  ]);

  const { data } = usePageInit();

  const { theme } = useTheme();
  const handleEditorReady = useCallback((editor: BlockNoteEditor | null) => {
    if (editor) {
      setEditor(editor);
    }
  }, []);

  const handleTextCursorPositionChange = (editor: BlockNoteEditor) => {
    const currentBlock = editor.getTextCursorPosition().block;
    if (currentBlock.type === "page") {
      // Retrieve all blocks before the current block and reverse them.
      const blocks = editor.topLevelBlocks
        .slice(0, editor.topLevelBlocks.indexOf(currentBlock))
        .reverse();
      // Then find the first block that is not a page block and set the cursor to the end of that block.

      let hasNotPageBlock = false;
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        if (block.type !== "page") {
          hasNotPageBlock = true;
          editor.setTextCursorPosition(block, "end");
          break;
        }
      }
      // If there is no such block, blur the editor.
      if (!hasNotPageBlock) {
        editor._tiptapEditor.commands.blur();
      }
    }
  };

  const handleOnEditorContentChange = (editor: BlockNoteEditor) => {
    if (first) {
      first = false;
      return;
    }
    if (path !== pageId) return
    let topLevelBlocks = editor.topLevelBlocks;
    if (topLevelBlocks.length === 0) return
    // const lastBlock = topLevelBlocks[topLevelBlocks.length - 1];
    // console.log("lastBlock", lastBlock);
    // if (lastBlock.type == "paragraph" && lastBlock.content.length === 0) {
    //   topLevelBlocks.pop()
    // }
    const blockList = topLevelBlocks.map((block, index) => ({
      ...block,
      prevBlockId: index === 0 ? null : topLevelBlocks[index - 1].id,
      nextBlockId: index === topLevelBlocks.length - 1 ? null : topLevelBlocks[index + 1].id,
    }));
    console.log("blockList", blockList);

    // current block
    const currentBlock = blockList.find(
      (block) => editor.getTextCursorPosition().block.id === block.id
    );
    const currentAssociatedBlock = [] as BlockWithOrder[]

    if (currentBlock?.prevBlockId) {
      const prevBlock = blockList.find(
        (block) => block.id === currentBlock.prevBlockId
      );
      if (prevBlock) {
        currentAssociatedBlock.push(prevBlock)
      }
    }
    if (currentBlock?.nextBlockId) {
      const nextBlock = blockList.find(
        (block) => block.id === currentBlock.nextBlockId
      );
      if (nextBlock) {
        currentAssociatedBlock.push(nextBlock)
      }
    }
    // end current block
    const filterBlocks = (blocks: Block[]) => {
      return blocks.filter(
        (block) =>
          (block.type === "paragraph" && block.content.length > 0) ||
          block.type !== "paragraph"
      );
    };

    // add block
    const addedBlocks = blockList.filter(
      (block) => !beforeBlocks.some((b) => b.id === block.id)
    )
    const addedAssociatedBlocks = [] as BlockWithOrder[]
    addedBlocks.forEach(block => {
      if (block.prevBlockId) {
        const prevBlock = blockList.find(b => b.id === block.prevBlockId)
        if (prevBlock) {
          addedAssociatedBlocks.push(prevBlock)
        }
      }
      if (block.nextBlockId) {
        const nextBlock = blockList.find(b => b.id === block.nextBlockId)
        if (nextBlock) {
          addedAssociatedBlocks.push(nextBlock)
        }
      }
    });
    // end add block

    // remove block
    const removedBlocks = beforeBlocks.filter(
      (block) => !blockList.some((b) => b.id === block.id)
    );
    const removedAssociatedBlocks = [] as BlockWithOrder[]
    removedBlocks.forEach(block => {
      if (block.prevBlockId) {
        const prevBlock = blockList.find(b => b.id === block.prevBlockId)
        if (prevBlock) {
          removedAssociatedBlocks.push(prevBlock)
        }
      }
      if (block.nextBlockId) {
        const nextBlock = blockList.find(b => b.id === block.nextBlockId)
        if (nextBlock) {
          removedAssociatedBlocks.push(nextBlock)
        }
      }
    });
    // end remove block

    beforeBlocks = blockList;

    const operations: Operation[] = [];

    if (addedBlocks.length > 0) {
      operations.push({
        command: "insert",
        data: [...addedBlocks, ...addedAssociatedBlocks],
      });
    }
    if (removedBlocks.length > 0) {
      operations.push({
        command: "delete",
        data: [...removedBlocks, ...removedAssociatedBlocks],
      });
    }
    if (currentBlock) {
      operations.push({
        command: "update",
        data: [currentBlock],
      });
    }

    if (addedBlocks.length > 0) {
      console.log("addedBlocks", addedBlocks);
    }
    if (removedBlocks.length > 0) {
      console.log("removedBlocks", removedBlocks);
    }
    console.log("topLevelBlocks", blockList);
    save({
      pageId,
      operations,
    });
    // saveBlocks({
    //   pageId,
    //   blocks: topLevelBlocks
    // })
  };
  return (
    <Editor
      initialContent={(data?.body?.blocks as any) || []}
      theme={theme as "light" | "dark"}
      editable={editable}
      onEditorContentChange={handleOnEditorContentChange}
      onTextCursorPositionChange={handleTextCursorPositionChange}
    // onEditorReady={handleEditorReady}
    />
    // <>
    // {data?.body?.blocks?.map((block: any) => {
    //   return <Link href={block.id} key={block.id}>
    //     {block.type}
    //   </Link>
    // })}
    // </>
  );
};

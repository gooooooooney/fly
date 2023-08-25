"use client";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useStore } from "zustand";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import _ from "lodash";
import { save } from "@/lib/data-source/page";
import { usePageInit } from "@/hooks/use-page-init";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { Operation } from "@/types";
import { areArraysEqual } from "@/lib/array";
const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

interface EditorWrapperProps {
  // blocks: BlockNoteEditor["topLevelBlocks"]
}

export const EditorWrapper = (props: EditorWrapperProps) => {
  

  let beforeBlocks = [] as BlockWithOrder[];
  const [shouldUpdateContent, setShouldUpdateContent] = useState(false)
  const { data } = usePageInit();

  const path = useUuidPathname();
  useEffect(() => {
    setShouldUpdateContent(true)
  }, [data])
  // const { blocks } = props


  const { theme } = useTheme();

  if (!data?.body?.blocks) return null;
  beforeBlocks = data?.body?.blocks as any;

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
    // 避免第一次渲染的时候触发导致调用save接口
    if (!shouldUpdateContent) {
      return
    }
    let topLevelBlocks = editor.topLevelBlocks;
    // if (topLevelBlocks.length === 0) return;
    const blockList = topLevelBlocks.map((block, index) => ({
      ...block,
      prevBlockId: index === 0 ? null : topLevelBlocks[index - 1].id,
      nextBlockId:
        index === topLevelBlocks.length - 1
          ? null
          : topLevelBlocks[index + 1].id,
    }));

    let currentBlock: BlockWithOrder | undefined;

    // 判断是否交换了block 交换了就把所有的block都更新
    const hasOrderChanged = function () {
      return (
        blockList.length === beforeBlocks.length &&
        areArraysEqual(beforeBlocks, blockList, (a, b) => a.id === b.id) ==
          false
      );
    };
    const isOrderChanged = hasOrderChanged();
    const currentBlockId = editor.getTextCursorPosition().block.id;
    // current block

    const findCurrentRootBlock = (block: any): any => {
      if (block.id === currentBlockId) return true;
      if (block.children) {
        for (let i = 0; i < block.children.length; i++) {
          const b = block.children[i];
          if (findCurrentRootBlock(b)) {
            return true;
          }
        }
        return false;
      }
    };

    // Compatible nesting and indentation of bullet lists and ordered lists.
    for (let i = 0; i < blockList.length; i++) {
      const block = blockList[i];
      if (findCurrentRootBlock(block)) {
        currentBlock = block;
      }
    }
    // end current block


    // add block
    const addedBlocks = blockList.filter(
      (block) => !beforeBlocks.some((b) => b.id === block.id)
    );
    const addedAssociatedBlocks = [] as BlockWithOrder[];
    addedBlocks.forEach((block) => {
      if (block.prevBlockId) {
        const prevBlock = blockList.find((b) => b.id === block.prevBlockId);
        if (prevBlock) {
          addedAssociatedBlocks.push(prevBlock);
        }
      }
      if (block.nextBlockId) {
        const nextBlock = blockList.find((b) => b.id === block.nextBlockId);
        if (nextBlock) {
          addedAssociatedBlocks.push(nextBlock);
        }
      }
    });
    // end add block

    // remove block
    const removedBlocks = beforeBlocks.filter(
      (block) => !blockList.some((b) => b.id === block.id)
    );
    const removedAssociatedBlocks = [] as BlockWithOrder[];
    removedBlocks.forEach((block) => {
      if (block.prevBlockId) {
        const prevBlock = blockList.find((b) => b.id === block.prevBlockId);
        if (prevBlock) {
          removedAssociatedBlocks.push(prevBlock);
        }
      }
      if (block.nextBlockId) {
        const nextBlock = blockList.find((b) => b.id === block.nextBlockId);
        if (nextBlock) {
          removedAssociatedBlocks.push(nextBlock);
        }
      }
    });
    // end remove block

    beforeBlocks = blockList;

    const updateBlocks = [
      ...removedAssociatedBlocks,
      ...addedBlocks,
      ...addedAssociatedBlocks,
    ];

    const operations: Operation[] = [];

    // if (addedBlocks.length > 0) {
    //   operations.push({
    //     command: "insert",
    //     data: _.uniqBy([...addedBlocks, ...addedAssociatedBlocks], "id"),
    //   });
    // }
    if (removedBlocks.length > 0) {
      operations.push({
        command: "delete",
        data: [...removedBlocks],
      });
    }
    operations.push({
      command: "update",
      // Compatible nesting and indentation of bullet lists and ordered lists.
      data: isOrderChanged
        ? blockList
        : _.uniqBy(
            currentBlock ? [currentBlock, ...updateBlocks] : updateBlocks,
            "id"
          ),
    });

    save({
      pageId: path,
      operations,
    });
  };
  return (
    <Editor
      initialContent={(data?.body?.blocks as any) || []}
      theme={theme as "light" | "dark"}
      editable={!!data.body.properties?.editable}
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

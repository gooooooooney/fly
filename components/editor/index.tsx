"use client";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import uniqBy from "lodash/uniqBy";
import { save } from "@/lib/data-source/page";
import { usePageInit } from "@/hooks/use-page-init";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { Operation } from "@/types";
import { areArraysEqual } from "@/lib/array";
import { setBlocks } from "@/hooks/store/create-content-slice";
import { findMenu, sortMenus } from "@/lib/menus";
const Editor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
});

interface EditorWrapperProps {
  // blocks: BlockNoteEditor["topLevelBlocks"]
}
function EditorWrapper() {

  let beforeBlocks = [] as BlockWithOrder[];
  const firstRender = useRef(true);
  const { data } = usePageInit();

  const path = useUuidPathname();

  const { theme } = useTheme();

  const handleTextCursorPositionChange = useCallback(
    (editor: BlockNoteEditor) => {
      // const CannotRemoveTypeList = ["page", "divider"];
      // const currentBlock = editor.getTextCursorPosition().block;
      // if (CannotRemoveTypeList.includes(currentBlock.type)) {
      //   // Retrieve all blocks before the current block and reverse them.
      //   const blocks = editor.topLevelBlocks
      //     .slice(0, editor.topLevelBlocks.indexOf(currentBlock))
      //     .reverse();
      //   // Then find the first block that is not a page block and set the cursor to the end of that block.

      //   let hasNotPageBlock = false;
      //   for (let i = 0; i < blocks.length; i++) {
      //     const block = blocks[i];
      //     if (!CannotRemoveTypeList.includes(block.type)) {
      //       hasNotPageBlock = true;
      //       editor.setTextCursorPosition(block, "end");
      //       break;
      //     }
      //   }
      //   // If there is no such block, blur the editor.
      //   if (!hasNotPageBlock) {
      //     editor._tiptapEditor.commands.blur();
      //   }
      // }
    },
    []
  );
  const handleOnEditorContentChange = useCallback(
    (editor: BlockNoteEditor) => {
      if (data?.editable === false) return;
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      setBlocks(editor.topLevelBlocks);
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
          : uniqBy(
              currentBlock ? [currentBlock, ...updateBlocks] : updateBlocks,
              "id"
            ),
      });
      if (isOrderChanged) {
        const pageBlock = blockList.filter((b) => b.type === "page");
        // 排序 menus
        pageBlock.length && useBoundStore.setState(s => {
          const menu = findMenu(s.menus, path);
          if (menu) {
            const result = sortMenus(menu.children, pageBlock.map((b) => b.id));
            menu.children = result
          }

        })
        
      }


      save({
        pageId: path,
        operations,
      });
    },
    []
  );

  if (!data?.blocks) return null;
  beforeBlocks = data?.blocks as any;

  return (
    <Editor
      initialContent={(data?.blocks as any) || []}
      editable={data?.editable}
      onEditorContentChange={handleOnEditorContentChange}
      onTextCursorPositionChange={handleTextCursorPositionChange}
      // onEditorReady={handleEditorReady}
    />

  );
}


export default memo(EditorWrapper);

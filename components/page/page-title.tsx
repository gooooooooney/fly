"use client";

import { setTitle } from "@/hooks/store/create-content-slice";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { usePageInit } from "@/hooks/use-page-init";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { saveProperty } from "@/lib/data-source/page";
import {  setPropSyncMenus } from "@/lib/menus";
import { useBlockNote } from "@blocknote/react";

export const PageTitle = ({ id }: { id: string }) => {
  const { data } = usePageInit();

  const editor = useBlockNote()
  const [title, editable] = useBoundStore((state) => [
    state.title,
    state.editable
  ]);
  const pageId = useUuidPathname()
  const setPageTitle = (title: string) => {
    setTitle(title);
    setPropSyncMenus({
      id: pageId,
      title
    })
    saveProperty({
      pageId,
      data: {
        title
      }
    })
  }
  const handleEnter = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (e.key === "Enter") {
      
      
      editor?.insertBlocks(
        [
          {
            type: "paragraph",
          },
        ],
        editor?.topLevelBlocks[0]
      );
      editor?.focus();
    }
  };
  if (!data) return null;
  return (
    <div className="my-4">
      {/* <h1
        suppressContentEditableWarning={true}
        onKeyDown={handleEnter}
        onBlur={(e) => {
          setTitle(e.currentTarget.textContent as string)
        }}
        contentEditable={editable}
        placeholder="Untitled"
        className="[&[contenteditable]]:after:cursor-text [&[contenteditable]]:empty:after:content-[attr(placeholder)] [&[contenteditable]]:after:text-[#37352f26] dark:[&[contenteditable]]:after:text-[#373737] outline-none scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      >
        {title}
      </h1> */}
      <input
        placeholder="Untitled"
        type="text"
        value={title}
        onKeyDown={handleEnter}
        className="outline-none bg-background scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        onChange={(e) => {
          setPageTitle(e.currentTarget.value)
        }}
      />
    </div>
  );
};

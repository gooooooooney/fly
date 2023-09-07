"use client";

import { useBoundStore } from "@/hooks/store/useBoundStore";
import { usePageInit } from "@/hooks/use-page-init";
import { useSpace } from "@/hooks/use-space";
import { useUuidPathname } from "@/hooks/useUuidPathname";
import { saveProperty } from "@/lib/data-source/page";
import { findMenu, mergeMenus, setPropSyncMenus } from "@/lib/menus";
import _ from "lodash";
import { useEffect } from "react";
import { useStore } from "zustand";

export const PageTitle = ({ id }: { id: string }) => {
  const { data } = usePageInit();
  // const { data: spaceData, mutate } = useSpace();

  const [title, setTitle, editable] = useStore(useBoundStore, (state) => [
    state.title,
    state.setTitle,
    state.editable,
  ]);
  const [editor, setWorkspaceId] = useBoundStore((state) => [state.editor, state.setWorkspaceId]);
  const pageId = useUuidPathname()
  useEffect(() => {
    if (data) {
      setTitle(data?.body?.properties?.title || "");
      setWorkspaceId(data?.body?.workspaceId || "")
    }
  }, [data]);
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
      e.preventDefault();
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

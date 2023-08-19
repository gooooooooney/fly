"use client";
import { useStore } from "zustand";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { PageResponse } from "@/app/api/page/get/route";

const getShortcutIcon = (icon: string) => {
  return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${icon}</text></svg>`;
};

export function useClientInit(id: string) {
  console.log("render helmet");
  const [emoji, title, setPageId] = useBoundStore((state) => [
    state.icon,
    state.title,
    state.setPageId,
  ]);

  useEffect(() => {
    setPageId(id);
  }, [id]);

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!link) {
      const link = document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    if (link) {
      link.href = getShortcutIcon(emoji || "📝");
    }
  }, [emoji]);

  useEffect(() => {
    if (!title) {
      document.title = "Untitled";
    } else {
      document.title = title;
    }
  }, [title]);
}

// export default Helmet;

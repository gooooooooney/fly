"use client";

import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useRef } from "react";

interface StoreInitializerProps {
  workspaceId: string;
  // blocks: BlockNoteEditor["topLevelBlocks"];
  // pageId: string;
  // icon?: string;
  // title?: string;
  // cover?: string;
  // editable?: boolean;
}
export function StoreInitializer({ value }: {value: StoreInitializerProps}) {
  const isInitialized = useRef(false);

  if (!isInitialized.current) {
    useBoundStore.setState(value);
    isInitialized.current = true;
  }
  return null;
}

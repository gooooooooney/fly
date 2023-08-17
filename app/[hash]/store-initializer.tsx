"use client";

import { useBoundStore } from "@/hooks/store/useBoundStore";
import { useRef } from "react";

interface StoreInitializerProps {
  workspaceId: string;
}
export function StoreInitializer({ value }: {value: StoreInitializerProps}) {
  const isInitialized = useRef(false);

  if (!isInitialized.current) {
    useBoundStore.setState({
      workspaceId: value.workspaceId,
    });
    isInitialized.current = true;
  }
  return null;
}

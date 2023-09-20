"use client"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OutHook = {} as {
  useRouter: AppRouterInstance;
};

export const OutHookConfigurator = () => {
  const _useRouter = useRouter();

  useEffect(() => {
    OutHook.useRouter = _useRouter;
  }, [_useRouter]);


  return null;
};

export default OutHook;
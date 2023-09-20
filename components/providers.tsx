'use client'

import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";
import { AlertDialogProvider } from "./shared/alert-dialog";
import AlertDialog from "./shared/alert-dialog/alert";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      < Toaster position="top-center" richColors />
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <AlertDialogProvider>
          <>
            <AlertDialog />
            <SessionProvider>{children}</SessionProvider>
          </>
        </AlertDialogProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
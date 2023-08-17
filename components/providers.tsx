'use client'

import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      < Toaster richColors />
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
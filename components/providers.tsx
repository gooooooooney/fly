'use client'

import {NextUIProvider} from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
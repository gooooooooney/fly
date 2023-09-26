import { Providers } from "@/components/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fly ",
  description: "Your personal noted app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "text-foreground")}>
        <Providers>
          <section>{children}</section>
        </Providers>
      </body>
    </html>
  )
}

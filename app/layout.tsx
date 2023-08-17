import { Providers } from "@/components/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import Nav from "@/components/layout/navbar/nav";

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
      <body className={cn(inter.className, "text-primary")}>
        <Providers>
          <section className=" h-screen">{children}</section>
        </Providers>
      </body>
    </html>
  )
}

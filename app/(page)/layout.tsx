import Nav from "@/components/layout/navbar/nav";
import { Sidebar } from "@/components/layout/sidebar";
import PageTransitionLayout from "@/components/page-transition-layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import {
  getPageById,
  getPageMenus,
} from "@/prisma/services/pages/pages-services";
import { Providers } from "@/components/providers";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { cn } from "@/lib/utils";

export default async function PageLayout(
  props: PropsWithChildren & {
    params: {
      hash: string;
    };
  }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const wps = await getWorkspacesByUserId(session.user.id);
  if (wps.length === 0) {
    redirect("/create-workspace");
  }

  return (
    <html lang="en">
      <body className={cn("text-primary")}>
        <Providers>
          <section className=" h-screen">
            <section className="flex h-screen">
              <Sidebar wps={wps} email={session.user.email!} />
              <section className="flex flex-col w-full">
                <Nav />
                <main className="w-full h-full relative max-h-full">
                  <PageTransitionLayout key={props.params.hash}>
                    {props.children}
                  </PageTransitionLayout>
                </main>
              </section>
            </section>
          </section>
        </Providers>
      </body>
    </html>
  );
}

import Nav from "@/components/layout/navbar/nav";
import { Sidebar } from "@/components/layout/sidebar";
import PageTransitionLayout from "@/components/page-transition-layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import { getPageById, getPageMenus } from "@/prisma/services/pages/pages-services";
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { StoreInitializer } from "./store-initializer";

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
  const page = await getPageById(props.params.hash)
  if (!page) {
    redirect("/")
  }
  const activeWp = wps.find((wp) => wp.isActive) || wps[0];
  const menus = await getPageMenus(activeWp.id);
  const value = {
    workspaceId: activeWp.id!,
    blocks: page.blocks as any,
    pageId: page.id,
    icon: page.properties?.emoji,
    title: page.properties?.title,
    cover: page.properties?.cover,
    editable: page.properties?.editable,
    
  }
  useBoundStore.setState(value)

  return (
    <section className="flex h-screen">
      {/* https://stackoverflow.com/questions/76349135/how-to-persist-and-set-global-state-for-client-from-server-in-nextjs-13-4 */}
      <StoreInitializer
        value={value}
      />
      <Sidebar
        menus={menus as any}
        name={activeWp.name}
        avatar={activeWp.avatar!}
        email={session.user.email!}
      />
      <section className="flex flex-col w-full">
        <Nav />
        <main className="w-full relative max-h-full">
          <PageTransitionLayout key={props.params.hash}>
            {props.children}
          </PageTransitionLayout>
        </main>
      </section>
    </section>
  );
}

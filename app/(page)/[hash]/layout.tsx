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
import { useBoundStore } from "@/hooks/store/useBoundStore";
import { StoreInitializer } from "./store-initializer";
import { OutHookConfigurator } from "@/components/OutHook";
import { authOptions } from "../../api/auth/[...nextauth]/route";

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
  const page = await getPageById(props.params.hash);
  if (!page) {
    redirect("/");
  }
  // const activeWp = wps.find((wp) => wp.isActive) || wps[0];
  // const menus = await getPageMenus(activeWp.id);

  return (
    // <section data-spaceid={page.workspaceId} id="spaceid"  className="flex h-screen">
    //   <Sidebar
    //     menus={menus as any}
    //     name={activeWp.name}
    //     avatar={activeWp.avatar!}
    //     email={session.user.email!}
    //   />
    //   <section className="flex flex-col w-full">
    //     <Nav />
    //     <main className="w-full relative max-h-full">
    //       <PageTransitionLayout key={props.params.hash}>
    //         {props.children}
    //       </PageTransitionLayout>
    //     </main>
    //   </section>
    // </section>
    <section data-spaceid={page.workspaceId} id="spaceid">{props.children}</section>
  );
}

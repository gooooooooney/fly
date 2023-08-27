import Nav from "@/components/layout/navbar/nav";
import { Sidebar } from "@/components/layout/sidebar";
import PageTransitionLayout from "@/components/page-transition-layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Navigation from "@/components/layout/navigation";
import { ListBar, Menus } from "@/components/layout/list-bar";

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
  const menus = [
    {
      title: "我的主页1",
      emoji: "🏠",
      id: "home",
      children: [
        {
          title: "我的主页2",
          emoji: "🏠",
          id: "home",
          children: [
            {
              title: "我的主页3",
              emoji: "🏠",
              id: "home",
              children: [
                {
                  title: "我的主页4",
                  emoji: "🏠",
                  id: "home",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "home",
      emoji: "🏠",
      id: "home",
      children: [],
    }
  ];
  return (
          <section className=" h-screen">
            <section className="flex h-screen">
              {/* <Sidebar wps={wps} email={session.user.email!} /> */}
              <ListBar items={menus} />
              {/* <Menus /> */}
              {/* <Navigation/> */}
              <section className="flex flex-col w-full">
                <Nav />
                <main className="w-full h-full relative overflow-y-auto overflow-x-hidden max-h-full">
                  <PageTransitionLayout key={props.params.hash}>
                    {props.children}
                  </PageTransitionLayout>
                </main>
              </section>
            </section>
          </section>
  );
}

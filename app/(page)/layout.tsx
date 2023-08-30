import Nav from "@/components/layout/navbar/nav";
import PageTransitionLayout from "@/components/page-transition-layout";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { getWorkspacesByUserId } from "@/prisma/services/workspace/workspcae-services";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { ListBar } from "@/components/layout/list-bar";

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
          <section className=" h-screen">
            <section className="flex h-screen">
              {/* <Sidebar wps={wps} email={session.user.email!} /> */}
              <ListBar email={session.user.email!} />
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
